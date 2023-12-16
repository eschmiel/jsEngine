import { Vector, createDirection } from '../../services/math/vector.js';
import Controller from '../../services/controller.js'
import { colliding } from '../../services/collisions/collisions.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/lerpers/accelerator.js';
import { Booster } from './booster.js';
import { CircleExplosionEventData, ParticleEffectsManagerEvents } from '../../services/particles/particleEffectsManager.js';
import { Observable, Observer, ObserverEventData, ObserverEventType  } from '../../services/observable.js';
import { Bullet } from '../bullets/bullet.js';
import { rotatePoint } from '../../services/math/transformations.js';
import { EntityTypes } from '../entityTypes.js';
import { Timer } from '../../services/timer.js';

// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/

export default class Ship {
    type: EntityTypes.ship
    body: EntityBody;
    accelerator: Accelerator;
    booster: Booster;

    alive: boolean
    respawning: boolean

    collisionBox: CollisionBox
    observable: Observable
    respawnTimer: Timer

    constructor(x, y, options: CreateShipOptions) {
        
        const dimensions = new Vector(28, 25)

        const entityBodyOptions = {
            position: new Vector(x, y),
            dimensions: dimensions.copy()
        }
        this.body = new EntityBody(entityBodyOptions)
        this.accelerator = new Accelerator(0, 15, .04)
        this.booster = new Booster(this, 30, 100) 

        this.alive = true

        this.observable = new Observable()
        this.collisionBox = new CollisionBox(new Vector(0,0), dimensions.copy(), this.body)
        this.respawning = options?.respawn
        this.respawnTimer = new Timer(60, ShipEvents.doneSpawning)
        this.respawnTimer.addObserver(this)
        
        if(this.respawning) this.respawnTimer.activate()
    }

    update() {
        if(this.alive){
            this.body.update()
            this.booster.update()
            this.control()
            this.body.speed = this.accelerator.run()
            if(this.body.position.values[0] < 0 
            || this.body.position.values[0] > 1000
            || this.body.position.values[1] < 0 
            || this.body.position.values[1] > 600 ) { this.die() }
        } 
        if(this.respawning) this.respawnTimer.update()
    }

    control() {
        if(Controller.ArrowUp) {this.accelerator.setDirection(AcceleratorDirection.Forward)
        }
        if(Controller.ArrowDown) this.accelerator.setDirection(AcceleratorDirection.Backward)
        if(Controller.ArrowLeft) this.body.adjustRotation(-11)
        if(Controller.ArrowRight) this.body.adjustRotation(11)
        if(!Controller.ArrowDown && !Controller.ArrowUp) this.accelerator.setDirection(AcceleratorDirection.Stop)

        if(Controller.w) this.booster.activate() 
        if(Controller.s) this.booster.activate(180) 
        if(Controller.a) this.booster.activate(270) 
        if(Controller.d) this.booster.activate(90) 
        if(Controller[' ']) this.shoot()
    }

    shoot(){
        const [shipWidth, shipHeight] = this.body.getDimensions()
        const bullet1ShipOffset = new Vector(shipWidth/2 - 16, 6)
        const bullet2ShipOffset = new Vector(shipWidth/2 - 16, -6)
        
        const bullet1 = this.createBullet(bullet1ShipOffset)
        const bullet2 = this.createBullet(bullet2ShipOffset)
        
        this.observable.notify(ShipEvents.shoot, bullet1)
        this.observable.notify(ShipEvents.shoot, bullet2)
    }

    createBullet(shipPositionOffset) {
        const direction = createDirection(this.body.rotation)

        const rotatedPosition = rotatePoint(shipPositionOffset, this.body.rotation)
        const bulletPosition = rotatedPosition.addVector(this.body.position)

        return new Bullet ({
            position: bulletPosition,
            dimensions: new Vector(3, 3),
            speed: 20,
            direction: direction
        })
    }

    collideWithBullets(bulletManager) {
        if(this.alive){
            bulletManager.bullets.forEach((bullet) => {
                if(colliding(bullet.collisionBox, this.collisionBox)) {
                    this.die()
                }
            })
        }
    }

    die() {
        if(this.respawning) return
        this.alive = false
        const options: CircleExplosionEventData = {
            position: this.body.position.copy(),
            options: {
                particleSize:  new Vector(10, 10),
                particleNumber: 7,
                startDistanceFromOrigin: 5
            }
        }
        this.observable.notify(ParticleEffectsManagerEvents.CircleExplosion, options)
        this.observable.notify(ShipEvents.death)       
    }

    onNotify(eventType:ObserverEventType, eventData:ObserverEventData) {
        switch(eventType) {
            case ShipEvents.doneSpawning:
                this.respawning = false
                this.observable.notify(ShipEvents.doneSpawning)
                break;
            default:
        }
    }

    addObserver(observer: Observer) {
        this.observable.add(observer)
    }
}



// Types and Enums



export enum ShipEvents {
    death = 'death',
    doneSpawning = 'done spawning',
    shoot = 'shoot'
}

export type CreateShipOptions = {
    respawn: boolean
}
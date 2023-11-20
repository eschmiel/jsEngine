import { Vector, createDirection } from '../../services/vector.js';
import Controller from '../../services/controller.js'
import { colliding } from '../../services/collisions/collisions.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/lerpers/accelerator.js';
import { Booster } from './booster.js';
import { EntityBodyTriangleDrawTypes, drawEntityBodyTriangle } from '../drawEntityBody.js';
import { CircleExplosionEventData, ParticleEffectsManager, ParticleEffectsManagerEvents } from '../../services/particles/particleEffectsManager.js';
import { CircleExplosionOptions } from '../../services/particles/effects/circleExplosion.js';
import { Observable } from '../../services/observable.js';
import { Observer } from '../../services/types.js';
import { BulletManagerEvents } from '../bullets/bulletManager.js';
import { CreateBulletOptions } from '../bullets/bullet.js';

// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/

export default class Ship {
    body: EntityBody;
    accelerator: Accelerator;
    booster: Booster;

    shipColor: string
    alive: boolean

    collisionBox: CollisionBox
    observable: Observable

    particleEffectsManager: ParticleEffectsManager// try to get rid of this

    constructor(x, y, particleEffectsManager: ParticleEffectsManager) {
        const dimensions = new Vector(28, 25)
        this.particleEffectsManager = particleEffectsManager

        const entityBodyOptions = {
            position: new Vector(x, y),
            dimensions: dimensions.copy()
        }
        this.body = new EntityBody(entityBodyOptions)
        this.accelerator = new Accelerator(0, 15, .04)
        this.booster = new Booster(this, 30, 100) 

        this.shipColor = "black"
        this.alive = true

        this.observable = new Observable()
        this.collisionBox = new CollisionBox(new Vector(0,0), dimensions.copy(), this.body)
    }

    createTrianglePoints() {
        const [x, y] = this.body.getPosition()
        const [centerX, centerY] = this.body.getCenterPosition()
        const [endX, endY] = this.body.getEndPosition()

        return [
            this.body.position.copy(),
            new Vector(endX, centerY),
            new Vector(x, endY)
        ]
    }

    draw() {
        this.alive ? drawEntityBodyTriangle(this.body, EntityBodyTriangleDrawTypes.Fill) : null
    }

    update() {
        if(this.alive){
            this.body.update()
            this.booster.update()
            this.control()
            this.body.speed = this.accelerator.run()
        } 
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
        console.log('beep')
        const direction = createDirection(this.body.rotation)

        const rotatedXAxis = createDirection(this.body.rotation)
        const rotatedYAxis = createDirection(this.body.rotation + 90)
        const rotatedX = rotatedXAxis.multiplyByScalar(this.body.position.values[0])
        const rotatedY = rotatedYAxis.multiplyByScalar(this.body.position.values[1])
        const rotatedPosition = rotatedX.addVector(rotatedY)
        let startingPosition = this.body.position.copy()//.multiplyByScalar(-20 + this.body.dimensions.values[0])
        // startingPosition.values[1]+=5

        startingPosition = startingPosition.multiplyVector(direction)
        const bullet1Options: CreateBulletOptions = {
            position: rotatedPosition,
            dimensions: new Vector(5, 5),
            speed: 20,
            direction: direction
        }

        const bullet2Positon = this.body.position.copy()
        const startingPosition2 = this.body.position.copy().addVector(direction.multiplyByScalar(-20 + this.body.dimensions.values[0]))
        startingPosition2.values[1]+=19

        bullet2Positon.values[0] += this.body.dimensions.values[0]
        const bullet2Options: CreateBulletOptions = {
            position: startingPosition2,
            dimensions: new Vector(5, 5),
            speed: 20,
            direction: direction
        }
        this.observable.notify(BulletManagerEvents.create, bullet1Options)
        // this.observable.notify(BulletManagerEvents.create, bullet2Options)
    }
    collideWithBullets(bulletManager) {
        if(this.alive){
            bulletManager.bullets.forEach((bullet) => {
                if(colliding(bullet.collisionBox, this.collisionBox)) this.die()
            })
        }
    }

    die() {
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
        // this.particleEffectsManager.createCircleExplosionEffect(this.body.position.copy(), options)
    }

    addObserver(observer: Observer) {
        this.observable.add(observer)
    }
}
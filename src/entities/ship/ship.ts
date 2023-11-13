import { Vector } from '../../services/vector.js';
import Controller from '../../services/controller.js'
import { colliding } from '../../services/collisions/collisions.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { TriangleExplosion } from '../../services/particles/triangleExplosion.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/accelerator.js';
import { Booster } from './booster.js';
import { EntityBodyTriangleDrawTypes, drawEntityBodyTriangle } from '../drawEntityBody.js';

// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/

export default class Ship {
    body: EntityBody;
    maxSpeed: number;
    accelerator: Accelerator;
    booster: Booster;

    shipColor: string
    alive: boolean
    deathExplosion: TriangleExplosion

    collisionBox: CollisionBox
    music: HTMLAudioElement

    constructor(x, y) {
        const dimensions = new Vector(28, 25)

        this.body = new EntityBody(new Vector(x,y), dimensions.copy())
        this.maxSpeed = 15;
        this.accelerator = new Accelerator(this.maxSpeed, .04)
        this.booster = new Booster(this, 30, 100)

        this.shipColor = "black"
        this.alive = true

        this.collisionBox = new CollisionBox(new Vector(0,0), dimensions.copy(), this.body)
        this.music = new Audio('./Skull_Break.wav')
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
        this.alive ? drawEntityBodyTriangle(this.body, EntityBodyTriangleDrawTypes.Fill) : this.deathExplosion.draw()
    }

    update() {
        if(this.alive){
            this.body.update()
            this.booster.update()
            this.control()
            this.body.speed = this.accelerator.run()
        } else { this.deathExplosion.update()}
    }

    control() {
        if(Controller.ArrowUp) {this.accelerator.setDirection(AcceleratorDirection.Forward)
        this.music.play()
        }
        if(Controller.ArrowDown) this.accelerator.setDirection(AcceleratorDirection.Backward)
        if(Controller.ArrowLeft) this.body.adjustRotation(-11)
        if(Controller.ArrowRight) this.body.adjustRotation(11)
        if(!Controller.ArrowDown && !Controller.ArrowUp) this.accelerator.setDirection(AcceleratorDirection.Stop)

        if(Controller.w) this.booster.activate() 
        if(Controller.s) this.booster.activate(180) 
        if(Controller.a) this.booster.activate(270) 
        if(Controller.d) this.booster.activate(90) 
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
        this.deathExplosion = new TriangleExplosion(this.body.position.copy(), new Vector(10, 10), 7)
    }
}

const jank = () => {
    return document.querySelector("audio");
  }
import canvas from '../services/canvas.js'
import {Entity} from './entityManager.js'
import { Vector, createDirection } from '../services/vector.js';
import Controller from '../services/controller.js'
import { Lerp } from '../util.js'
import { CollisionBox, colliding } from '../services/collisions.js';
import { TriangleExplosion } from '../services/particles.js';

// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/

export default class Ship implements Entity {
    position: Vector;
    dimensions: Vector;
    speed: number;
    maxSpeed: number;
    rotation: number;
    accelerationLerp: Lerp

    boostCooldown: number
    boostSpeed: number
    boostMaxSpeed: number
    boostLerp: Lerp
    boostDirection: Vector
    boosting: boolean

    shipColor: string
    alive: boolean
    deathExplosion: TriangleExplosion

    collisionBox: CollisionBox

    constructor(x, y) {
        this.position = new Vector(x, y);
        this.dimensions = new Vector(28, 25)
        this.rotation = 0;
        this.speed = 0;
        this.maxSpeed = 15;
        this.accelerationLerp = new Lerp(0, 0, .04)

        this.boostCooldown = 0
        this.boostSpeed = 0
        this.boostMaxSpeed = 20
        this.boostLerp = new Lerp(0, 0, .1)

        this.shipColor = "black"
        this.alive = true

        this.collisionBox = new CollisionBox(new Vector(0,0), this.dimensions, this)
    }

    getCenterX = () => {
        const x = this.position.values[0]
        const width = this.dimensions.values[0]
        
        return x + width/2
    }

    getCenterY = () => {
        const y = this.position.values[1]
        const height = this.dimensions.values[1]

        return y + height/2
    }

    createTrianglePoints() {
        const [x, y] = this.position.values
        const [width, height] = this.dimensions.values
        return [
            new Vector(...this.position.values),
            new Vector(x + width, this.getCenterY()),
            new Vector(x, y + height)
        ]
    }

    draw() {
        if(this.alive){
        this.collisionBox.draw()
        canvas.save()

        const trianglePoints = this.createTrianglePoints()

        canvas.rotate(this.rotation, this.getCenterX(), this.getCenterY())
        canvas.fillTriangle(trianglePoints, this.shipColor)

        canvas.restore()
        } else {
            this.deathExplosion.draw()
        }
    }

    update() {
        if(this.alive){
        const direction = createDirection(this.rotation)
        const distanceInDirection = direction.multiplyByScalar(this.speed)
        this.position = this.position.addVector(distanceInDirection) 

        if(this.boosting){
            const distanceInBoostDirection = this.boostDirection.multiplyByScalar(this.boostSpeed)
            this.position = this.position.addVector(distanceInBoostDirection) 
            if(this.boostSpeed >= this.boostMaxSpeed) {
                this.boosting = false
                this.boostLerp.redirect(0)
            }
        } else if(this.boostCooldown > 0) this.boostCooldown -= 1

        this.boostSpeed = this.boostLerp.run()

        this.control()
    } else { this.deathExplosion.update()}
    }

    control() {
        if(Controller.ArrowUp) {
            if(this.accelerationLerp.destination !== this.maxSpeed) this.accelerationLerp.redirect(this.maxSpeed)

            this.speed = this.accelerationLerp.run()
        }
        if(Controller.ArrowDown) { 
            if(this.accelerationLerp.destination !== -this.maxSpeed) this.accelerationLerp.redirect(-this.maxSpeed)

            this.speed = this.accelerationLerp.run()
        }
        if(Controller.ArrowLeft) {
            this.rotation -= 5;
            if(this.rotation < 0) this.rotation += 360
        }
        if(Controller.ArrowRight) {
            this.rotation += 5;   
            if(this.rotation > 360) this.rotation -= 360
        }

        if(!Controller.ArrowDown && !Controller.ArrowUp){
            if(this.accelerationLerp.destination !== 0) this.accelerationLerp.redirect(0)

            this.speed = this.accelerationLerp.run()
        }

        if(Controller.w) this.boost() 
        if(Controller.s) this.boost(180) 
        if(Controller.a) this.boost(270) 
        if(Controller.d) this.boost(90) 
    }

    boost(angle = 0) {
        if(!this.boostCooldown) {
            this.boosting = true
            this.boostLerp.redirect(this.boostMaxSpeed)
            this.boostCooldown = 100
            this.boostDirection = createDirection(this.rotation + angle)
        }
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
        this.deathExplosion = new TriangleExplosion(this.position.copy(), new Vector(10, 10), 7)
    }
}
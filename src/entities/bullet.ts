import canvas from "../services/canvas.js";
import { CollisionBox } from "../services/collisions.js";
import { Vector } from "../services/vector.js";
import { Entity } from "./entityManager.js";

export class Bullet implements Entity{
    position: Vector
    dimensions: Vector;
    radius: number
    rotation: number;
    collisionBox: CollisionBox

    constructor(x, y, radius) {
        this.position = new Vector(x, y)
        this.dimensions = new Vector(radius*2, radius*2)
        this.radius = radius
        this.collisionBox = new CollisionBox(new Vector(0,0), this.dimensions, this)
    }
    update() {}
    draw() {
        canvas.fillCircle(this.position, this.radius, 'blue')
    }
}

export class BulletManager {
    bullets: Bullet[]

    constructor() {
        this.bullets = []
    }

    update() {
        this.bullets.forEach((bullet) => bullet.update())
    }

    draw() {
        this.bullets.forEach((bullet) => bullet.draw())
    }
}
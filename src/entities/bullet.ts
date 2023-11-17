import canvas from "../services/canvas.js";
import { CollisionBox } from "../services/collisions/collisionBox.js";
import { Vector } from "../services/vector.js";
import { EntityBody } from "./entityBody.js";
import { Entity } from "./entityManager.js";

export class Bullet implements Entity{
    position: Vector
    dimensions: Vector;
    radius: number
    rotation: number;
    body: EntityBody
    collisionBox: CollisionBox

    constructor(position: Vector, radius: number) {
        const entityBodyOptions = {
            position: position.copy(),
            dimensions: new Vector(radius*2, radius*2)
        }
        this.body = new EntityBody(entityBodyOptions)
        this.radius = radius
        this.collisionBox = new CollisionBox(new Vector(0,0), this.body.dimensions, this.body)
    }
    update() {}
    draw() {
        canvas.fillCircle(this.body.position, this.radius, 'blue')
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
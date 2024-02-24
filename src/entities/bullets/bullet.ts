import { CollisionBox } from "../../../schmielJS/collisions/collisionBox.js";
import { colliding } from "../../../schmielJS/collisions/collisions.js";
import { Vector } from "../../../schmielJS/math/vector.js";
import { EntityBody, EntityBodyOptions } from "../../../schmielJS/entityBody.js";

export class Bullet {
    body: EntityBody;
    collisionBox: CollisionBox
    velocity: Vector;

    constructor(options: CreateBulletOptions) {
        const { position, direction, dimensions, speed} = options
        const bodyOptions: EntityBodyOptions = {
            position: position.copy(),
            dimensions: dimensions.copy()
        }

        this.body = new EntityBody(bodyOptions)
        this.collisionBox = new CollisionBox(new Vector(0, 0), dimensions.copy(), this.body)
        this.velocity = direction.multiplyByScalar(speed)
    }

    update() {
        this.body.move(this.velocity)
    }

    colliding(otherCollisionBox: CollisionBox) {
        return colliding(this.collisionBox, otherCollisionBox)
    }
}



// Types



export type CreateBulletOptions = {
    position: Vector,
    direction: Vector,
    dimensions: Vector,
    speed: number
}

export function isCreateBulletOptions(input): input is CreateBulletOptions {
    return (input as CreateBulletOptions).position !== undefined
    || (input as CreateBulletOptions).direction !== undefined
    || (input as CreateBulletOptions).dimensions !== undefined
    || (input as CreateBulletOptions).speed !== undefined
}
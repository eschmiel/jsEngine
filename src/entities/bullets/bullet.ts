import canvas from "../../services/canvas.js";
import { CollisionBox } from "../../services/collisions/collisionBox.js";
import { colliding } from "../../services/collisions/collisions.js";
import { Observable } from "../../services/observable.js";
import { CircleExplosionEventData, ParticleEffectsManagerEvents } from "../../services/particles/particleEffectsManager.js";
import { Vector } from "../../services/vector.js";
import { Observer } from "../../types.js";
import { EntityBody, EntityBodyOptions } from "../entityBody.js";

export class Bullet {
    body: EntityBody;
    collisionBox: CollisionBox
    velocity: Vector;
    observable: Observable

    constructor(options: CreateBulletOptions) {
        const { position, direction, dimensions, speed} = options
        const bodyOptions: EntityBodyOptions = {
            position: position.copy(),
            dimensions: dimensions.copy()
        }

        this.body = new EntityBody(bodyOptions)
        this.collisionBox = new CollisionBox(new Vector(), dimensions.copy(), this.body)
        this.velocity = direction.multiplyByScalar(speed)
        this.observable = new Observable()
    }

    update() {
        this.body.move(this.velocity)
    }

    draw() {
        canvas.fillCircle(this.body.position, this.body.dimensions.values[0], 'blue')
    }

    addObserver(observer: Observer){
        this.observable.add(observer)
    }

    colliding(otherCollisionBox: CollisionBox) {
        return colliding(this.collisionBox, otherCollisionBox)
    }

    hit(){
        const options: CircleExplosionEventData = {
            position: this.body.position.copy(),
            options: {
                particleSize:  new Vector(10, 10),
                particleNumber: 7,
                startDistanceFromOrigin: 5
            }
        }
        this.observable.notify(ParticleEffectsManagerEvents.CircleExplosion, options)
    }
}



// Types



export type CreateBulletOptions = {
    position: Vector,
    direction: Vector,
    dimensions: Vector,
    speed: number
}

export function isBullet(input): input is Bullet {
    return (input as Bullet).hit !== undefined
}

export function isCreateBulletOptions(input): input is CreateBulletOptions {
    return (input as CreateBulletOptions).position !== undefined
    || (input as CreateBulletOptions).direction !== undefined
    || (input as CreateBulletOptions).dimensions !== undefined
    || (input as CreateBulletOptions).speed !== undefined
}

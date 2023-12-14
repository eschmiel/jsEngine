import { Collidable, colliding } from "../../services/collisions/collisions.js"
import { Observable, Observer, ObserverEventData, ObserverEventType } from "../../services/observable.js"
import { CreateBulletOptions, Bullet } from "./bullet.js"

export class BulletManager {    
    bullets: Bullet[]
    observable: Observable

    constructor() {
        this.observable = new Observable()
        this.bullets = []
    }

    add(newBullet: Bullet){
        newBullet.addObserver(this)
        this.bullets.push(newBullet)
    }

    remove(bulletToRemove: Bullet) {
        this.bullets = this.bullets.filter((bullet) => bullet !== bulletToRemove)
    }

    onNotify(event: ObserverEventType, data: ObserverEventData){
        this.observable.notify(event, data)
    }

    checkForBulletCollisions(collisionTarget: Collidable) {
        let hit = false
        this.bullets.forEach((bullet) => {
            if(colliding(bullet.collisionBox, collisionTarget?.collisionBox)){
                bullet.hit()
                hit = true
            }
        })
        return hit
    }

    update() {
        this.bullets.forEach((bullet) => bullet.update())
    }

    addObserver(observer: Observer) {
        this.observable.add(observer)
    }
}



// Types



export function isBullet(input: ObserverEventData): input is Bullet {
    return (input as Bullet).hit !== undefined
}

export enum BulletManagerEvents {
    create = 'createBullet',
    remove = 'removeFromBulletManager'
}

export type BulletManagerEventData = Bullet | CreateBulletOptions
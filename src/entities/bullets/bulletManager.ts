import { Collidable, colliding } from "../../services/collisions/collisions.js"
import { ParticleEffectsManager } from "../../services/particles/particleEffectsManager.js"
import { ObserverEventData, ObserverEventType } from "../../types.js"
import { CreateBulletOptions, Bullet, isCreateBulletOptions } from "./bullet.js"

export class BulletManager {    
    bullets: Bullet[]
    particleEffectsManager: ParticleEffectsManager

    constructor(particleEffectsManager: ParticleEffectsManager) {
        this.particleEffectsManager = particleEffectsManager
        this.bullets = []
    }

    add(options: CreateBulletOptions){
        const newBullet = new Bullet(options)
        newBullet.addObserver(this.particleEffectsManager)
        this.bullets.push(newBullet)
    }

    remove(bulletToRemove: Bullet) {
        this.bullets = this.bullets.filter((bullet) => bullet !== bulletToRemove)
    }

    onNotify(event: ObserverEventType, data: ObserverEventData){
        switch(event) {
            case BulletManagerEvents.create:
                if(isCreateBulletOptions(data)) this.add(data)
                break;
            case BulletManagerEvents.remove:
                if(isBullet(data)) this.remove(data)
                break
            default:
        }
    }

    checkForBulletCollisions(collisionTarget: Collidable) {
        let hit = false
        this.bullets.forEach((bullet) => {
            if(colliding(bullet.collisionBox, collisionTarget.collisionBox)){
                bullet.hit()
                hit = true
            }
        })
        return hit
    }

    update() {
        this.bullets.forEach((bullet) => bullet.update())
    }

    draw() {
        this.bullets.forEach((bullet) => bullet.draw())
    }
}



// Types



function isBullet(input: ObserverEventData): input is Bullet {
    return (input as Bullet).hit !== undefined
}

export enum BulletManagerEvents {
    create = 'createBullet',
    remove = 'removeFromBulletManager'
}

export type BulletManagerEventData = Bullet | CreateBulletOptions
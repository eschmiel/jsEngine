import { CreateBulletOptions, Bullet } from "./bullet.js"

export class BulletManager {    
    bullets: Bullet[]

    constructor() {
        this.bullets = []
    }

    add(newBullet: Bullet){
        this.bullets.push(newBullet)
    }

    remove(bulletToRemove: Bullet) {
        this.bullets = this.bullets.filter((bullet) => bullet !== bulletToRemove)
    }

    forEachBullet(callbackFn) {
        this.bullets.forEach(callbackFn)
    }

    update() {
        this.bullets.forEach((bullet) => bullet.update())
    }
}
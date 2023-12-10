import { ParticleEffectsManager } from "../services/particles/particleEffectsManager.js"
import { Vector } from "../services/vector.js"
import { BulletManager } from "./bullets/bulletManager.js"
import Ship from "./ship/ship.js"

export class Player {
    id: number
    ship?: Ship
    bulletManager?: BulletManager

    constructor(id: number) {
        this.id = id
    }

    createShip(position: Vector, particleEffectsManager: ParticleEffectsManager) {
        const [x, y] = position.values
        this.bulletManager = new BulletManager()
        this.bulletManager.addObserver(particleEffectsManager)
        this.ship = new Ship(x, y)
        this.ship.addObserver(particleEffectsManager)
        this.ship.addObserver(this.bulletManager)
    }

    update(){
        this.ship?.update()
        this.bulletManager?.update()
    }
}
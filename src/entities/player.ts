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
        this.bulletManager = new BulletManager(particleEffectsManager)
        // this.ship = new Ship(20, 40, particleEffectsManager)
        this.ship = new Ship(0, 0, particleEffectsManager)
        this.ship.addObserver(particleEffectsManager)
        this.ship.addObserver(this.bulletManager)
    }

    update(){
        this.ship?.update()
        this.bulletManager?.update()
    }

    draw() {
        this.ship?.draw()
        this.bulletManager?.draw()
    }
}
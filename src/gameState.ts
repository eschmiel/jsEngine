
import { BulletManager } from "./entities/bullets/bulletManager.js"
import { Player } from "./entities/player/player.js"
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js"
import { TimeTracker } from "./services/timeTracker.js"
import { Vector } from "./services/math/vector.js"

export default class GameState {
    player: Player
    enemyBullets: BulletManager
    timeTracker: TimeTracker
    particleEffectsManager: ParticleEffectsManager

    constructor() {
        this.player = new Player(1)
        this.player.createShip(new Vector(200, 400))
        this.enemyBullets = new BulletManager()
        this.timeTracker = new TimeTracker()
    }
}
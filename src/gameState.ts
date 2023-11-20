import { Bullet, BulletManager } from "./entities/bullet.js"
import { Player } from "./entities/player.js"
import Ship from "./entities/ship/ship.js"
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js"
import { TimeTracker } from "./services/timeTracker.js"
import { Vector } from "./services/vector.js"

export default class GameState {
    player: Player
    enemyBullets: BulletManager
    timeTracker: TimeTracker
    particleEffectsManager: ParticleEffectsManager

    constructor() {
        this.particleEffectsManager = new ParticleEffectsManager(),
        // this.player = new Ship(20, 40, this.particleEffectsManager),
        // this.player.addObserver(this.particleEffectsManager)
        this.player = new Player(1)
        this.player.createShip(new Vector(), this.particleEffectsManager)
        this.enemyBullets = new BulletManager(),
        this.timeTracker = new TimeTracker()

        this.enemyBullets.bullets.push(new Bullet(new Vector(400, 400,), 10))
    }
}
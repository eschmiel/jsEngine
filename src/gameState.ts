import { Bullet, BulletManager } from "./entities/bullet.js"
import Ship from "./entities/ship/ship.js"
import { TimeTracker } from "./services/timeTracker.js"
import { Vector } from "./services/vector.js"

export default class GameState {
    player: Ship
    enemyBullets: BulletManager
    timeTracker: TimeTracker

    constructor() {
        this.player = new Ship(20, 40),
        this.enemyBullets = new BulletManager(),
        this.timeTracker = new TimeTracker()

        this.enemyBullets.bullets.push(new Bullet(new Vector(400, 400,), 10))
    }
}
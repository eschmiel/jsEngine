import { Bullet, BulletManager } from "./entities/bullet.js"
import Ship from "./entities/ship.js"
import { TimeTracker } from "./services/timeTracker.js"

export default class GameState {
    player: Ship
    enemyBullets: BulletManager
    timeTracker: TimeTracker

    constructor() {
        this.player = new Ship(20, 40),
        this.enemyBullets = new BulletManager(),
        this.timeTracker = new TimeTracker()

        this.enemyBullets.bullets.push(new Bullet(400, 400, 10))
    }
}
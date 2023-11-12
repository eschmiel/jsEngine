import { Bullet, BulletManager } from "./entities/bullet.js";
import Ship from "./entities/ship.js";
import { TimeTracker } from "./services/timeTracker.js";
var GameState = /** @class */ (function () {
    function GameState() {
        this.player = new Ship(20, 40),
            this.enemyBullets = new BulletManager(),
            this.timeTracker = new TimeTracker();
        this.enemyBullets.bullets.push(new Bullet(400, 400, 10));
    }
    return GameState;
}());
export default GameState;
//# sourceMappingURL=gameState.js.map
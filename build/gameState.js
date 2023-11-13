import { Bullet, BulletManager } from "./entities/bullet.js";
import Ship from "./entities/ship/ship.js";
import { TimeTracker } from "./services/timeTracker.js";
import { Vector } from "./services/vector.js";
var GameState = /** @class */ (function () {
    function GameState() {
        this.player = new Ship(20, 40),
            this.enemyBullets = new BulletManager(),
            this.timeTracker = new TimeTracker();
        this.enemyBullets.bullets.push(new Bullet(new Vector(400, 400), 10));
    }
    return GameState;
}());
export default GameState;
//# sourceMappingURL=gameState.js.map
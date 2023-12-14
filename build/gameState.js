import { BulletManager } from "./entities/bullets/bulletManager.js";
import { Player } from "./entities/player/player.js";
import { TimeTracker } from "./services/timeTracker.js";
import { Vector } from "./services/math/vector.js";
var GameState = /** @class */ (function () {
    function GameState() {
        this.player = new Player(1);
        this.player.createShip(new Vector(200, 400));
        this.enemyBullets = new BulletManager();
        this.timeTracker = new TimeTracker();
    }
    return GameState;
}());
export default GameState;
//# sourceMappingURL=gameState.js.map
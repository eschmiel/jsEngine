import { BulletManager } from "./entities/bullets/bulletManager.js";
import { Player } from "./entities/player.js";
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js";
import { TimeTracker } from "./services/timeTracker.js";
import { Vector, createDirection } from "./services/vector.js";
var GameState = /** @class */ (function () {
    function GameState() {
        this.particleEffectsManager = new ParticleEffectsManager(),
            // this.player = new Ship(20, 40, this.particleEffectsManager),
            // this.player.addObserver(this.particleEffectsManager)
            this.player = new Player(1);
        this.player.createShip(new Vector(200, 400), this.particleEffectsManager);
        this.enemyBullets = new BulletManager();
        this.enemyBullets.addObserver(this.particleEffectsManager);
        this.timeTracker = new TimeTracker();
        this.enemyBullets.add({
            position: new Vector(400, 400),
            dimensions: new Vector(10, 10),
            direction: createDirection(0),
            speed: 0
        });
        // this.enemyBullets.bullets.push(new Bullet(new Vector(400, 400,), 10))
    }
    return GameState;
}());
export default GameState;
//# sourceMappingURL=gameState.js.map
import Ship from "./entities/ship.js";
import update from './update.js';
import draw from './draw.js';
import EntityManager from "./entities/entityManager.js";
import { Bullet, BulletManager } from "./entities/bullet.js";
(function () {
    var entityManager = new EntityManager([new Ship(20, 40)]);
    var enemyBullets = new BulletManager();
    enemyBullets.bullets[0] = new Bullet(400, 400, 10);
    function game(time) {
        if (time === void 0) { time = null; }
        window.requestAnimationFrame(game);
        update([entityManager, enemyBullets]);
        draw([entityManager, enemyBullets]);
    }
    game();
})();
function initialize() {
    var ship = new Ship(20, 40);
    return ship;
}
//# sourceMappingURL=main.js.map
import { BulletManager } from "./bullets/bulletManager.js";
import Ship from "./ship/ship.js";
var Player = /** @class */ (function () {
    function Player(id) {
        this.id = id;
    }
    Player.prototype.createShip = function (position, particleEffectsManager) {
        var _a = position.values, x = _a[0], y = _a[1];
        this.bulletManager = new BulletManager();
        this.bulletManager.addObserver(particleEffectsManager);
        this.ship = new Ship(x, y);
        this.ship.addObserver(particleEffectsManager);
        this.ship.addObserver(this.bulletManager);
    };
    Player.prototype.update = function () {
        var _a, _b;
        (_a = this.ship) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.bulletManager) === null || _b === void 0 ? void 0 : _b.update();
    };
    return Player;
}());
export { Player };
//# sourceMappingURL=player.js.map
import { BulletManager } from "./bullets/bulletManager.js";
import Ship from "./ship/ship.js";
var Player = /** @class */ (function () {
    function Player(id) {
        this.id = id;
    }
    Player.prototype.createShip = function (position, particleEffectsManager) {
        this.bulletManager = new BulletManager(particleEffectsManager);
        // this.ship = new Ship(20, 40, particleEffectsManager)
        this.ship = new Ship(0, 0, particleEffectsManager);
        this.ship.addObserver(particleEffectsManager);
        this.ship.addObserver(this.bulletManager);
    };
    Player.prototype.update = function () {
        var _a, _b;
        (_a = this.ship) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.bulletManager) === null || _b === void 0 ? void 0 : _b.update();
    };
    Player.prototype.draw = function () {
        var _a, _b;
        (_a = this.ship) === null || _a === void 0 ? void 0 : _a.draw();
        (_b = this.bulletManager) === null || _b === void 0 ? void 0 : _b.draw();
    };
    return Player;
}());
export { Player };
//# sourceMappingURL=player.js.map
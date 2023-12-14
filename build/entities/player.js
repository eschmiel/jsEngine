import { Vector } from "../services/math/vector.js";
import { BulletManager, isBullet } from "./bullets/bulletManager.js";
import Ship, { ShipEvents } from "./ship/ship.js";
import { Respawner, RespawnerEvents } from "../services/respawner.js";
import { Observable } from "../services/observable.js";
import { BulletEvents } from "./bullets/bullet.js";
var Player = /** @class */ (function () {
    function Player(id) {
        this.id = id;
        this.lives = 5;
        this.respawner = new Respawner(60);
        this.observable = new Observable();
        this.respawner.addObserver(this);
    }
    Player.prototype.createShip = function (position, options) {
        var _a = position.values, x = _a[0], y = _a[1];
        this.bulletManager = new BulletManager();
        this.ship = new Ship(x, y, options);
        this.bulletManager.addObserver(this);
        this.ship.addObserver(this);
    };
    Player.prototype.update = function () {
        var _a, _b;
        (_a = this.ship) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.bulletManager) === null || _b === void 0 ? void 0 : _b.update();
        this.respawner.update();
    };
    Player.prototype.onNotify = function (eventType, eventData) {
        switch (eventType) {
            case ShipEvents.death:
                this.lives--;
                if (this.lives > 0) {
                    this.respawner.activate();
                }
                this.ship = null;
                break;
            case RespawnerEvents.respawn:
                this.createShip(new Vector(200, 400), { respawn: true });
                break;
            case ShipEvents.shoot:
                if (isBullet(eventData))
                    this.bulletManager.add(eventData);
                break;
            case BulletEvents.hit:
                if (isBullet(eventData))
                    this.bulletManager.remove(eventData);
                break;
            default:
        }
        this.observable.notify(eventType, eventData);
    };
    Player.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return Player;
}());
export { Player };
//# sourceMappingURL=player.js.map
import { colliding } from "../../services/collisions/collisions.js";
import { Observable } from "../../services/observable.js";
import { Bullet, isCreateBulletOptions } from "./bullet.js";
var BulletManager = /** @class */ (function () {
    function BulletManager() {
        this.observable = new Observable();
        this.bullets = [];
    }
    BulletManager.prototype.add = function (options) {
        var newBullet = new Bullet(options);
        newBullet.addObserver(this);
        this.bullets.push(newBullet);
    };
    BulletManager.prototype.remove = function (bulletToRemove) {
        this.bullets = this.bullets.filter(function (bullet) { return bullet !== bulletToRemove; });
    };
    BulletManager.prototype.onNotify = function (event, data) {
        this.observable.notify(event, data);
        switch (event) {
            case BulletManagerEvents.create:
                if (isCreateBulletOptions(data))
                    this.add(data);
                break;
            case BulletManagerEvents.remove:
                if (isBullet(data))
                    this.remove(data);
                break;
            default:
        }
    };
    BulletManager.prototype.checkForBulletCollisions = function (collisionTarget) {
        var hit = false;
        this.bullets.forEach(function (bullet) {
            if (colliding(bullet.collisionBox, collisionTarget.collisionBox)) {
                bullet.hit();
                hit = true;
            }
        });
        return hit;
    };
    BulletManager.prototype.update = function () {
        this.bullets.forEach(function (bullet) { return bullet.update(); });
    };
    BulletManager.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return BulletManager;
}());
export { BulletManager };
// Types
function isBullet(input) {
    return input.hit !== undefined;
}
export var BulletManagerEvents;
(function (BulletManagerEvents) {
    BulletManagerEvents["create"] = "createBullet";
    BulletManagerEvents["remove"] = "removeFromBulletManager";
})(BulletManagerEvents || (BulletManagerEvents = {}));
//# sourceMappingURL=bulletManager.js.map
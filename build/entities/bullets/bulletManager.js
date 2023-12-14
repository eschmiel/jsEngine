import { colliding } from "../../services/collisions/collisions.js";
import { Observable } from "../../services/observable.js";
var BulletManager = /** @class */ (function () {
    function BulletManager() {
        this.observable = new Observable();
        this.bullets = [];
    }
    BulletManager.prototype.add = function (newBullet) {
        newBullet.addObserver(this);
        this.bullets.push(newBullet);
    };
    BulletManager.prototype.remove = function (bulletToRemove) {
        this.bullets = this.bullets.filter(function (bullet) { return bullet !== bulletToRemove; });
    };
    BulletManager.prototype.onNotify = function (event, data) {
        this.observable.notify(event, data);
    };
    BulletManager.prototype.checkForBulletCollisions = function (collisionTarget) {
        var hit = false;
        this.bullets.forEach(function (bullet) {
            if (colliding(bullet.collisionBox, collisionTarget === null || collisionTarget === void 0 ? void 0 : collisionTarget.collisionBox)) {
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
export function isBullet(input) {
    return input.hit !== undefined;
}
export var BulletManagerEvents;
(function (BulletManagerEvents) {
    BulletManagerEvents["create"] = "createBullet";
    BulletManagerEvents["remove"] = "removeFromBulletManager";
})(BulletManagerEvents || (BulletManagerEvents = {}));
//# sourceMappingURL=bulletManager.js.map
var BulletManager = /** @class */ (function () {
    function BulletManager() {
        this.bullets = [];
    }
    BulletManager.prototype.add = function (newBullet) {
        this.bullets.push(newBullet);
    };
    BulletManager.prototype.remove = function (bulletToRemove) {
        this.bullets = this.bullets.filter(function (bullet) { return bullet !== bulletToRemove; });
    };
    BulletManager.prototype.forEachBullet = function (callbackFn) {
        this.bullets.forEach(callbackFn);
    };
    BulletManager.prototype.update = function () {
        this.bullets.forEach(function (bullet) { return bullet.update(); });
    };
    return BulletManager;
}());
export { BulletManager };
//# sourceMappingURL=bulletManager.js.map
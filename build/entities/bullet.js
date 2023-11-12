import canvas from "../services/canvas.js";
import { CollisionBox } from "../services/collisions.js";
import { Vector } from "../services/vector.js";
var Bullet = /** @class */ (function () {
    function Bullet(x, y, radius) {
        this.position = new Vector(x, y);
        this.dimensions = new Vector(radius * 2, radius * 2);
        this.radius = radius;
        this.collisionBox = new CollisionBox(new Vector(0, 0), this.dimensions, this);
    }
    Bullet.prototype.update = function () { };
    Bullet.prototype.draw = function () {
        canvas.fillCircle(this.position, this.radius, 'blue');
    };
    return Bullet;
}());
export { Bullet };
var BulletManager = /** @class */ (function () {
    function BulletManager() {
        this.bullets = [];
    }
    BulletManager.prototype.update = function () {
        this.bullets.forEach(function (bullet) { return bullet.update(); });
    };
    BulletManager.prototype.draw = function () {
        this.bullets.forEach(function (bullet) { return bullet.draw(); });
    };
    return BulletManager;
}());
export { BulletManager };
//# sourceMappingURL=bullet.js.map
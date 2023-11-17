import canvas from "../services/canvas.js";
import { CollisionBox } from "../services/collisions/collisionBox.js";
import { Vector } from "../services/vector.js";
import { EntityBody } from "./entityBody.js";
var Bullet = /** @class */ (function () {
    function Bullet(position, radius) {
        var entityBodyOptions = {
            position: position.copy(),
            dimensions: new Vector(radius * 2, radius * 2)
        };
        this.body = new EntityBody(entityBodyOptions);
        this.radius = radius;
        this.collisionBox = new CollisionBox(new Vector(0, 0), this.body.dimensions, this.body);
    }
    Bullet.prototype.update = function () { };
    Bullet.prototype.draw = function () {
        canvas.fillCircle(this.body.position, this.radius, 'blue');
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
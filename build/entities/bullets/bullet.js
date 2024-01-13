import { CollisionBox } from "../../services/collisions/collisionBox.js";
import { colliding } from "../../services/collisions/collisions.js";
import { Vector } from "../../services/math/vector.js";
import { EntityBody } from "../entityBody.js";
var Bullet = /** @class */ (function () {
    function Bullet(options) {
        var position = options.position, direction = options.direction, dimensions = options.dimensions, speed = options.speed;
        var bodyOptions = {
            position: position.copy(),
            dimensions: dimensions.copy()
        };
        this.body = new EntityBody(bodyOptions);
        this.collisionBox = new CollisionBox(new Vector(0, 0), dimensions.copy(), this.body);
        this.velocity = direction.multiplyByScalar(speed);
    }
    Bullet.prototype.update = function () {
        this.body.move(this.velocity);
    };
    Bullet.prototype.colliding = function (otherCollisionBox) {
        return colliding(this.collisionBox, otherCollisionBox);
    };
    return Bullet;
}());
export { Bullet };
export function isCreateBulletOptions(input) {
    return input.position !== undefined
        || input.direction !== undefined
        || input.dimensions !== undefined
        || input.speed !== undefined;
}
//# sourceMappingURL=bullet.js.map
import { CollisionBox } from "../../services/collisions/collisionBox.js";
import { colliding } from "../../services/collisions/collisions.js";
import { Observable } from "../../services/observable.js";
import { ParticleEffectsManagerEvents } from "../../services/particles/particleEffectsManager.js";
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
        this.observable = new Observable();
    }
    Bullet.prototype.update = function () {
        this.body.move(this.velocity);
        if (this.body.position.values[0] < 0
            || this.body.position.values[0] > 1000
            || this.body.position.values[1] < 0
            || this.body.position.values[1] > 600) {
            this.hit();
        }
    };
    Bullet.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    Bullet.prototype.colliding = function (otherCollisionBox) {
        return colliding(this.collisionBox, otherCollisionBox);
    };
    Bullet.prototype.hit = function () {
        var options = {
            position: this.body.position.copy(),
            options: {
                particleSize: new Vector(10, 10),
                particleNumber: 7,
                startDistanceFromOrigin: 5
            }
        };
        this.observable.notify(ParticleEffectsManagerEvents.CircleExplosion, options);
        this.observable.notify(BulletEvents.hit, this);
    };
    return Bullet;
}());
export { Bullet };
export function isBullet(input) {
    return input.hit !== undefined;
}
export function isCreateBulletOptions(input) {
    return input.position !== undefined
        || input.direction !== undefined
        || input.dimensions !== undefined
        || input.speed !== undefined;
}
export var BulletEvents;
(function (BulletEvents) {
    BulletEvents["hit"] = "hit";
})(BulletEvents || (BulletEvents = {}));
//# sourceMappingURL=bullet.js.map
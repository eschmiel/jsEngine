var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import canvas from '../services/canvas.js';
import { Vector, createDirection } from '../services/vector.js';
import Controller from '../services/controller.js';
import { Lerp } from '../util.js';
import { CollisionBox, colliding } from '../services/collisions.js';
import { TriangleExplosion } from '../services/particles.js';
// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/
var Ship = /** @class */ (function () {
    function Ship(x, y) {
        var _this = this;
        this.getCenterX = function () {
            var x = _this.position.values[0];
            var width = _this.dimensions.values[0];
            return x + width / 2;
        };
        this.getCenterY = function () {
            var y = _this.position.values[1];
            var height = _this.dimensions.values[1];
            return y + height / 2;
        };
        this.position = new Vector(x, y);
        this.dimensions = new Vector(28, 25);
        this.rotation = 0;
        this.speed = 0;
        this.maxSpeed = 15;
        this.accelerationLerp = new Lerp(0, 0, .04);
        this.boostCooldown = 0;
        this.boostSpeed = 0;
        this.boostMaxSpeed = 20;
        this.boostLerp = new Lerp(0, 0, .1);
        this.shipColor = "black";
        this.alive = true;
        this.collisionBox = new CollisionBox(new Vector(0, 0), this.dimensions, this);
    }
    Ship.prototype.createTrianglePoints = function () {
        var _a = this.position.values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        return [
            new (Vector.bind.apply(Vector, __spreadArray([void 0], this.position.values, false)))(),
            new Vector(x + width, this.getCenterY()),
            new Vector(x, y + height)
        ];
    };
    Ship.prototype.draw = function () {
        if (this.alive) {
            this.collisionBox.draw();
            canvas.save();
            var trianglePoints = this.createTrianglePoints();
            canvas.rotate(this.rotation, this.getCenterX(), this.getCenterY());
            canvas.fillTriangle(trianglePoints, this.shipColor);
            canvas.restore();
        }
        else {
            this.deathExplosion.draw();
        }
    };
    Ship.prototype.update = function () {
        if (this.alive) {
            var direction = createDirection(this.rotation);
            var distanceInDirection = direction.multiplyByScalar(this.speed);
            this.position = this.position.addVector(distanceInDirection);
            if (this.boosting) {
                var distanceInBoostDirection = this.boostDirection.multiplyByScalar(this.boostSpeed);
                this.position = this.position.addVector(distanceInBoostDirection);
                if (this.boostSpeed >= this.boostMaxSpeed) {
                    this.boosting = false;
                    this.boostLerp.redirect(0);
                }
            }
            else if (this.boostCooldown > 0)
                this.boostCooldown -= 1;
            this.boostSpeed = this.boostLerp.run();
            this.control();
        }
        else {
            this.deathExplosion.update();
        }
    };
    Ship.prototype.control = function () {
        if (Controller.ArrowUp) {
            if (this.accelerationLerp.destination !== this.maxSpeed)
                this.accelerationLerp.redirect(this.maxSpeed);
            this.speed = this.accelerationLerp.run();
        }
        if (Controller.ArrowDown) {
            if (this.accelerationLerp.destination !== -this.maxSpeed)
                this.accelerationLerp.redirect(-this.maxSpeed);
            this.speed = this.accelerationLerp.run();
        }
        if (Controller.ArrowLeft) {
            this.rotation -= 5;
            if (this.rotation < 0)
                this.rotation += 360;
        }
        if (Controller.ArrowRight) {
            this.rotation += 5;
            if (this.rotation > 360)
                this.rotation -= 360;
        }
        if (!Controller.ArrowDown && !Controller.ArrowUp) {
            if (this.accelerationLerp.destination !== 0)
                this.accelerationLerp.redirect(0);
            this.speed = this.accelerationLerp.run();
        }
        if (Controller.w)
            this.boost();
        if (Controller.s)
            this.boost(180);
        if (Controller.a)
            this.boost(270);
        if (Controller.d)
            this.boost(90);
    };
    Ship.prototype.boost = function (angle) {
        if (angle === void 0) { angle = 0; }
        if (!this.boostCooldown) {
            this.boosting = true;
            this.boostLerp.redirect(this.boostMaxSpeed);
            this.boostCooldown = 100;
            this.boostDirection = createDirection(this.rotation + angle);
        }
    };
    Ship.prototype.collideWithBullets = function (bulletManager) {
        var _this = this;
        if (this.alive) {
            bulletManager.bullets.forEach(function (bullet) {
                if (colliding(bullet.collisionBox, _this.collisionBox))
                    _this.die();
            });
        }
    };
    Ship.prototype.die = function () {
        this.alive = false;
        this.deathExplosion = new TriangleExplosion(this.position.copy(), new Vector(10, 10), 7);
    };
    return Ship;
}());
export default Ship;
//# sourceMappingURL=ship.js.map
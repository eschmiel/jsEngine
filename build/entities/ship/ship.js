import { Vector, createDirection } from '../../services/vector.js';
import Controller from '../../services/controller.js';
import { colliding } from '../../services/collisions/collisions.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/lerpers/accelerator.js';
import { Booster } from './booster.js';
import { EntityBodyTriangleDrawTypes, drawEntityBodyTriangle } from '../drawEntityBody.js';
import { ParticleEffectsManagerEvents } from '../../services/particles/particleEffectsManager.js';
import { Observable } from '../../services/observable.js';
import { BulletManagerEvents } from '../bullets/bulletManager.js';
// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/
var Ship = /** @class */ (function () {
    function Ship(x, y, particleEffectsManager) {
        var dimensions = new Vector(28, 25);
        this.particleEffectsManager = particleEffectsManager;
        var entityBodyOptions = {
            position: new Vector(x, y),
            dimensions: dimensions.copy()
        };
        this.body = new EntityBody(entityBodyOptions);
        this.accelerator = new Accelerator(0, 15, .04);
        this.booster = new Booster(this, 30, 100);
        this.shipColor = "black";
        this.alive = true;
        this.observable = new Observable();
        this.collisionBox = new CollisionBox(new Vector(0, 0), dimensions.copy(), this.body);
    }
    Ship.prototype.createTrianglePoints = function () {
        var _a = this.body.getPosition(), x = _a[0], y = _a[1];
        var _b = this.body.getCenterPosition(), centerX = _b[0], centerY = _b[1];
        var _c = this.body.getEndPosition(), endX = _c[0], endY = _c[1];
        return [
            this.body.position.copy(),
            new Vector(endX, centerY),
            new Vector(x, endY)
        ];
    };
    Ship.prototype.draw = function () {
        this.alive ? drawEntityBodyTriangle(this.body, EntityBodyTriangleDrawTypes.Fill) : null;
    };
    Ship.prototype.update = function () {
        if (this.alive) {
            this.body.update();
            this.booster.update();
            this.control();
            this.body.speed = this.accelerator.run();
        }
    };
    Ship.prototype.control = function () {
        if (Controller.ArrowUp) {
            this.accelerator.setDirection(AcceleratorDirection.Forward);
        }
        if (Controller.ArrowDown)
            this.accelerator.setDirection(AcceleratorDirection.Backward);
        if (Controller.ArrowLeft)
            this.body.adjustRotation(-11);
        if (Controller.ArrowRight)
            this.body.adjustRotation(11);
        if (!Controller.ArrowDown && !Controller.ArrowUp)
            this.accelerator.setDirection(AcceleratorDirection.Stop);
        if (Controller.w)
            this.booster.activate();
        if (Controller.s)
            this.booster.activate(180);
        if (Controller.a)
            this.booster.activate(270);
        if (Controller.d)
            this.booster.activate(90);
        if (Controller[' '])
            this.shoot();
    };
    Ship.prototype.shoot = function () {
        console.log('beep');
        var direction = createDirection(this.body.rotation);
        var rotatedXAxis = createDirection(this.body.rotation);
        var rotatedYAxis = createDirection(this.body.rotation + 90);
        var rotatedX = rotatedXAxis.multiplyByScalar(this.body.position.values[0]);
        var rotatedY = rotatedYAxis.multiplyByScalar(this.body.position.values[1]);
        var rotatedPosition = rotatedX.addVector(rotatedY);
        var startingPosition = this.body.position.copy(); //.multiplyByScalar(-20 + this.body.dimensions.values[0])
        // startingPosition.values[1]+=5
        startingPosition = startingPosition.multiplyVector(direction);
        var bullet1Options = {
            position: rotatedPosition,
            dimensions: new Vector(5, 5),
            speed: 20,
            direction: direction
        };
        var bullet2Positon = this.body.position.copy();
        var startingPosition2 = this.body.position.copy().addVector(direction.multiplyByScalar(-20 + this.body.dimensions.values[0]));
        startingPosition2.values[1] += 19;
        bullet2Positon.values[0] += this.body.dimensions.values[0];
        var bullet2Options = {
            position: startingPosition2,
            dimensions: new Vector(5, 5),
            speed: 20,
            direction: direction
        };
        this.observable.notify(BulletManagerEvents.create, bullet1Options);
        // this.observable.notify(BulletManagerEvents.create, bullet2Options)
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
        var options = {
            position: this.body.position.copy(),
            options: {
                particleSize: new Vector(10, 10),
                particleNumber: 7,
                startDistanceFromOrigin: 5
            }
        };
        this.observable.notify(ParticleEffectsManagerEvents.CircleExplosion, options);
        // this.particleEffectsManager.createCircleExplosionEffect(this.body.position.copy(), options)
    };
    Ship.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return Ship;
}());
export default Ship;
//# sourceMappingURL=ship.js.map
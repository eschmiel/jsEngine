import { Vector, createDirection } from '../../services/vector.js';
import Controller from '../../services/controller.js';
import { colliding } from '../../services/collisions/collisions.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/lerpers/accelerator.js';
import { Booster } from './booster.js';
import { ParticleEffectsManagerEvents } from '../../services/particles/particleEffectsManager.js';
import { Observable } from '../../services/observable.js';
import { BulletManagerEvents } from '../bullets/bulletManager.js';
import { rotatePoint } from '../../services/transformations.js';
// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/
var Ship = /** @class */ (function () {
    function Ship(x, y) {
        var dimensions = new Vector(28, 25);
        var entityBodyOptions = {
            position: new Vector(x, y),
            dimensions: dimensions.copy()
        };
        this.body = new EntityBody(entityBodyOptions);
        this.accelerator = new Accelerator(0, 15, .04);
        this.booster = new Booster(this, 30, 100);
        this.alive = true;
        this.observable = new Observable();
        this.collisionBox = new CollisionBox(new Vector(0, 0), dimensions.copy(), this.body);
    }
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
        var _a = this.body.getDimensions(), shipWidth = _a[0], shipHeight = _a[1];
        var bullet1ShipOffset = new Vector(shipWidth / 2 - 16, 6);
        var bullet2ShipOffset = new Vector(shipWidth / 2 - 16, -6);
        this.createBullet(bullet1ShipOffset);
        this.createBullet(bullet2ShipOffset);
    };
    Ship.prototype.createBullet = function (shipPositionOffset) {
        var direction = createDirection(this.body.rotation);
        var rotatedPosition = rotatePoint(shipPositionOffset, this.body.rotation);
        var bulletPosition = rotatedPosition.addVector(this.body.position);
        var bulletOptions = {
            position: bulletPosition,
            dimensions: new Vector(3, 3),
            speed: 20,
            direction: direction
        };
        this.observable.notify(BulletManagerEvents.create, bulletOptions);
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
    };
    Ship.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return Ship;
}());
export default Ship;
//# sourceMappingURL=ship.js.map
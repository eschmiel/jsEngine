import { Vector } from '../../services/vector.js';
import Controller from '../../services/controller.js';
import { colliding } from '../../services/collisions/collisions.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/accelerator.js';
import { Booster } from './booster.js';
import { EntityBodyTriangleDrawTypes, drawEntityBodyTriangle } from '../drawEntityBody.js';
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
        this.collisionBox = new CollisionBox(new Vector(0, 0), dimensions.copy(), this.body);
        // this.music = new Audio('./Skull_Break.wav')
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
            // this.music.play()
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
        // this.deathExplosion = new TriangleExplosion(this.body.position.copy(), new Vector(10, 10), 7)
        var options = {
            particleSize: new Vector(10, 10),
            particleNumber: 7,
            startDistanceFromOrigin: 5
        };
        this.particleEffectsManager.createCircleExplosionEffect(this.body.position.copy(), options);
    };
    return Ship;
}());
export default Ship;
//# sourceMappingURL=ship.js.map
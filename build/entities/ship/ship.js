import { Vector } from '../../services/math/vector.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/lerpers/accelerator.js';
import { Booster } from './booster.js';
import { Direction } from '../../constants.js';
// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/
var Ship = /** @class */ (function () {
    function Ship(position) {
        var dimensions = new Vector(28, 25);
        var entityBodyOptions = {
            position: position.copy(),
            dimensions: dimensions.copy()
        };
        this.body = new EntityBody(entityBodyOptions);
        this.accelerator = new Accelerator(0, 15, .04);
        this.booster = new Booster(this, 30, 100);
        this.collisionBox = new CollisionBox(new Vector(0, 0), dimensions.copy(), this.body);
    }
    Ship.prototype.update = function () {
        this.body.update();
        this.booster.update();
        this.body.speed = this.accelerator.run();
    };
    Ship.prototype.rotate = function (direction) {
        if (direction !== Direction.Left && direction !== Direction.Right)
            return;
        var rotation = 11;
        if (direction === Direction.Left)
            rotation *= -1;
        this.body.adjustRotation(rotation);
    };
    Ship.prototype.accelerate = function () {
        this.accelerator.setDirection(AcceleratorDirection.Forward);
    };
    Ship.prototype.reverse = function () {
        this.accelerator.setDirection(AcceleratorDirection.Backward);
    };
    Ship.prototype.comeToRest = function () {
        this.accelerator.setDirection(AcceleratorDirection.Stop);
    };
    Ship.prototype.boost = function (direction) {
        switch (direction) {
            case Direction.Forward:
                this.booster.activate();
                break;
            case Direction.Backward:
                this.booster.activate(180);
                break;
            case Direction.Left:
                this.booster.activate(270);
                break;
            case Direction.Right:
                this.booster.activate(90);
                break;
            default:
                throw new Error("ship.bosst(direction) failed - no acceptable direction parameter was provided. direction: ".concat(direction));
        }
    };
    return Ship;
}());
export default Ship;
//# sourceMappingURL=ship.js.map
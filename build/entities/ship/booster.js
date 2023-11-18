import { Accelerator, AcceleratorDirection } from "../../services/lerpers/accelerator.js";
import { createDirection } from "../../services/vector.js";
var Booster = /** @class */ (function () {
    function Booster(target, boostSpeed, coolDown) {
        if (coolDown === void 0) { coolDown = 100; }
        this.active = false;
        this.target = target;
        this.coolDownTime = coolDown;
        this.coolDownTimer = 0;
        this.boostSpeed = boostSpeed;
        this.direction = createDirection();
        this.accelerator = new Accelerator(0, this.boostSpeed, .3);
    }
    Booster.prototype.activate = function (angle) {
        if (angle === void 0) { angle = 0; }
        if (!this.coolDownTimer) {
            this.active = true;
            this.coolDownTimer = this.coolDownTime;
            this.accelerator.setDirection(AcceleratorDirection.Forward);
            this.direction = createDirection(this.target.body.rotation + angle);
        }
    };
    Booster.prototype.deactivate = function () {
        this.active = false;
        this.accelerator.setDirection(AcceleratorDirection.Stop);
    };
    Booster.prototype.update = function () {
        var currentSpeed = this.accelerator.run();
        if (this.active && currentSpeed >= this.boostSpeed)
            this.deactivate();
        if (this.coolDownTimer > 0)
            this.coolDownTimer -= 1;
        if (currentSpeed)
            this.moveTarget(currentSpeed);
    };
    Booster.prototype.moveTarget = function (currentSpeed) {
        var distanceInDirection = this.direction.multiplyByScalar(currentSpeed);
        this.target.body.position = this.target.body.position.addVector(distanceInDirection);
    };
    return Booster;
}());
export { Booster };
//# sourceMappingURL=booster.js.map
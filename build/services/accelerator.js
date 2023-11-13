import { Lerp } from "../util.js";
export var AcceleratorDirection;
(function (AcceleratorDirection) {
    AcceleratorDirection["Forward"] = "forward";
    AcceleratorDirection["Backward"] = "backward";
    AcceleratorDirection["Stop"] = "stop";
})(AcceleratorDirection || (AcceleratorDirection = {}));
var Accelerator = /** @class */ (function () {
    function Accelerator(targetSpeed, accelerationRate) {
        this.targetSpeed = targetSpeed;
        this.direction = AcceleratorDirection.Stop;
        this.lerp = new Lerp(0, 0, accelerationRate);
    }
    Accelerator.prototype.getCurrentLerpTarget = function () {
        return this.lerp.destination;
    };
    Accelerator.prototype.run = function () {
        return this.lerp.run();
    };
    Accelerator.prototype.reset = function () {
        this.lerp.reset();
    };
    Accelerator.prototype.setDirection = function (newDirection) {
        if (newDirection === this.direction)
            return;
        switch (newDirection) {
            case AcceleratorDirection.Forward:
                this.lerp.redirect(this.targetSpeed);
                break;
            case AcceleratorDirection.Backward:
                this.lerp.redirect(-this.targetSpeed);
                break;
            case AcceleratorDirection.Stop:
                this.lerp.redirect(0);
                break;
            default:
                throw new Error("Accelerator was given an unacceptable direction: ".concat(newDirection));
        }
        this.direction = newDirection;
    };
    return Accelerator;
}());
export { Accelerator };
//# sourceMappingURL=accelerator.js.map
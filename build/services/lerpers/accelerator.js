import { Lerp } from "./lerp.js";
var Accelerator = /** @class */ (function () {
    function Accelerator(startingSpeed, maxSpeed, accelerationRate, direction) {
        if (startingSpeed === void 0) { startingSpeed = 0; }
        if (maxSpeed === void 0) { maxSpeed = 0; }
        if (accelerationRate === void 0) { accelerationRate = .01; }
        if (direction === void 0) { direction = AcceleratorDirection.Stop; }
        this.maxSpeed = maxSpeed;
        this.lerp = new Lerp(startingSpeed, maxSpeed, accelerationRate);
        this.setDirection(direction);
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
                this.lerp.redirect(this.maxSpeed);
                break;
            case AcceleratorDirection.Backward:
                this.lerp.redirect(-this.maxSpeed);
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
///// Types and Enums
export var AcceleratorDirection;
(function (AcceleratorDirection) {
    AcceleratorDirection["Forward"] = "forward";
    AcceleratorDirection["Backward"] = "backward";
    AcceleratorDirection["Stop"] = "stop";
})(AcceleratorDirection || (AcceleratorDirection = {}));
//# sourceMappingURL=accelerator.js.map
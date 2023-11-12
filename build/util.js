import { Vector } from "./services/vector.js";
export var degreesToRadians = function (degrees) { return (Math.PI / 180) * degrees; };
var Lerp = /** @class */ (function () {
    function Lerp(origin, destination, accelerationRate) {
        this.currentTime = 0;
        this.origin = origin;
        this.destination = destination;
        this.accelerationRate = accelerationRate;
    }
    Lerp.prototype.run = function () {
        var value = this.lerp();
        this.currentTime += this.accelerationRate;
        if (this.currentTime > 1)
            this.currentTime = 1;
        return value;
    };
    Lerp.prototype.lerp = function () {
        return this.origin * (1 - this.currentTime) + this.destination * this.currentTime;
    };
    Lerp.prototype.redirect = function (destination) {
        this.origin = this.lerp();
        this.destination = destination;
        this.currentTime = 0;
    };
    return Lerp;
}());
export { Lerp };
export var getCenterPosition = function (position, dimensions) {
    var _a = position.values, x = _a[0], y = _a[1];
    var _b = dimensions.values, width = _b[0], height = _b[1];
    var centerX = x + width / 2;
    var centerY = y + height / 2;
    return new Vector(centerX, centerY);
};
//# sourceMappingURL=util.js.map
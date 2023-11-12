export var degreesToRadians = function (degrees) { return (Math.PI / 180) * degrees; };
// export const lerp = (start: number, end: number, t: number): number => {
//     return start * (1 - t) + end * t
// }
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
    Lerp.prototype.redirect = function (destination, accelerationRate) {
        if (accelerationRate === void 0) { accelerationRate = this.accelerationRate; }
        this.origin = this.lerp();
        this.destination = destination;
        this.currentTime = 0;
    };
    return Lerp;
}());
export { Lerp };
//# sourceMappingURL=util.js.map
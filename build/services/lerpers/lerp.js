var Lerp = /** @class */ (function () {
    function Lerp(origin, destination, accelerationRate) {
        this.currentTime = 0;
        this.origin = origin;
        this.destination = destination;
        this.accelerationRate = accelerationRate;
    }
    Lerp.prototype.run = function () {
        if (this.currentTime >= 1)
            return this.destination;
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
    Lerp.prototype.reset = function () {
        this.origin = 0;
        this.currentTime = 0;
        this.destination = 0;
    };
    return Lerp;
}());
export { Lerp };
//# sourceMappingURL=lerp.js.map
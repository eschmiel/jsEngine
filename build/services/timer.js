var Timer = /** @class */ (function () {
    function Timer(timeLimit) {
        this.timeLimit = timeLimit;
        this.currentTime = 0;
        this.active = false;
    }
    Timer.prototype.activate = function () {
        if (!this.active) {
            this.currentTime = this.timeLimit;
            this.active = true;
        }
    };
    Timer.prototype.deactivate = function () {
        if (this.active) {
            this.active = false;
            this.currentTime = 0;
        }
    };
    Timer.prototype.update = function () {
        if (this.active) {
            this.currentTime--;
            if (this.currentTime <= 0) {
                this.active = false;
            }
        }
    };
    return Timer;
}());
export { Timer };
//# sourceMappingURL=timer.js.map
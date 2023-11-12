var TimeTracker = /** @class */ (function () {
    function TimeTracker() {
        this.previousTimeInSeconds = 0;
        this.timeBetweenUpdates = 0;
        this.timeLimitBetweenUpdates = 1 / 60;
    }
    // current time should be in milliseconds
    TimeTracker.prototype.trackTime = function (currentTime) {
        var currentTimeInSeconds = currentTime / 1000;
        var timePassed = currentTimeInSeconds - this.previousTimeInSeconds;
        this.previousTimeInSeconds = currentTimeInSeconds;
        this.timeBetweenUpdates += timePassed;
    };
    TimeTracker.prototype.isTimeBetweenUpdatesOverTimeLimit = function () {
        return this.timeBetweenUpdates > this.timeLimitBetweenUpdates;
    };
    TimeTracker.prototype.logUpdate = function () {
        this.timeBetweenUpdates -= this.timeLimitBetweenUpdates;
    };
    return TimeTracker;
}());
export { TimeTracker };
//# sourceMappingURL=timeTracker.js.map
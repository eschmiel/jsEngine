import { Observable } from "./observable.js";
var Timer = /** @class */ (function () {
    function Timer(timeLimit, timeCompleteEvent, timeCompleteEventData) {
        this.timeLimit = timeLimit;
        this.currentTime = 0;
        this.active = false;
        this.observable = new Observable();
        this.timeCompleteEvent = timeCompleteEvent;
        this.timeCompleteEventData = timeCompleteEventData;
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
                this.observable.notify(this.timeCompleteEvent, this.timeCompleteEventData);
            }
        }
    };
    Timer.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return Timer;
}());
export { Timer };
export var TimerEvents;
(function (TimerEvents) {
    TimerEvents["Done"] = "done";
})(TimerEvents || (TimerEvents = {}));
//# sourceMappingURL=timer.js.map
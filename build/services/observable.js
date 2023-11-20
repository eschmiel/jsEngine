var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.add = function (observer) {
        this.observers.push(observer);
    };
    Observable.prototype.remove = function (observerToRemove) {
        this.observers = this.observers.filter(function (observer) { return observer !== observerToRemove; });
    };
    Observable.prototype.notify = function (event, data) {
        this.observers.forEach(function (observer) { return observer.onNotify(event, data); });
    };
    return Observable;
}());
export { Observable };
//# sourceMappingURL=observable.js.map
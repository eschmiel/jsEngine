// We tried building the system greatly relying on observables once. Ultimately we
// we decided to pull them out. But the observable class is still here in case we
// we want to use some again in a more limited capacity.
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
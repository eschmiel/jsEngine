var Manager = /** @class */ (function () {
    function Manager() {
        this.managedObjects = [];
    }
    Manager.prototype.push = function (obj) {
        this.managedObjects.push(obj);
    };
    Manager.prototype.update = function () {
        this.managedObjects.forEach(function (object) { return object.update(); });
    };
    Manager.prototype.draw = function () {
        this.managedObjects.forEach(function (object) { return object.draw(); });
    };
    return Manager;
}());
export { Manager };
//# sourceMappingURL=manager.js.map
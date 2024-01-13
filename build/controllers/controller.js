var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        document.addEventListener("keydown", function (event) { return _this[event.key] = true; });
        document.addEventListener("keyup", function (event) { return _this[event.key] = false; });
    }
    return Controller;
}());
export default new Controller();
//# sourceMappingURL=controller.js.map
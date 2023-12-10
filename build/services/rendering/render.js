import Canvas from "../canvas.js";
var RenderingSystem = /** @class */ (function () {
    function RenderingSystem() {
        this.canvas = new Canvas();
    }
    RenderingSystem.prototype.renderFillTriangle = function (trianglePoints, color) {
        if (color === void 0) { color = 'black'; }
        if ((trianglePoints === null || trianglePoints === void 0 ? void 0 : trianglePoints.length) !== 3)
            throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors');
        this.canvas.save();
        this.canvas.fillTriangle(trianglePoints, color);
        this.canvas.restore();
    };
    RenderingSystem.prototype.renderStrokeTriangle = function (trianglePoints, color) {
        if (color === void 0) { color = 'black'; }
        if ((trianglePoints === null || trianglePoints === void 0 ? void 0 : trianglePoints.length) !== 3)
            throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors');
        this.canvas.save();
        this.canvas.strokeTriangle(trianglePoints, color);
        this.canvas.restore();
    };
    RenderingSystem.prototype.renderFillCircle = function (position, radius, color) {
        if (color === void 0) { color = 'black'; }
        this.canvas.save();
        this.canvas.fillCircle(position, radius, color);
        this.canvas.restore();
    };
    RenderingSystem.prototype.clearScreen = function () {
        this.canvas.clearScreen();
    };
    return RenderingSystem;
}());
export { RenderingSystem };
//# sourceMappingURL=render.js.map
import Canvas from "./canvas.js";
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.canvas = new Canvas();
    }
    Renderer.prototype.renderFillTriangle = function (trianglePoints, color) {
        if (color === void 0) { color = 'black'; }
        if ((trianglePoints === null || trianglePoints === void 0 ? void 0 : trianglePoints.length) !== 3)
            throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors');
        this.canvas.save();
        this.canvas.fillTriangle(trianglePoints, color);
        this.canvas.restore();
    };
    Renderer.prototype.renderStrokeTriangle = function (trianglePoints, color) {
        if (color === void 0) { color = 'black'; }
        if ((trianglePoints === null || trianglePoints === void 0 ? void 0 : trianglePoints.length) !== 3)
            throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors');
        this.canvas.save();
        this.canvas.strokeTriangle(trianglePoints, color);
        this.canvas.restore();
    };
    Renderer.prototype.renderFillCircle = function (position, radius, color) {
        if (color === void 0) { color = 'black'; }
        this.canvas.save();
        this.canvas.fillCircle(position, radius, color);
        this.canvas.restore();
    };
    Renderer.prototype.renderRectangle = function (position, dimensions, color, type) {
        if (color === void 0) { color = 'black'; }
        this.canvas.save();
        this.canvas.drawRectangle(position, dimensions, color);
        this.canvas.restore();
    };
    Renderer.prototype.clearScreen = function () {
        this.canvas.clearScreen();
    };
    return Renderer;
}());
export { Renderer };
//# sourceMappingURL=render.js.map
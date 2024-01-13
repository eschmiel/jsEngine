import Canvas from "./canvas.js";
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.renderFillTriangle = function (trianglePoints, color) {
        if (color === void 0) { color = 'black'; }
        if ((trianglePoints === null || trianglePoints === void 0 ? void 0 : trianglePoints.length) !== 3)
            throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors');
        Canvas.save();
        Canvas.fillTriangle(trianglePoints, color);
        Canvas.restore();
    };
    Renderer.prototype.renderStrokeTriangle = function (trianglePoints, color) {
        if (color === void 0) { color = 'black'; }
        if ((trianglePoints === null || trianglePoints === void 0 ? void 0 : trianglePoints.length) !== 3)
            throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors');
        Canvas.save();
        Canvas.strokeTriangle(trianglePoints, color);
        Canvas.restore();
    };
    Renderer.prototype.renderFillCircle = function (position, radius, color) {
        if (color === void 0) { color = 'black'; }
        Canvas.save();
        Canvas.fillCircle(position, radius, color);
        Canvas.restore();
    };
    Renderer.prototype.renderRectangle = function (position, dimensions, color, type) {
        if (color === void 0) { color = 'black'; }
        Canvas.save();
        Canvas.drawRectangle(position, dimensions, color);
        Canvas.restore();
    };
    Renderer.prototype.renderLine = function (origin, end, color) {
        if (color === void 0) { color = 'black'; }
        Canvas.save();
        Canvas.drawLine(origin, end, color);
        Canvas.restore();
    };
    Renderer.prototype.clearScreen = function () {
        Canvas.clearScreen();
    };
    return Renderer;
}());
export { Renderer };
//# sourceMappingURL=render.js.map
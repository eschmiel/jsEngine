import { degreesToRadians } from '../../utilities/util.js';
var Canvas = /** @class */ (function () {
    function Canvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.context = this.canvas.getContext("2d");
        this.width = 1000;
        this.height = 600;
        this.canvas.setAttribute("width", this.width.toString());
        this.canvas.setAttribute("height", this.height.toString());
    }
    Canvas.prototype.rotate = function (degrees, centerPosition) {
        // context.rotate uses radans as the unit of measurement for its rotation.
        // This statement converts degrees into radans.
        var radians = degreesToRadians(degrees);
        var _a = centerPosition.values, x = _a[0], y = _a[1];
        this.context.translate(x, y);
        this.context.rotate(radians);
        this.context.translate(-x, -y);
    };
    Canvas.prototype.fillTriangle = function (points, color) {
        if (color === void 0) { color = 'black'; }
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(points[0].values[0], points[0].values[1]);
        this.context.lineTo(points[1].values[0], points[1].values[1]);
        this.context.lineTo(points[2].values[0], points[2].values[1]);
        this.context.fill();
    };
    Canvas.prototype.strokeTriangle = function (points, color) {
        if (color === void 0) { color = 'black'; }
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(points[0].values[0], points[0].values[1]);
        this.context.lineTo(points[1].values[0], points[1].values[1]);
        this.context.lineTo(points[2].values[0], points[2].values[1]);
        this.context.closePath();
        this.context.stroke();
    };
    Canvas.prototype.drawRectangle = function (position, dimensions, color) {
        if (color === void 0) { color = 'black'; }
        var _a = position.values, x = _a[0], y = _a[1];
        var _b = dimensions.values, width = _b[0], height = _b[1];
        this.context.strokeStyle = color;
        this.context.strokeRect(x, y, width, height);
    };
    Canvas.prototype.strokeCircle = function (position, radius, color) {
        if (color === void 0) { color = 'black'; }
        var _a = position.values, x = _a[0], y = _a[1];
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.stroke();
    };
    Canvas.prototype.fillCircle = function (position, radius, color) {
        if (color === void 0) { color = 'black'; }
        var _a = position.values, x = _a[0], y = _a[1];
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.fill();
    };
    Canvas.prototype.save = function () {
        this.context.save();
    };
    Canvas.prototype.restore = function () {
        this.context.restore();
    };
    Canvas.prototype.clearScreen = function () {
        this.context.globalCompositeOperation = "destination-over";
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Canvas;
}());
export default Canvas;
//# sourceMappingURL=canvas.js.map
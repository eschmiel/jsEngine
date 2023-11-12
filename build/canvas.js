import { degreesToRadians } from './util.js';
var Canvas = /** @class */ (function () {
    function Canvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.context = this.canvas.getContext("2d");
    }
    Canvas.prototype.rotate = function (degrees, centerX, centerY) {
        if (centerX === void 0) { centerX = 0; }
        if (centerY === void 0) { centerY = 0; }
        // context.rotate uses radans as the unit of measurement for its rotation.
        // This statement converts degrees into radans.
        var radians = degreesToRadians(degrees);
        this.context.translate(centerX, centerY);
        this.context.rotate(radians);
        this.context.translate(-centerX, -centerY);
    };
    Canvas.prototype.drawTriangle = function (points) {
        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);
        this.context.lineTo(points[1].x, points[1].y);
        this.context.lineTo(points[2].x, points[2].y);
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
        this.context.clearRect(0, 0, 300, 300);
    };
    return Canvas;
}());
export default new Canvas();
//# sourceMappingURL=canvas.js.map
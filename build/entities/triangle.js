import canvas from '../canvas.js';
import Point from '../point.js';
// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/
var Triangle = /** @class */ (function () {
    function Triangle(x, y) {
        var _this = this;
        this.getCenterX = function () { return _this.x + _this.width / 2; };
        this.getCenterY = function () { return _this.y + _this.height / 2; };
        this.x = x;
        this.y = y;
        this.height = 25;
        this.width = 50;
        this.rotation = 0;
    }
    Triangle.prototype.createTrianglePoints = function () {
        var trianglePoints = [];
        trianglePoints.push(new Point(this.x, this.y));
        trianglePoints.push(new Point(this.getCenterX(), this.y + this.height));
        trianglePoints.push(new Point(this.x + this.width, this.y));
        return trianglePoints;
    };
    Triangle.prototype.draw = function () {
        canvas.save();
        canvas.rotate(this.rotation, this.getCenterX(), this.getCenterY());
        canvas.drawTriangle(this.createTrianglePoints());
        canvas.restore();
    };
    Triangle.prototype.control = function (keyName) {
        if (keyName === 'ArrowDown')
            this.y += 5;
        if (keyName === 'ArrowUp')
            this.y -= 5;
        if (keyName === 'ArrowLeft')
            this.rotation -= 5;
        if (keyName === 'ArrowRight')
            this.rotation += 5;
    };
    return Triangle;
}());
export { Triangle };
//# sourceMappingURL=triangle.js.map
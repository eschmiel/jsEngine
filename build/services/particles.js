var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Lerp } from "../util.js";
import canvas from "./canvas.js";
import { Vector, createDirection } from "./vector.js";
var TriangleExplosion = /** @class */ (function () {
    function TriangleExplosion(position, particleSize, particleNumber) {
        if (particleNumber === void 0) { particleNumber = 1; }
        this.particles = [];
        var particleDegreeGap = 360 / particleNumber;
        for (var i = 1; i <= particleNumber; i++) {
            var particleDirection = createDirection(particleDegreeGap * i);
            var particlePosition = position.addVector(particleDirection.multiplyByScalar(5));
            this.particles.push(new TriangleParticle(particlePosition, particleSize.copy(), particleDirection));
        }
    }
    TriangleExplosion.prototype.update = function () { this.particles.forEach(function (particle) { return particle.update(); }); };
    TriangleExplosion.prototype.draw = function () { this.particles.forEach(function (particle) { return particle.draw(); }); };
    return TriangleExplosion;
}());
export { TriangleExplosion };
var TriangleParticle = /** @class */ (function () {
    function TriangleParticle(position, dimensions, direction) {
        var _this = this;
        this.getCenterX = function () {
            var x = _this.position.values[0];
            var width = _this.dimensions.values[0];
            return x + width / 2;
        };
        this.getCenterY = function () {
            var y = _this.position.values[1];
            var height = _this.dimensions.values[1];
            return y + height / 2;
        };
        this.position = position.copy();
        this.dimensions = dimensions.copy();
        this.direction = direction.copy();
        this.particleColor = 'black';
        this.rotation = 0;
        this.speed = 10;
        this.timer = 0;
        this.maxTimer = 45;
        this.accelerationLerp = new Lerp(this.speed, 0, .01);
    }
    TriangleParticle.prototype.createTrianglePoints = function () {
        var _a = this.position.values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        return [
            new (Vector.bind.apply(Vector, __spreadArray([void 0], this.position.values, false)))(),
            new Vector(x + width, this.getCenterY()),
            new Vector(x, y + height)
        ];
    };
    TriangleParticle.prototype.update = function () {
        this.rotation += 25;
        if (this.rotation > 360)
            this.rotation -= 360;
        this.speed = this.accelerationLerp.run();
        var distanceInDirection = this.direction.multiplyByScalar(this.speed);
        this.position = this.position.addVector(distanceInDirection);
        if (this.timer <= this.maxTimer)
            this.timer += 1;
    };
    TriangleParticle.prototype.draw = function () {
        canvas.save();
        canvas.context.globalAlpha = 0;
        if (this.maxTimer > this.timer)
            canvas.context.globalAlpha = 1 - this.timer / this.maxTimer;
        var trianglePoints = this.createTrianglePoints();
        canvas.rotate(this.rotation, this.getCenterX(), this.getCenterY());
        canvas.strokeTriangle(trianglePoints, this.particleColor);
        canvas.restore();
    };
    return TriangleParticle;
}());
//# sourceMappingURL=particles.js.map
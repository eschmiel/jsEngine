import { Lerp, getCenterPosition } from "../util.js";
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
        this.position = position.copy();
        this.dimensions = dimensions.copy();
        this.direction = direction.copy();
        this.particleColor = 'black';
        this.rotation = 0;
        this.rotationSpeed = 25;
        this.speed = 10;
        this.timer = 0;
        this.maxTimer = 45;
        this.accelerationLerp = new Lerp(this.speed, 0, .01);
    }
    TriangleParticle.prototype.createTrianglePoints = function () {
        var _a = this.position.values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        var _c = getCenterPosition(this.position, this.dimensions).values, centerX = _c[0], centerY = _c[1];
        return [
            this.position.copy(),
            new Vector(x + width, centerY),
            new Vector(x, y + height)
        ];
    };
    TriangleParticle.prototype.update = function () {
        if (this.timer < this.maxTimer) {
            this.rotation += this.rotationSpeed;
            if (this.rotation > 360)
                this.rotation -= 360;
            this.speed = this.accelerationLerp.run();
            var distanceInDirection = this.direction.multiplyByScalar(this.speed);
            this.position = this.position.addVector(distanceInDirection);
            if (this.timer <= this.maxTimer)
                this.timer += 1;
        }
    };
    TriangleParticle.prototype.draw = function () {
        if (this.timer < this.maxTimer) {
            var _a = getCenterPosition(this.position, this.dimensions).values, centerX = _a[0], centerY = _a[1];
            canvas.save();
            canvas.context.globalAlpha = 0;
            if (this.maxTimer > this.timer)
                canvas.context.globalAlpha = 1 - this.timer / this.maxTimer;
            var trianglePoints = this.createTrianglePoints();
            canvas.rotate(this.rotation, centerX, centerY);
            canvas.strokeTriangle(trianglePoints, this.particleColor);
            canvas.restore();
        }
    };
    return TriangleParticle;
}());
//# sourceMappingURL=particles.js.map
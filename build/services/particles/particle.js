import { EntityBody } from "../../entities/entityBody.js";
import { Accelerator } from "../lerpers/accelerator.js";
import { Fader } from "../lerpers/fader.js";
import { rotatePoint } from "../math/transformations.js";
import { Vector } from "../math/vector.js";
import { Renderer } from "../rendering/render.js";
var Particle = /** @class */ (function () {
    function Particle(options) {
        this.renderer = new Renderer();
        var _a = options.body, body = _a === void 0 ? defaultParticleOptions.body : _a, _b = options.color, color = _b === void 0 ? defaultParticleOptions.color : _b, _c = options.maxTime, maxTime = _c === void 0 ? defaultParticleOptions.maxTime : _c, faderSettings = options.faderSettings, acceleratorSettings = options.acceleratorSettings;
        var startingAlpha = faderSettings.startingAlpha, targetAlpha = faderSettings.targetAlpha, fadeRate = faderSettings.fadeRate;
        var startingSpeed = acceleratorSettings.startingSpeed, maxSpeed = acceleratorSettings.maxSpeed, accelerationRate = acceleratorSettings.accelerationRate, direction = acceleratorSettings.direction;
        this.body = isEntityBody(body) ? body.copy() : new EntityBody(body);
        this.accelerator = new Accelerator(startingSpeed, maxSpeed, accelerationRate, direction);
        this.color = color;
        this.timer = 0;
        this.maxTime = maxTime;
        this.fader = new Fader(startingAlpha, targetAlpha, fadeRate);
        this.transparency = this.fader.getStartingAlpha();
    }
    Particle.prototype.run = function () {
        this.body.speed = this.accelerator.run();
        this.body.update();
        this.transparency = this.fader.run();
        this.timer++;
        var trianglePoints = this.getTrianglePoints();
        this.renderer.renderStrokeTriangle(trianglePoints, "rgb(0 0 0 / ".concat(this.transparency, ")"));
    };
    Particle.prototype.getTrianglePoints = function () {
        var _a = this.body.getDimensions(), width = _a[0], height = _a[1];
        var _b = this.body, rotation = _b.rotation, position = _b.position;
        var pointsFromPointOfRotation = [
            new Vector(-width / 2, height / 2),
            new Vector(width / 2, 0),
            new Vector(-width / 2, -height / 2)
        ];
        var rotatedPoints = pointsFromPointOfRotation.map(function (point) { return rotatePoint(point, rotation); });
        var pointsOffsetFromShipPosition = rotatedPoints.map(function (point) { return point.addVector(position); });
        return pointsOffsetFromShipPosition;
    };
    Particle.prototype.outOfTime = function () {
        return this.timer >= this.maxTime;
    };
    return Particle;
}());
export { Particle };
var defaultParticleOptions = {
    body: new EntityBody(),
    color: 'black',
    maxTime: 5
};
function isEntityBody(input) {
    return input.update !== undefined;
}
//# sourceMappingURL=particle.js.map
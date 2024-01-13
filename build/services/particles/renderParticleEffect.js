import { Renderer } from "../rendering/render.js";
import { rotatePoint } from "../math/transformations.js";
import { Vector } from "../math/vector.js";
export function renderParticleEffect(particleEffect) {
    var renderer = new Renderer();
    particleEffect.particles.forEach(function (particle) {
        var trianglePoints = getTrianglePoints(particle);
        renderer.renderStrokeTriangle(trianglePoints, "rgb(0 0 0 / ".concat(particle.transparency, ")"));
    });
}
function getTrianglePoints(particle) {
    var _a = particle.body.getDimensions(), width = _a[0], height = _a[1];
    var _b = particle.body, rotation = _b.rotation, position = _b.position;
    var pointsFromPointOfRotation = [
        new Vector(-width / 2, height / 2),
        new Vector(width / 2, 0),
        new Vector(-width / 2, -height / 2)
    ];
    var rotatedPoints = pointsFromPointOfRotation.map(function (point) { return rotatePoint(point, rotation); });
    var pointsOffsetFromShipPosition = rotatedPoints.map(function (point) { return point.addVector(position); });
    return pointsOffsetFromShipPosition;
}
//# sourceMappingURL=renderParticleEffect.js.map
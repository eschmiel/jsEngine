import { rotatePoint } from "../../services/math/transformations.js";
import { Vector } from "../../services/math/vector.js";
export function renderShip(renderingSystem, ship) {
    if (ship.alive) {
        var trianglePoints = getTrianglePoints(ship);
        renderingSystem.renderFillTriangle(trianglePoints, 'black');
    }
}
function getTrianglePoints(ship) {
    var _a = ship.body.getDimensions(), width = _a[0], height = _a[1];
    var _b = ship.body, rotation = _b.rotation, position = _b.position;
    var pointsFromPointOfRotation = [
        new Vector(-width / 2, height / 2),
        new Vector(width / 2, 0),
        new Vector(-width / 2, -height / 2)
    ];
    var rotatedPoints = pointsFromPointOfRotation.map(function (point) { return rotatePoint(point, rotation); });
    var pointsOffsetFromShipPosition = rotatedPoints.map(function (point) { return point.addVector(position); });
    return pointsOffsetFromShipPosition;
}
//# sourceMappingURL=renderShip.js.map
import { rotatePoint } from "../../services/math/transformations.js";
import { Vector } from "../../services/math/vector.js";
var ShipRenderer = /** @class */ (function () {
    function ShipRenderer(renderer, ship) {
        this.renderer = renderer;
        this.ship = ship;
    }
    ShipRenderer.prototype.run = function () {
        if (this.ship.alive) {
            var trianglePoints = this.getTrianglePoints();
            this.renderer.renderFillTriangle(trianglePoints);
        }
    };
    ShipRenderer.prototype.getTrianglePoints = function () {
        var _a = this.ship.body.getDimensions(), width = _a[0], height = _a[1];
        var _b = this.ship.body, rotation = _b.rotation, position = _b.position;
        var pointsFromPointOfRotation = [
            new Vector(-width / 2, height / 2),
            new Vector(width / 2, 0),
            new Vector(-width / 2, -height / 2)
        ];
        var rotatedPoints = pointsFromPointOfRotation.map(function (point) { return rotatePoint(point, rotation); });
        var pointsOffsetFromShipPosition = rotatedPoints.map(function (point) { return point.addVector(position); });
        return pointsOffsetFromShipPosition;
    };
    return ShipRenderer;
}());
export { ShipRenderer };
//# sourceMappingURL=shipRenderer.js.map
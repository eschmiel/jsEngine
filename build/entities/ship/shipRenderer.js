import { rotatePoint } from "../../services/math/transformations.js";
import { Vector } from "../../services/math/vector.js";
import { ShipEvents } from "./ship.js";
import { Timer, TimerEvents } from "../../services/timer.js";
var ShipRenderer = /** @class */ (function () {
    function ShipRenderer(renderer, ship) {
        this.renderer = renderer;
        this.visible = true;
        this.ship = ship;
        this.ship.addObserver(this);
        this.flashTimer = new Timer(7, TimerEvents.Done);
        this.flashTimer.addObserver(this);
        if (this.ship.respawning)
            this.flashTimer.activate();
    }
    ShipRenderer.prototype.onNotify = function (eventType) {
        switch (eventType) {
            case TimerEvents.Done:
                this.visible = !this.visible;
                this.flashTimer.activate();
                break;
            case ShipEvents.doneSpawning:
                this.visible = true;
                this.flashTimer.deactivate();
                break;
            default:
        }
    };
    ShipRenderer.prototype.run = function () {
        this.flashTimer.update();
        if (this.ship.alive && this.visible) {
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
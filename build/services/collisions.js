import { NullEntity } from "../entities/entityManager.js";
import { Vector } from "./vector.js";
import canvas from "./canvas.js";
var CollisionBox = /** @class */ (function () {
    function CollisionBox(offsetPosition, dimensions, entity) {
        if (entity === void 0) { entity = new NullEntity(); }
        this.offsetPosition = structuredClone(offsetPosition);
        this.dimensions = structuredClone(dimensions);
        this.entity = entity;
    }
    CollisionBox.prototype.getPosition = function () {
        var _a = this.offsetPosition.values, offsetX = _a[0], offsetY = _a[1];
        var _b = this.entity.position.values, entityX = _b[0], entityY = _b[1];
        return new Vector(entityX + offsetX, entityY + offsetY);
    };
    CollisionBox.prototype.getCenterPosition = function () {
        var _a = this.getPosition().values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        var centerX = x + width / 2;
        var centerY = y + height / 2;
        return new Vector(centerX, centerY);
    };
    CollisionBox.prototype.update = function () {
        this.onCollision(this.entity);
    };
    CollisionBox.prototype.draw = function () {
        canvas.save();
        canvas.rotate2(this.entity.rotation, this.getCenterPosition());
        canvas.drawRectangle(this.getPosition(), this.dimensions, 'red');
        canvas.restore();
    };
    CollisionBox.prototype.onCollision = function (entity) { };
    return CollisionBox;
}());
export { CollisionBox };
export var colliding = function (box1, box2) {
    var _a = box1.getPosition().values, startX1 = _a[0], startY1 = _a[1];
    var _b = box1.dimensions.values, box1Width = _b[0], box1Height = _b[1];
    var endX1 = startX1 + box1Width;
    var endY1 = startY1 + box1Height;
    var _c = box2.getPosition().values, startX2 = _c[0], startY2 = _c[1];
    var _d = box2.dimensions.values, box2Width = _d[0], box2Height = _d[1];
    var endX2 = startX2 + box2Width;
    var endY2 = startY2 + box2Height;
    return (startX1 < endX2
        && endX1 > startX2
        && startY1 < endY2
        && endY1 > startY2);
};
//# sourceMappingURL=collisions.js.map
import { Vector } from "../math/vector.js";
import { EntityBody } from "../../entities/entityBody.js";
var CollisionBox = /** @class */ (function () {
    function CollisionBox(offsetPosition, dimensions, entity) {
        if (entity === void 0) { entity = new EntityBody(); }
        this.offsetPosition = offsetPosition.copy();
        this.dimensions = dimensions.copy();
        this.entity = entity;
    }
    CollisionBox.prototype.getPosition = function () {
        var _a = this.offsetPosition.values, offsetX = _a[0], offsetY = _a[1];
        var _b = this.entity.getPosition(), entityX = _b[0], entityY = _b[1];
        return new Vector(entityX + offsetX, entityY + offsetY);
    };
    CollisionBox.prototype.getCenterPosition = function () {
        var _a = this.getPosition().values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        var centerX = x + width / 2;
        var centerY = y + height / 2;
        return new Vector(centerX, centerY);
    };
    CollisionBox.prototype.onCollision = function (entity) { };
    return CollisionBox;
}());
export { CollisionBox };
//# sourceMappingURL=collisionBox.js.map
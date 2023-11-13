var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Vector, createDirection } from '../services/vector.js';
var EntityBody = /** @class */ (function () {
    function EntityBody(position, dimensions) {
        if (position === void 0) { position = new Vector(0, 0); }
        if (dimensions === void 0) { dimensions = new Vector(0, 0); }
        this.position = position.copy();
        this.dimensions = dimensions.copy();
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.speed = 0;
    }
    EntityBody.prototype.getPosition = function () { return this.position.values.map(function (value) { return value; }); };
    EntityBody.prototype.getDimensions = function () { return this.dimensions.values.map(function (value) { return value; }); };
    EntityBody.prototype.getCenterPosition = function () {
        var _a = this.position.values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        var centerX = x + width / 2;
        var centerY = y + height / 2;
        return [centerX, centerY];
    };
    EntityBody.prototype.getCenterPositionVector = function () {
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], this.getCenterPosition(), false)))();
    };
    EntityBody.prototype.getEndPosition = function () {
        var _a = this.position.values, x = _a[0], y = _a[1];
        var _b = this.dimensions.values, width = _b[0], height = _b[1];
        var endX = x + width;
        var endY = y + height;
        return [endX, endY];
    };
    EntityBody.prototype.getEndPositionVector = function () {
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], this.getEndPosition(), false)))();
    };
    EntityBody.prototype.adjustRotation = function (change) {
        this.rotation += change;
        if (this.rotation > 0)
            this.rotation += 360;
        if (this.rotation > 360)
            this.rotation -= 360;
    };
    EntityBody.prototype.move = function () {
        var direction = createDirection(this.rotation);
        var distanceInDirection = direction.multiplyByScalar(this.speed);
        this.position = this.position.addVector(distanceInDirection);
    };
    EntityBody.prototype.rotate = function () {
        this.rotation += this.rotationSpeed;
    };
    EntityBody.prototype.update = function () {
        this.rotate();
        this.move();
    };
    return EntityBody;
}());
export { EntityBody };
//# sourceMappingURL=entityBody.js.map
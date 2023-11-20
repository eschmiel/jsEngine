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
    function EntityBody(options) {
        if (options === void 0) { options = defaultEntityBodyOptions; }
        var _a, _b;
        var position = options.position, dimensions = options.dimensions, rotation = options.rotation, rotationSpeed = options.rotationSpeed, speed = options.speed;
        this.position = (_a = position === null || position === void 0 ? void 0 : position.copy()) !== null && _a !== void 0 ? _a : defaultEntityBodyOptions.position.copy();
        this.dimensions = (_b = dimensions === null || dimensions === void 0 ? void 0 : dimensions.copy()) !== null && _b !== void 0 ? _b : defaultEntityBodyOptions.dimensions.copy();
        this.rotation = rotation !== null && rotation !== void 0 ? rotation : defaultEntityBodyOptions.rotation;
        this.rotationSpeed = rotationSpeed !== null && rotationSpeed !== void 0 ? rotationSpeed : defaultEntityBodyOptions.rotationSpeed;
        this.speed = speed !== null && speed !== void 0 ? speed : defaultEntityBodyOptions.speed;
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
    EntityBody.prototype.moveOld = function () {
        var direction = createDirection(this.rotation);
        var distanceInDirection = direction.multiplyByScalar(this.speed);
        this.position = this.position.addVector(distanceInDirection);
    };
    EntityBody.prototype.rotate = function () {
        this.rotation += this.rotationSpeed;
    };
    EntityBody.prototype.move = function (velocity) {
        this.position = this.position.addVector(velocity);
    };
    EntityBody.prototype.update = function () {
        this.rotate();
        this.moveOld();
    };
    EntityBody.prototype.copy = function () {
        var copyBodyOptions = {
            position: this.position.copy(),
            dimensions: this.dimensions.copy(),
            rotation: this.rotation,
            rotationSpeed: this.rotationSpeed,
            speed: this.speed
        };
        return new EntityBody(copyBodyOptions);
    };
    return EntityBody;
}());
export { EntityBody };
var defaultEntityBodyOptions = {
    position: new Vector(0, 0),
    dimensions: new Vector(10, 10),
    rotation: 0,
    rotationSpeed: 0,
    speed: 0
};
//# sourceMappingURL=entityBody.js.map
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { degreesToRadians } from '../../util.js';
var Vector = /** @class */ (function () {
    function Vector() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values = structuredClone(values);
    }
    Vector.prototype.addVector = function (vector) {
        var newValues = this.values.map(function (value, index) { return value + vector.values[index]; });
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], newValues, false)))();
    };
    Vector.prototype.subtractVector = function (vector) {
        var newValues = this.values.map(function (value, index) { return value - vector.values[index]; });
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], newValues, false)))();
    };
    Vector.prototype.multiplyByScalar = function (scalar) {
        var newValues = this.values.map(function (value) { return value * scalar; });
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], newValues, false)))();
    };
    Vector.prototype.getDotProduct = function (vector) {
        if (vector.values.length !== this.values.length)
            throw new Error("vector.getDotProduct(vector) failed. The parameter vector must have the same number of values as the vector it's trying to get the dot product with");
        var dotProduct = 0;
        this.values.forEach(function (value, index) { return dotProduct += value * vector.values[index]; });
        return dotProduct;
    };
    Vector.prototype.copy = function () {
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], this.values, false)))();
    };
    return Vector;
}());
export { Vector };
export var createDirection = function (degrees) {
    if (degrees === void 0) { degrees = 0; }
    var radians = degreesToRadians(degrees);
    return new Vector(Math.cos(radians), Math.sin(radians));
};
export var createVelocity = function (degrees, speed) {
    if (degrees === void 0) { degrees = 0; }
    if (speed === void 0) { speed = 0; }
    var direction = createDirection(degrees);
    return direction.multiplyByScalar(speed);
};
//# sourceMappingURL=vector.js.map
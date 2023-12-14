var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { degreesToRadians } from "../../utilities/util.js";
import { Vector } from "./vector.js";
var Matrix = /** @class */ (function () {
    function Matrix(initialValues) {
        this.values = [];
        if (isVector(initialValues)) {
            this.values.push(__spreadArray([], initialValues.values, true));
        }
        else if (isMultiDimenisonalArray(initialValues)) {
            this.values = initialValues.map(function (row) { return __spreadArray([], row, true); });
        }
        else {
            this.values.push(__spreadArray([], initialValues, true));
        }
    }
    Matrix.prototype.multiplyByMatrix = function (otherMatrix) {
        var newMatrixValues = this.values.map(function (row) {
            var newRow = [];
            var otherMatrixColumnNumber = otherMatrix.values[0].length;
            var rowVector = new (Vector.bind.apply(Vector, __spreadArray([void 0], row, false)))();
            var _loop_1 = function (column) {
                var columnVectorValues = otherMatrix.values.map(function (otherMatrixRow) { return otherMatrixRow[column]; });
                var columnVector = new (Vector.bind.apply(Vector, __spreadArray([void 0], columnVectorValues, false)))();
                newRow.push(rowVector.getDotProduct(columnVector));
            };
            for (var column = 0; column < otherMatrixColumnNumber; column++) {
                _loop_1(column);
            }
            return newRow;
        });
        return new Matrix(newMatrixValues);
    };
    return Matrix;
}());
export { Matrix };
export function createRotationMatrix(degrees) {
    var radians = degreesToRadians(degrees);
    return new Matrix([
        [Math.cos(radians), Math.sin(radians)],
        [-Math.sin(radians), Math.cos(radians)]
    ]);
}
function isVector(input) {
    return input.addVector !== undefined;
}
function isMultiDimenisonalArray(input) {
    return Array.isArray(input[0]);
}
//# sourceMappingURL=matrix.js.map
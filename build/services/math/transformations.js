var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Matrix, createRotationMatrix } from "./matrix.js";
import { Vector } from "./vector.js";
export function rotatePoint(point, degrees) {
    var vectorMatrix = new Matrix(point);
    var rotationMatrix = createRotationMatrix(degrees);
    var rotatedVectorMatrix = vectorMatrix.multiplyByMatrix(rotationMatrix);
    return new (Vector.bind.apply(Vector, __spreadArray([void 0], rotatedVectorMatrix.values[0], false)))();
}
//# sourceMappingURL=transformations.js.map
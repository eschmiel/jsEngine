import canvas from "../services/canvas.js";
import { Vector } from "../services/vector.js";
export var EntityBodyTriangleDrawTypes;
(function (EntityBodyTriangleDrawTypes) {
    EntityBodyTriangleDrawTypes["Stroke"] = "stroke";
    EntityBodyTriangleDrawTypes["Fill"] = "fill";
})(EntityBodyTriangleDrawTypes || (EntityBodyTriangleDrawTypes = {}));
export var createTrianglePointsForEntityBody = function (body) {
    var _a = body.getPosition(), x = _a[0], y = _a[1];
    var _b = body.getCenterPosition(), centerX = _b[0], centerY = _b[1];
    var _c = body.getEndPosition(), endX = _c[0], endY = _c[1];
    return [
        body.position.copy(),
        new Vector(endX, centerY),
        new Vector(x, endY)
    ];
};
export var drawEntityBodyTriangle = function (body, drawType, color) {
    if (drawType === void 0) { drawType = EntityBodyTriangleDrawTypes.Fill; }
    if (color === void 0) { color = 'black'; }
    var _a = body.getCenterPosition(), centerX = _a[0], centerY = _a[1];
    var trianglePoints = createTrianglePointsForEntityBody(body);
    canvas.save();
    canvas.rotate(body.rotation, centerX, centerY);
    switch (drawType) {
        case EntityBodyTriangleDrawTypes.Fill:
            canvas.fillTriangle(trianglePoints, color);
            break;
        case EntityBodyTriangleDrawTypes.Stroke:
            canvas.strokeTriangle(trianglePoints, color);
            break;
        default:
            throw new Error("drawEntityBodyTriangle called with unsupported drawType parameter: ".concat(drawType));
    }
    canvas.restore();
};
//# sourceMappingURL=drawEntityBody.js.map
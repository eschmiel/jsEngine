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
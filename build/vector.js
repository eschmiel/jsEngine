import { degreesToRadians } from './util.js';
export var createPoint = function (x, y) {
    return { x: x, y: y };
};
export var createDirection = function (degrees) {
    var radians = degreesToRadians(degrees);
    return {
        x: Math.cos(radians),
        y: Math.sin(radians)
    };
};
//# sourceMappingURL=vector.js.map
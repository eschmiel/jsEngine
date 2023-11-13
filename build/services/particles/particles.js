import { Manager } from "../../utilities.ts/manager";
import { Vector } from "../vector";
var ParticleManager = /** @class */ (function () {
    function ParticleManager() {
        this.manager = new Manager();
    }
    ParticleManager.prototype.createCircleExplosion = function (position, options) {
        if (options === void 0) { options = defaultCircleExplosionOptions; }
    };
    return ParticleManager;
}());
export { ParticleManager };
///// Types and defaults
export var ParticleTypes;
(function (ParticleTypes) {
    ParticleTypes["Triangle"] = "triangle";
})(ParticleTypes || (ParticleTypes = {}));
var defaultCircleExplosionOptions = {
    type: ParticleTypes.Triangle,
    particleSize: new Vector(1, 1),
    particleNumber: 5,
    startDistanceFromOrigin: 1
};
//# sourceMappingURL=particles.js.map
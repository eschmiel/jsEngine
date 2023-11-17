import { Manager } from "../../utilities/manager.js";
import { Vector, createDirection } from "../vector.js";
import { Particle } from "./particle.js";
var ParticleEffectManager = /** @class */ (function () {
    function ParticleEffectManager() {
        this.manager = new Manager();
    }
    // Pull this out into its own function
    ParticleEffectManager.prototype.createCircleExplosion = function (position, options) {
        if (options === void 0) { options = defaultCircleExplosionOptions; }
        var type = options.type, particleSize = options.particleSize, particleNumber = options.particleNumber, startDistanceFromOrigin = options.startDistanceFromOrigin;
        var particleEffect = new Manager();
        var particleDegreeGap = 360 / particleNumber;
        for (var i = 1; i <= particleNumber; i++) {
            var particleDirection = createDirection(particleDegreeGap * i);
            var particleBodyOptions = {
                position: position.addVector(particleDirection.multiplyByScalar(startDistanceFromOrigin)),
                dimensions: particleSize.copy(),
                rotation: particleDegreeGap,
                rotationSpeed: 25,
                speed: 10
            };
            var faderSettings = {
                startingAlpha: 1,
                targetAlpha: 0,
                fadeRate: 1 / 45
            };
            var acceleratorSettings = {
                startingSpeed: 10,
                accelerationRate: .01
            };
            var particleOptions = {
                body: particleBodyOptions,
                faderSettings: faderSettings,
                acceleratorSettings: acceleratorSettings,
                maxTime: 45
            };
            particleEffect.push(new Particle(particleOptions));
        }
        this.manager.push(particleEffect);
    };
    return ParticleEffectManager;
}());
export { ParticleEffectManager };
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
import { Vector, createDirection } from "../../math/vector.js";
import { Particle } from "../particle.js";
import { getCircleExplosionParticleConfig } from '../configs/circleExplosionParticleConfig.js';
import { ParticleEffect } from "../particleEffect.js";
export var createCircleExplosionEffect = function (position, options) {
    if (options === void 0) { options = defaultCircleExplosionOptions; }
    var particleNumber = options.particleNumber;
    var particleDegreeGap = 360 / particleNumber;
    var particleEffect = new ParticleEffect();
    for (var i = 1; i <= particleNumber; i++) {
        var projectedAngle = particleDegreeGap * i;
        var particle = createCircleExplosionParticle(position, projectedAngle, options);
        particleEffect.add(particle);
    }
    return particleEffect;
};
function createCircleExplosionParticle(position, projectedAngle, circleExplosionOptions) {
    if (position === void 0) { position = new Vector(0, 0); }
    if (projectedAngle === void 0) { projectedAngle = 0; }
    if (circleExplosionOptions === void 0) { circleExplosionOptions = defaultCircleExplosionOptions; }
    var _a = circleExplosionOptions.particleSize, particleSize = _a === void 0 ? defaultCircleExplosionOptions.particleSize : _a, _b = circleExplosionOptions.startDistanceFromOrigin, startDistanceFromOrigin = _b === void 0 ? defaultCircleExplosionOptions.startDistanceFromOrigin : _b;
    var particleOptions = getCircleExplosionParticleConfig();
    var direction = createDirection(projectedAngle);
    particleOptions.body.position = position.addVector(direction.multiplyByScalar(startDistanceFromOrigin));
    particleOptions.body.dimensions = particleSize.copy();
    particleOptions.body.rotation = projectedAngle;
    return new Particle(particleOptions);
}
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
//# sourceMappingURL=circleExplosion.js.map
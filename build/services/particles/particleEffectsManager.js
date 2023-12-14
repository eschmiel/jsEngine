import { createCircleExplosionEffect } from "./effects/circleExplosion.js";
var ParticleEffectsManager = /** @class */ (function () {
    function ParticleEffectsManager() {
        this.particleEffects = [];
    }
    ParticleEffectsManager.prototype.run = function () {
        var _this = this;
        this.particleEffects.forEach(function (particleEffect) {
            particleEffect.run();
            if (!particleEffect.particleCount())
                _this.remove(particleEffect);
        });
    };
    ParticleEffectsManager.prototype.add = function (particleEffect) { this.particleEffects.push(particleEffect); };
    ParticleEffectsManager.prototype.remove = function (particleEffectToRemove) {
        this.particleEffects = this.particleEffects.filter(function (particleEffect) { return particleEffect !== particleEffectToRemove; });
    };
    ParticleEffectsManager.prototype.createCircleExplosionEffect = function (position, options) {
        var particleEffect = createCircleExplosionEffect(position, options);
        this.add(particleEffect);
    };
    ParticleEffectsManager.prototype.onNotify = function (event, data) {
        switch (event) {
            case ParticleEffectsManagerEvents.CircleExplosion:
                if (isParticleEffectsManagerEventData(data))
                    this.createCircleExplosionEffect(data.position, data.options);
                break;
            default:
        }
    };
    return ParticleEffectsManager;
}());
export { ParticleEffectsManager };
export var ParticleEffectsManagerEvents;
(function (ParticleEffectsManagerEvents) {
    ParticleEffectsManagerEvents[ParticleEffectsManagerEvents["CircleExplosion"] = 0] = "CircleExplosion";
})(ParticleEffectsManagerEvents || (ParticleEffectsManagerEvents = {}));
function isParticleEffectsManagerEventData(input) {
    return input.position !== undefined;
}
//# sourceMappingURL=particleEffectsManager.js.map
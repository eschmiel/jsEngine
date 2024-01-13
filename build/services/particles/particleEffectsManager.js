import { createCircleExplosionEffect } from "./effects/circleExplosion.js";
import { renderParticleEffect } from "./renderParticleEffect.js";
var ParticleEffectsManager = /** @class */ (function () {
    function ParticleEffectsManager() {
        this.particleEffects = [];
    }
    ParticleEffectsManager.prototype.update = function () {
        var _this = this;
        this.particleEffects.forEach(function (particleEffect) {
            particleEffect.run();
            if (!particleEffect.particleCount())
                _this.remove(particleEffect);
        });
    };
    ParticleEffectsManager.prototype.render = function () {
        this.particleEffects.forEach(renderParticleEffect);
    };
    ParticleEffectsManager.prototype.add = function (particleEffect) { this.particleEffects.push(particleEffect); };
    ParticleEffectsManager.prototype.remove = function (particleEffectToRemove) {
        this.particleEffects = this.particleEffects.filter(function (particleEffect) { return particleEffect !== particleEffectToRemove; });
    };
    ParticleEffectsManager.prototype.createCircleExplosionEffect = function (position, options) {
        var particleEffect = createCircleExplosionEffect(position, options);
        this.add(particleEffect);
    };
    return ParticleEffectsManager;
}());
export { ParticleEffectsManager };
//# sourceMappingURL=particleEffectsManager.js.map
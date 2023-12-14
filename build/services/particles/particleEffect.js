var ParticleEffect = /** @class */ (function () {
    function ParticleEffect() {
        this.particles = [];
    }
    ParticleEffect.prototype.run = function () {
        var _this = this;
        this.particles.forEach(function (particle) {
            particle.run();
            if (particle.outOfTime())
                _this.remove(particle);
        });
    };
    ParticleEffect.prototype.add = function (particle) {
        this.particles.push(particle);
    };
    ParticleEffect.prototype.remove = function (particleToRemove) {
        this.particles = this.particles.filter(function (particle) { return particle !== particleToRemove; });
    };
    ParticleEffect.prototype.particleCount = function () { return this.particles.length; };
    return ParticleEffect;
}());
export { ParticleEffect };
//# sourceMappingURL=particleEffect.js.map
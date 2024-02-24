import { Vector } from "../math/vector.js"
import { createCircleExplosionEffect, CircleExplosionOptions } from "./effects/circleExplosion.js"
import { ParticleEffect } from "./particleEffect.js"
import { renderParticleEffect } from "./renderParticleEffect.js"

export class ParticleEffectsManager {
    particleEffects: ParticleEffect[]

    constructor() {
        this.particleEffects = []
    }

    update() {
        this.particleEffects.forEach((particleEffect) => { 
            particleEffect.run()
            if(!particleEffect.particleCount()) this.remove(particleEffect)
        })
    }

    render() {
        this.particleEffects.forEach(renderParticleEffect)
    }

    add(particleEffect) { this.particleEffects.push(particleEffect) }

    remove(particleEffectToRemove) { 
        this.particleEffects = this.particleEffects.filter((particleEffect) => particleEffect !== particleEffectToRemove)
    }

    createCircleExplosionEffect(position: Vector, options: CircleExplosionOptions) {
        const particleEffect = createCircleExplosionEffect(position, options)
        this.add(particleEffect)
    }
}
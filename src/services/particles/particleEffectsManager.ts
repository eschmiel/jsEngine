import { Vector } from "../vector.js"
import { createCircleExplosionEffect } from "./circleExplosion.js"
import { ParticleEffect } from "./particleEffect.js"
import { CircleExplosionOptions } from "./particles.js"

export class ParticleEffectsManager {
    particleEffects: ParticleEffect[]

    constructor() {
        this.particleEffects = []
    }

    update() {
        this.particleEffects.forEach((particleEffect) => { 
            particleEffect.update()
            if(!particleEffect.particleCount()) this.remove(particleEffect)
        })
    }

    draw() {
        this.particleEffects.forEach((particleEffect) => particleEffect.draw())
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
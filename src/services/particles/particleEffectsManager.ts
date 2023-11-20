import { ObserverEventData, ObserverEventType } from "../types.js"
import { Vector } from "../vector.js"
import { createCircleExplosionEffect, CircleExplosionOptions } from "./effects/circleExplosion.js"
import { ParticleEffect } from "./particleEffect.js"

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

    onNotify(event: ObserverEventType, data: ObserverEventData) {
        switch(event){
            case ParticleEffectsManagerEvents.CircleExplosion:
                this.createCircleExplosionEffect(data.position, data.options)
                break
            default:
        }
    }
}

export enum ParticleEffectsManagerEvents {
    CircleExplosion
}

export type CircleExplosionEventData = {position: Vector, options: CircleExplosionOptions}

export type ParticleEffectsManagerEventData = CircleExplosionEventData
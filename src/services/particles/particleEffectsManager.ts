import { ObserverEventData, ObserverEventType } from "../../services/observable.js"
import { Vector } from "../math/vector.js"
import { Renderer } from "../rendering/render.js"
import { createCircleExplosionEffect, CircleExplosionOptions } from "./effects/circleExplosion.js"
import { ParticleEffect } from "./particleEffect.js"

export class ParticleEffectsManager {
    particleEffects: ParticleEffect[]

    constructor() {
        this.particleEffects = []
    }

    run() {
        this.particleEffects.forEach((particleEffect) => { 
            particleEffect.run()
            if(!particleEffect.particleCount()) this.remove(particleEffect)
        })
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
                if(isParticleEffectsManagerEventData(data)) this.createCircleExplosionEffect(data.position, data.options)
                break
            default:
        }
    }
}

export enum ParticleEffectsManagerEvents {
    CircleExplosion
}

export type CircleExplosionEventData = {position: Vector, options?: CircleExplosionOptions}

export type ParticleEffectsManagerEventData = CircleExplosionEventData

function isParticleEffectsManagerEventData(input: ObserverEventData): input is ParticleEffectsManagerEventData {
    return (input as ParticleEffectsManagerEventData).position !== undefined
}
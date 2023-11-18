import { Vector, createDirection } from "../../vector.js"
import { Particle } from "../particle.js";
import { getCircleExplosionParticleConfig } from '../configs/circleExplosionParticleConfig.js'
import { ParticleEffect } from "../particleEffect.js";

export const createCircleExplosionEffect = (position: Vector, options: CircleExplosionOptions = defaultCircleExplosionOptions) => {
    const { particleNumber } = options
    const particleDegreeGap = 360/particleNumber

    const particleEffect = new ParticleEffect()

    for ( let i = 1; i <= particleNumber; i++ ) {
        const projectedAngle = particleDegreeGap * i
        const particle = createCircleExplosionParticle(position, projectedAngle, options)
        particleEffect.add(particle)
    }

    return particleEffect
}

function createCircleExplosionParticle(position: Vector = new Vector(0, 0), projectedAngle: number = 0, circleExplosionOptions: CircleExplosionOptions = defaultCircleExplosionOptions) {
    const { 
        particleSize = defaultCircleExplosionOptions.particleSize, 
        startDistanceFromOrigin = defaultCircleExplosionOptions.startDistanceFromOrigin
    } = circleExplosionOptions

    const particleOptions = getCircleExplosionParticleConfig()

    const direction = createDirection(projectedAngle)
    particleOptions.body.position = position.addVector(direction.multiplyByScalar(startDistanceFromOrigin))
    particleOptions.body.dimensions = particleSize.copy()
    particleOptions.body.rotation= projectedAngle

    return new Particle(particleOptions)
}


///// Types and defaults



export enum ParticleTypes {
    Triangle = 'triangle'
}

export type CircleExplosionOptions = {
    type?: ParticleTypes
    particleSize?: Vector
    particleNumber?: number  
    startDistanceFromOrigin?: number
}

const defaultCircleExplosionOptions: CircleExplosionOptions = {
    type: ParticleTypes.Triangle, 
    particleSize: new Vector(1,1), 
    particleNumber:  5,  
    startDistanceFromOrigin: 1 
}

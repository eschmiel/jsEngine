import { Vector, createDirection } from "../../math/vector.js"
import { Particle } from "../particle.js";
import { getCircleExplosionParticleConfig } from '../configs/circleExplosionParticleConfig.js'
import { ParticleEffect } from "../particleEffect.js";
import { getRandomWholeNumberInRange } from "../../../utilities/util.js";

export const createCircleExplosionEffect = (position: Vector, options: CircleExplosionOptions = defaultCircleExplosionOptions) => {
    const { 
        particleNumber = defaultCircleExplosionOptions.particleNumber, 
        randomnessInParticleAngles = defaultCircleExplosionOptions.randomnessInParticleAngles 
    } = options
    
    const particleDegreeGap = 360/particleNumber

    const particleEffect = new ParticleEffect()

    for ( let i = 1; i <= particleNumber; i++ ) {
        const projectedAngle = particleDegreeGap * i + getRandomWholeNumberInRange(0, randomnessInParticleAngles)
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
    randomnessInParticleAngles?: number
}

const defaultCircleExplosionOptions: CircleExplosionOptions = {
    type: ParticleTypes.Triangle, 
    particleSize: new Vector(1,1), 
    particleNumber:  5,  
    startDistanceFromOrigin: 1,
    randomnessInParticleAngles: 0
}

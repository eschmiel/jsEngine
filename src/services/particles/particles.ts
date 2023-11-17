import { Manageable, Manager } from "../../utilities/manager.js"
import { AcceleratorSettings } from "../accelerator.js";
import { FaderSettings } from "../fader.js";
import { Vector, createDirection } from "../vector.js"
import { Particle } from "./particle.js";

export class ParticleEffectManager {
    manager: Manager<ParticleEffect>;

    constructor() {
        this.manager = new Manager()
    }

    // Pull this out into its own function
    createCircleExplosion(position: Vector, options: CircleExplosionOptions = defaultCircleExplosionOptions){
        const {type, particleSize, particleNumber, startDistanceFromOrigin} = options
        const particleEffect = new Manager<Particle>()

        const particleDegreeGap = 360/particleNumber
        for ( let i = 1; i <= particleNumber; i++ ) {
            const particleDirection = createDirection(particleDegreeGap * i)
            const particleBodyOptions = {
                position: position.addVector(particleDirection.multiplyByScalar(startDistanceFromOrigin)),
                dimensions: particleSize.copy(),
                rotation: particleDegreeGap,
                rotationSpeed: 25,
                speed: 10
            }
            const faderSettings: FaderSettings = {
                startingAlpha: 1,
                targetAlpha: 0,
                fadeRate: 1/45
            }
            
            const acceleratorSettings: AcceleratorSettings = {
                startingSpeed: 10,
                accelerationRate: .01
            }

            const particleOptions = {
                body: particleBodyOptions,
                faderSettings,
                acceleratorSettings,
                maxTime: 45
            }
            particleEffect.push(new Particle(particleOptions))
        }

        this.manager.push(particleEffect)
    }
}



///// Types and defaults



export type ParticleEffect = Manager<Particle>

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

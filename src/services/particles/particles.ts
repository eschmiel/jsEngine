import { Manager } from "../../utilities.ts/manager.js"
import { Vector, createDirection } from "../vector.js"
import { Particle } from "./particle.js";

export class ParticleEffectManager {
    manager: Manager;

    constructor() {
        this.manager = new Manager()
    }

    createCircleExplosion(position: Vector, options: CircleExplosionOptions = defaultCircleExplosionOptions){
        const {type, particleSize, particleNumber, startDistanceFromOrigin} = options
        const particles: Particle[] = []

        const particleDegreeGap = 360/particleNumber
        for ( let i = 1; i <= particleNumber; i++ ) {
            const particleDirection = createDirection(particleDegreeGap * i)
            const particlePosition = position.addVector(particleDirection.multiplyByScalar(startDistanceFromOrigin))
            particles.push(new Particle(particlePosition.copy(), particleSize.copy(), particleDirection.copy(), 10, .01))
        }

    }
}



///// Types and defaults



export enum ParticleTypes {
    Triangle = 'triangle'
}

export type CircleExplosionOptions = {
    type: ParticleTypes
    particleSize: Vector
    particleNumber: number  
    startDistanceFromOrigin: number
}

const defaultCircleExplosionOptions: CircleExplosionOptions = {
    type: ParticleTypes.Triangle, 
    particleSize: new Vector(1,1), 
    particleNumber:  5,  
    startDistanceFromOrigin: 1 
}

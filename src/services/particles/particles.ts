import { Manager } from "../../utilities.ts/manager"
import { Vector } from "../vector"

export class ParticleManager {
    manager: Manager;

    constructor() {
        this.manager = new Manager()
    }

    createCircleExplosion(position: Vector, options: CircleExplosionOptions = defaultCircleExplosionOptions){
        
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

import { degreesToRadians } from '../util.js'

export class Vector {
    values: number[]

    constructor(...values: number[]) {
        this.values = structuredClone(values)
    }

    addVector(vector: Vector) {
        const newValues = this.values.map((value, index) => value + vector.values[index])
        return new Vector(...newValues)
    }

    subtractVector(vector: Vector) {
        const newValues = this.values.map((value, index) => value - vector.values[index])
        return new Vector(...newValues)
    }

    multiplyByScalar(scalar: number) {
        const newValues = this.values.map((value) => value * scalar)
        return new Vector(...newValues)
    }

    copy() {
        return new Vector(...this.values)
    }
}

export const createDirection = (degrees = 0) => { 
    const radians = degreesToRadians(degrees)
    return new Vector(Math.cos(radians), Math.sin(radians))  
}
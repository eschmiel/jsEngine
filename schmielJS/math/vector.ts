import { degreesToRadians } from '../utilities/util.js'

export class Vector {
    values: number[]

    constructor(...values: number[]) {
        this.values = values
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

    getDotProduct(vector: Vector) {
        if(vector.values.length !== this.values.length) throw new Error("vector.getDotProduct(vector) failed. The parameter vector must have the same number of values as the vector it's trying to get the dot product with")
        let dotProduct = 0
        this.values.forEach((value, index) => dotProduct += value * vector.values[index])

        return dotProduct
    }

    copy() {
        return new Vector(...this.values)
    }
}

export const createDirection = (degrees = 0) => { 
    const radians = degreesToRadians(degrees)
    return new Vector(Math.cos(radians), Math.sin(radians))  
}

export const createVelocity = (degrees: number = 0, speed: number = 0) => {
    const direction = createDirection(degrees)
    return direction.multiplyByScalar(speed)
}
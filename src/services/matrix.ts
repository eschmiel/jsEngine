import { degreesToRadians } from "../util.js";
import { Vector } from "./vector.js";

export class Matrix {
    values: Array<Array<number>>

    constructor(initialValues: Vector | Array<Array<number>> | Array<number>) {
        this.values = []

        if(isVector(initialValues)) {
            this.values.push([...initialValues.values])
        } else if(isMultiDimenisonalArray(initialValues)) {
            this.values = structuredClone(initialValues)
        } else {
            this.values.push([...initialValues])
        }
    }

    multiplyByMatrix(otherMatrix: Matrix){
        const newMatrixValues = this.values.map((row) => {
            const newRow = []
            const otherMatrixColumnNumber = otherMatrix.values[0].length
            const rowVector = new Vector(...row)
            for (let column = 0; column < otherMatrixColumnNumber; column++) {
                const columnVectorValues = otherMatrix.values.map((otherMatrixRow) => otherMatrixRow[column])
                const columnVector = new Vector(...columnVectorValues)
                
                newRow.push(rowVector.getDotProduct(columnVector))
            }

            return newRow
        })

        return new Matrix(newMatrixValues)
    }
}

export function createRotationMatrix(degrees) {
    const radians = degreesToRadians(degrees)
    return new Matrix([
        [Math.cos(radians), Math.sin(radians)],
        [-Math.sin(radians), Math.cos(radians)]
    ])
}

function isVector(input: Vector | Array<Array<number>> | Array<number>): input is Vector {
    return (input as Vector).addVector !== undefined
}

function isMultiDimenisonalArray(input: Vector | Array<Array<number>> | Array<number>): input is Array<Array<number>> {
    return Array.isArray((input as Array<Array<number>>)[0])
}
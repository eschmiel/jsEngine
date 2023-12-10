import { Matrix, createRotationMatrix } from "./matrix.js"
import { Vector } from "./vector.js"

export function rotatePoint(point: Vector, degrees: number) {
    const vectorMatrix = new Matrix(point)
    const rotationMatrix = createRotationMatrix(degrees)
    const rotatedVectorMatrix = vectorMatrix.multiplyByMatrix(rotationMatrix)

    return new Vector(...rotatedVectorMatrix.values[0])
}
import Canvas from "./canvas.js";
import { Vector } from "../math/vector.js";

export class RenderingSystem {
    canvas: Canvas

    constructor() {
        this.canvas = new Canvas()
    }

    renderFillTriangle(trianglePoints: Array<Vector>, color: string = 'black') {
        if(trianglePoints?.length !== 3) throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors')
        this.canvas.save()
        this.canvas.fillTriangle(trianglePoints, color)
        this.canvas.restore()
    }

    renderStrokeTriangle(trianglePoints: Array<Vector>, color: string = 'black') {
        if(trianglePoints?.length !== 3) throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors')
        this.canvas.save()
        this.canvas.strokeTriangle(trianglePoints, color)
        this.canvas.restore()
    }

    renderFillCircle(position: Vector, radius: number, color: string = 'black') {
        this.canvas.save()
        this.canvas.fillCircle(position, radius, color)
        this.canvas.restore()
    }

    clearScreen(){
        this.canvas.clearScreen()
    }
}
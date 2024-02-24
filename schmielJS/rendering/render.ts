import Canvas, { FillTextOptions } from "./canvas.js";
import { Vector } from "../math/vector.js";
import { TEXT_ALIGN } from "./renderConstants.js";

export class Renderer {
    Canvas: typeof Canvas

    constructor() { }

    renderFillTriangle(trianglePoints: Array<Vector>, color: string = 'black') {
        if(trianglePoints?.length !== 3) throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors')
        Canvas.save()
        Canvas.fillTriangle(trianglePoints, color)
        Canvas.restore()
    }

    renderStrokeTriangle(trianglePoints: Array<Vector>, color: string = 'black') {
        if(trianglePoints?.length !== 3) throw new Error('RenderingSystem.renderFillTriangle(trianglePoints) failed. TrianglePoints does not contain 3 vectors')
        Canvas.save()
        Canvas.strokeTriangle(trianglePoints, color)
        Canvas.restore()
    }

    renderFillCircle(position: Vector, radius: number, color: string = 'black') {
        Canvas.save()
        Canvas.fillCircle(position, radius, color)
        Canvas.restore()
    }

    renderRectangle(position: Vector, dimensions: Vector, color: string = 'black', type?: string) {
        Canvas.save()
        Canvas.drawRectangle(position, dimensions, color)
        Canvas.restore()
    }

    renderLine(origin: Vector, end: Vector, color: string = 'black') {
        Canvas.save()
        Canvas.drawLine(origin, end, color)
        Canvas.restore()
    }

    renderText(text: string, position: Vector, options?: FillTextOptions) {
        Canvas.save()
        Canvas.fillText(text, position, options)
        Canvas.restore()
    }
     

    clearScreen(){
        Canvas.clearScreen()
    }
}
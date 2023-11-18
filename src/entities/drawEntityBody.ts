import canvas from "../services/canvas.js"
import { Vector } from "../services/vector.js"
import { EntityBody } from "./entityBody.js"

export enum EntityBodyTriangleDrawTypes {
    Stroke = 'stroke',
    Fill = 'fill'
}
export const createTrianglePointsForEntityBody = (body: EntityBody) => {
    const [x, y] = body.getPosition()
    const [centerX, centerY] = body.getCenterPosition()
    const [endX, endY] = body.getEndPosition()

    return [
        body.position.copy(),
        new Vector(endX, centerY),
        new Vector(x, endY)
    ]
}

export const drawEntityBodyTriangle = (body: EntityBody, drawType: EntityBodyTriangleDrawTypes = EntityBodyTriangleDrawTypes.Fill, color: string = 'black', transparency = 1) => {
    const trianglePoints = createTrianglePointsForEntityBody(body)
    
    canvas.save()
    canvas.context.globalAlpha = transparency
    
    canvas.rotate(body.rotation, body.getCenterPositionVector())

    switch(drawType){
        case EntityBodyTriangleDrawTypes.Fill:
            canvas.fillTriangle(trianglePoints, color)
            break;
        case EntityBodyTriangleDrawTypes.Stroke:
            canvas.strokeTriangle(trianglePoints, color)
            break;
        default:
            throw new Error(`drawEntityBodyTriangle called with unsupported drawType parameter: ${drawType}`)
    }

    canvas.restore()
}
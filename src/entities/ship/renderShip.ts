import { rotatePoint } from "../../../schmielJS/math/transformations.js";
import { Vector } from "../../../schmielJS/math/vector.js";
import { Renderer } from "../../../schmielJS/rendering/render.js";
import Ship from "./ship";

// Render ship as a different color based on player
// Don't render ship if ship.visible === false
export function renderShip(ship: Ship, player: number, color: string[]) {
    if(!ship.visible) return
    const renderer = new Renderer()

    const trianglePoints = getShipTrianglePoints(ship)
    renderer.renderFillTriangle(trianglePoints, color[player] )
}

function getShipTrianglePoints(ship: Ship) {
    const [width, height] = ship.body.getDimensions()
    const {rotation, position} = ship.body

    const pointsFromPointOfRotation = [
        new Vector(-width/2, height/2),
        new Vector(width/2, 0),
        new Vector(-width/2, -height/2)
    ]

    const rotatedPoints = pointsFromPointOfRotation.map((point) => rotatePoint(point, rotation))

    const pointsOffsetFromShipPosition = rotatedPoints.map((point) => point.addVector(position))

    return pointsOffsetFromShipPosition
}
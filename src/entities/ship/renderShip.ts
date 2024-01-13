import { rotatePoint } from "../../services/math/transformations.js";
import { Vector } from "../../services/math/vector.js";
import { Renderer } from "../../services/rendering/render.js";
import Ship from "./ship";

// Render ship as a different color based on player
// Don't render ship if ship.visible === false
export function renderShip(ship: Ship, player?: number) {
    const renderer = new Renderer()

    const trianglePoints = getShipTrianglePoints(ship)
    renderer.renderFillTriangle(trianglePoints)
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
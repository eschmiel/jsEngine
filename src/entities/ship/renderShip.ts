import { RenderingSystem } from "../../services/rendering/render.js";
import { rotatePoint } from "../../services/transformations.js";
import { Vector } from "../../services/vector.js";
import Ship from "./ship.js";

export function renderShip(renderingSystem: RenderingSystem, ship: Ship) {
    if(ship.alive) {
        const trianglePoints = getTrianglePoints(ship)
        renderingSystem.renderFillTriangle(trianglePoints, 'black')
    }
}

function getTrianglePoints(ship: Ship) {
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
import { Renderer } from "../../services/rendering/render.js";
import { rotatePoint } from "../../services/math/transformations.js";
import { Vector } from "../../services/math/vector.js";
import Ship from "./ship.js";

export class ShipRenderer {
    renderer: Renderer
    ship: Ship

    constructor(renderer: Renderer, ship: Ship) {
        this.renderer = renderer
        this.ship = ship
    }

    run(){
        if(this.ship.alive) {
            const trianglePoints = this.getTrianglePoints()
            this.renderer.renderFillTriangle(trianglePoints)
        }
    }

    getTrianglePoints() {
        const [width, height] = this.ship.body.getDimensions()
        const {rotation, position} = this.ship.body

        const pointsFromPointOfRotation = [
            new Vector(-width/2, height/2),
            new Vector(width/2, 0),
            new Vector(-width/2, -height/2)
        ]

        const rotatedPoints = pointsFromPointOfRotation.map((point) => rotatePoint(point, rotation))

        const pointsOffsetFromShipPosition = rotatedPoints.map((point) => point.addVector(position))

        return pointsOffsetFromShipPosition
    }
}
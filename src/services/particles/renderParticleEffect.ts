import { RenderingSystem } from "../rendering/render.js";
import { rotatePoint } from "../math/transformations.js";
import { Vector } from "../math/vector.js";
import { Particle } from "./particle.js";
import { ParticleEffect } from "./particleEffect.js";

export function renderParticleEffect(renderingSystem: RenderingSystem, particleEffect: ParticleEffect){
    particleEffect.particles.forEach((particle) => {
        const trianglePoints = getTrianglePoints(particle)
        renderingSystem.renderStrokeTriangle(trianglePoints, `rgb(0 0 0 / ${particle.transparency})`)
    })
}

function getTrianglePoints(particle: Particle) {
    const [width, height] = particle.body.getDimensions()
    const {rotation, position} = particle.body

    const pointsFromPointOfRotation = [
        new Vector(-width/2, height/2),
        new Vector(width/2, 0),
        new Vector(-width/2, -height/2)
    ]

    const rotatedPoints = pointsFromPointOfRotation.map((point) => rotatePoint(point, rotation))

    const pointsOffsetFromShipPosition = rotatedPoints.map((point) => point.addVector(position))

    return pointsOffsetFromShipPosition
}
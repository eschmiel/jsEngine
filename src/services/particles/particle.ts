import { EntityBodyOptions, EntityBody } from "../../entities/entityBody.js";
import { Accelerator, AcceleratorSettings } from "../lerpers/accelerator.js";
import { Fader, FaderSettings } from "../lerpers/fader.js";
import { rotatePoint } from "../math/transformations.js";
import { Vector } from "../math/vector.js";
import { Renderer } from "../rendering/render.js";

export class Particle {
    renderer: Renderer
    color: string;
    maxTime: number
    accelerator: Accelerator;
    fader: Fader;
    body: EntityBody;
    timer: number;
    transparency: number;

    constructor(options: ParticleOptions) {
        this.renderer = new Renderer()
        const { 
            body = defaultParticleOptions.body,
            color = defaultParticleOptions.color, 
            maxTime = defaultParticleOptions.maxTime,
            faderSettings,
            acceleratorSettings
        } = options

        const { startingAlpha, targetAlpha, fadeRate } = faderSettings
        const { startingSpeed, maxSpeed, accelerationRate, direction} = acceleratorSettings

        this.body = isEntityBody(body) ? body.copy() : new EntityBody(body)
        this.accelerator = new Accelerator(startingSpeed, maxSpeed, accelerationRate, direction)
        this.color = color
        this.timer = 0
        this.maxTime = maxTime
        this.fader = new Fader(startingAlpha, targetAlpha, fadeRate)
        this.transparency = this.fader.getStartingAlpha()
    }

    run() {
        this.body.speed = this.accelerator.run()
        this.body.update()
        this.transparency = this.fader.run()
        this.timer++

        const trianglePoints = this.getTrianglePoints()
        this.renderer.renderStrokeTriangle(trianglePoints, `rgb(0 0 0 / ${this.transparency})`)
    }

    getTrianglePoints() {
        const [width, height] = this.body.getDimensions()
        const {rotation, position} = this.body
    
        const pointsFromPointOfRotation = [
            new Vector(-width/2, height/2),
            new Vector(width/2, 0),
            new Vector(-width/2, -height/2)
        ]
    
        const rotatedPoints = pointsFromPointOfRotation.map((point) => rotatePoint(point, rotation))
    
        const pointsOffsetFromShipPosition = rotatedPoints.map((point) => point.addVector(position))
    
        return pointsOffsetFromShipPosition
    }
    
    outOfTime() {
        return this.timer >= this.maxTime
    }
}



// Types and defaults



export type ParticleOptions = {
    body?: EntityBodyOptions | EntityBody
    color?: string,
    maxTime?: number,
    faderSettings?: FaderSettings,
    acceleratorSettings?: AcceleratorSettings
}

const defaultParticleOptions: ParticleOptions = {
    body: new EntityBody(),
    color: 'black',
    maxTime: 5
}


function isEntityBody(input: EntityBodyOptions | EntityBody): input is EntityBody {
    return (input as EntityBody).update !== undefined
}
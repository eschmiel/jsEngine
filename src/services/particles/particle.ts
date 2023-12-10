import { EntityBodyOptions, EntityBody } from "../../entities/entityBody.js";
import { Accelerator, AcceleratorSettings } from "../lerpers/accelerator.js";
import { Fader, FaderSettings } from "../lerpers/fader.js";

export class Particle {
    color: string;
    maxTime: number
    accelerator: Accelerator;
    fader: Fader;
    body: EntityBody;
    timer: number;
    transparency: number;

    constructor(options: ParticleOptions) {
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

    update() {
        this.body.speed = this.accelerator.run()
        this.body.update()
        this.transparency = this.fader.run()
        this.timer++
    }

    outOfTime() {
        return this.timer >= this.maxTime
    }
}

function isEntityBody(input: EntityBodyOptions | EntityBody): input is EntityBody {
    return (input as EntityBody).update !== undefined
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
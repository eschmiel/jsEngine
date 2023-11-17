import { Lerp } from "../util.js"

export enum AcceleratorDirection {
    Forward = 'forward',
    Backward = 'backward',
    Stop = 'stop'
}

export type AcceleratorSettings = {
    maxSpeed?: number,
    accelerationRate?: number,
    startingSpeed?: number,
    direction?: AcceleratorDirection
}
export class Accelerator {
    maxSpeed: number
    direction: AcceleratorDirection
    lerp: Lerp

    constructor(startingSpeed:number = 0, maxSpeed: number = 0, accelerationRate: number = .01, direction: AcceleratorDirection = AcceleratorDirection.Stop) {
        this.maxSpeed = maxSpeed
        this.lerp = new Lerp(startingSpeed, maxSpeed, accelerationRate)
        this.setDirection(direction)
    }

    getCurrentLerpTarget(){
        return this.lerp.destination
    }

    run() { 
        return this.lerp.run()
    }

    reset() {
        this.lerp.reset()
    }

    setDirection(newDirection: AcceleratorDirection) {
        if(newDirection === this.direction) return

        switch(newDirection) {
            case AcceleratorDirection.Forward:
                this.lerp.redirect(this.maxSpeed)
                break;
            case AcceleratorDirection.Backward:
                this.lerp.redirect(-this.maxSpeed)
                break;
            case AcceleratorDirection.Stop:
                this.lerp.redirect(0)
                break;
            default:
                throw new Error(`Accelerator was given an unacceptable direction: ${newDirection}`) 
        }

        this.direction = newDirection
    }
}
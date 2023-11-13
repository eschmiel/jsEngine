import { Lerp } from "../util.js"

export enum AcceleratorDirection {
    Forward = 'forward',
    Backward = 'backward',
    Stop = 'stop'
}

export class Accelerator {
    targetSpeed: number
    direction: AcceleratorDirection
    lerp: Lerp

    constructor(targetSpeed: number, accelerationRate: number) {
        this.targetSpeed = targetSpeed
        this.direction = AcceleratorDirection.Stop
        this.lerp = new Lerp(0, 0, accelerationRate)
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
                this.lerp.redirect(this.targetSpeed)
                break;
            case AcceleratorDirection.Backward:
                this.lerp.redirect(-this.targetSpeed)
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
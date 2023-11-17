import { Lerp } from "../util.js";
import { validateIsBetweenOneAndZero } from "../utilities/validation.js";

export class Fader{
    lerp: Lerp
    constructor(startingAlpha = 1, targetAlpha = 1, fadeRate = 1){
        validateIsBetweenOneAndZero(startingAlpha, 'Creating fader failed')
        validateIsBetweenOneAndZero(targetAlpha, 'Creating fader failed')
        validateIsBetweenOneAndZero(fadeRate, 'Creating fader failed')
        
        this.lerp = new Lerp(startingAlpha, targetAlpha, fadeRate)
    }

    run(){
        return this.lerp.run()
    }

    setTransparencyTarget(newTargetAlpha: number){
        validateIsBetweenOneAndZero(newTargetAlpha, 'fader.setTransparency failed')

        this.lerp.redirect(newTargetAlpha)
    }

    immediatelySetTransparency(newTransparency: number) {
        validateIsBetweenOneAndZero(newTransparency, 'fader.immediatelySetTransparency failed')

        this.lerp.destination = newTransparency
        this.lerp.currentTime = 1
    }

    setFadeRate(newFadeRate: number){
        validateIsBetweenOneAndZero(newFadeRate, 'fader.setFadeRate failed')

        this.lerp.accelerationRate = newFadeRate
    }

    getStartingAlpha() {
        return this.lerp.origin
    }
}

export type FaderSettings = {
    targetAlpha?: number,
    startingAlpha?: number,
    fadeRate?: number
}
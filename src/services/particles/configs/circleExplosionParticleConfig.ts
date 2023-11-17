import { AcceleratorSettings } from "../../accelerator.js"
import { FaderSettings } from "../../fader.js"
import { Vector } from "../../vector.js"

export function getCircleExplosionParticleConfig() {
    const particleBodyOptions = {
        position: new Vector(0, 0),
        dimensions: new Vector(1,1),
        rotation: 0,
        rotationSpeed: 0, //25,
        speed: 10
    }
    
    const faderSettings: FaderSettings = {
        startingAlpha: 1,
        targetAlpha: 0,
        fadeRate: 1/28 //45
    }
    
    const acceleratorSettings: AcceleratorSettings = {
        startingSpeed: 10,
        accelerationRate: .01
    }
    
    return {
        body: particleBodyOptions,
        faderSettings,
        acceleratorSettings,
        maxTime: 45
    }
}
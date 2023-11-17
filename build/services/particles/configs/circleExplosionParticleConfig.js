import { Vector } from "../../vector.js";
export function getCircleExplosionParticleConfig() {
    var particleBodyOptions = {
        position: new Vector(0, 0),
        dimensions: new Vector(1, 1),
        rotation: 0,
        rotationSpeed: 0,
        speed: 10
    };
    var faderSettings = {
        startingAlpha: 1,
        targetAlpha: 0,
        fadeRate: 1 / 28 //45
    };
    var acceleratorSettings = {
        startingSpeed: 10,
        accelerationRate: .01
    };
    return {
        body: particleBodyOptions,
        faderSettings: faderSettings,
        acceleratorSettings: acceleratorSettings,
        maxTime: 45
    };
}
//# sourceMappingURL=circleExplosionParticleConfig.js.map
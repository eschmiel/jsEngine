import { EntityBody } from "../../entities/entityBody.js";
import { Accelerator } from "../lerpers/accelerator.js";
import { Fader } from "../lerpers/fader.js";
var Particle = /** @class */ (function () {
    function Particle(options) {
        var _a = options.body, body = _a === void 0 ? defaultParticleOptions.body : _a, _b = options.color, color = _b === void 0 ? defaultParticleOptions.color : _b, _c = options.maxTime, maxTime = _c === void 0 ? defaultParticleOptions.maxTime : _c, faderSettings = options.faderSettings, acceleratorSettings = options.acceleratorSettings;
        var startingAlpha = faderSettings.startingAlpha, targetAlpha = faderSettings.targetAlpha, fadeRate = faderSettings.fadeRate;
        var startingSpeed = acceleratorSettings.startingSpeed, maxSpeed = acceleratorSettings.maxSpeed, accelerationRate = acceleratorSettings.accelerationRate, direction = acceleratorSettings.direction;
        this.body = isEntityBody(body) ? body.copy() : new EntityBody(body);
        this.accelerator = new Accelerator(startingSpeed, maxSpeed, accelerationRate, direction);
        this.color = color;
        this.timer = 0;
        this.maxTime = maxTime;
        this.fader = new Fader(startingAlpha, targetAlpha, fadeRate);
        this.transparency = this.fader.getStartingAlpha();
    }
    Particle.prototype.update = function () {
        this.body.speed = this.accelerator.run();
        this.body.update();
        this.transparency = this.fader.run();
        this.timer++;
    };
    Particle.prototype.outOfTime = function () {
        return this.timer >= this.maxTime;
    };
    return Particle;
}());
export { Particle };
function isEntityBody(input) {
    return input.update !== undefined;
}
var defaultParticleOptions = {
    body: new EntityBody(),
    color: 'black',
    maxTime: 5
};
//# sourceMappingURL=particle.js.map
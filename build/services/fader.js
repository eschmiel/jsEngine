import { Lerp } from "../util.js";
import { validateIsBetweenOneAndZero } from "../utilities/validation.js";
var Fader = /** @class */ (function () {
    function Fader(startingAlpha, targetAlpha, fadeRate) {
        if (startingAlpha === void 0) { startingAlpha = 1; }
        if (targetAlpha === void 0) { targetAlpha = 1; }
        if (fadeRate === void 0) { fadeRate = 1; }
        validateIsBetweenOneAndZero(startingAlpha, 'Creating fader failed');
        validateIsBetweenOneAndZero(targetAlpha, 'Creating fader failed');
        validateIsBetweenOneAndZero(fadeRate, 'Creating fader failed');
        this.lerp = new Lerp(startingAlpha, targetAlpha, fadeRate);
    }
    Fader.prototype.run = function () {
        return this.lerp.run();
    };
    Fader.prototype.setTransparencyTarget = function (newTargetAlpha) {
        validateIsBetweenOneAndZero(newTargetAlpha, 'fader.setTransparency failed');
        this.lerp.redirect(newTargetAlpha);
    };
    Fader.prototype.immediatelySetTransparency = function (newTransparency) {
        validateIsBetweenOneAndZero(newTransparency, 'fader.immediatelySetTransparency failed');
        this.lerp.destination = newTransparency;
        this.lerp.currentTime = 1;
    };
    Fader.prototype.setFadeRate = function (newFadeRate) {
        validateIsBetweenOneAndZero(newFadeRate, 'fader.setFadeRate failed');
        this.lerp.accelerationRate = newFadeRate;
    };
    Fader.prototype.getStartingAlpha = function () {
        return this.lerp.origin;
    };
    return Fader;
}());
export { Fader };
//# sourceMappingURL=fader.js.map
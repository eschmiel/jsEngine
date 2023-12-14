import { PlayerRenderer } from "../../entities/player/playerRenderer.js";
import { ParticleEffectsManager } from "../particles/particleEffectsManager.js";
import { Renderer } from "./render.js";
var RenderingSystem2 = /** @class */ (function () {
    function RenderingSystem2(gameState) {
        this.renderer = new Renderer();
        this.particleEffectManager = new ParticleEffectsManager();
        this.playerRenderer = new PlayerRenderer(gameState.player);
        this.playerRenderer.addObserver(this.particleEffectManager);
    }
    RenderingSystem2.prototype.run = function () {
        this.renderer.clearScreen();
        this.playerRenderer.run();
        this.particleEffectManager.run();
    };
    return RenderingSystem2;
}());
export { RenderingSystem2 };
//# sourceMappingURL=renderingSystem.js.map
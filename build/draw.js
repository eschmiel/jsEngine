import { renderEntities } from "./entities/renderEntities.js";
import { Renderer } from "./services/rendering/render.js";
export default (function (gameEntities, gameState, particleEffectsManager) {
    var renderer = new Renderer();
    renderer.clearScreen();
    renderEntities(gameEntities);
    particleEffectsManager.render();
});
//# sourceMappingURL=draw.js.map
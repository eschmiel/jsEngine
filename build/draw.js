import { renderGameObjects } from './services/rendering/renderGameObjects.js';
export default (function (gameState, renderingSystem) {
    var particleEffectsManager = gameState.particleEffectsManager;
    renderingSystem.clearScreen();
    // player.draw()
    // enemyBullets.draw()
    // particleEffectsManager.draw()
    renderGameObjects(gameState, renderingSystem);
});
//# sourceMappingURL=draw.js.map
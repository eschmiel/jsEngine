import { renderGameObjects } from './services/rendering/renderGameObjects.js';
export default (function (gameState, renderingSystem) {
    renderingSystem.clearScreen();
    renderGameObjects(gameState, renderingSystem);
});
//# sourceMappingURL=draw.js.map
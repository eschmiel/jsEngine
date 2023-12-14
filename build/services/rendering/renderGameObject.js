import { renderBullets } from "../../entities/bullets/renderBullets.js";
import { renderShip } from "../../entities/ship/renderShip.js";
export function renderGameObjects(gameState, renderingSystem) {
    var player = gameState.player;
    renderShip(renderingSystem, player.ship);
    renderBullets(renderingSystem, player.bulletManager);
}
//# sourceMappingURL=renderGameObject.js.map
import { debugging } from "../../config.js";
import { renderBullets } from "../../entities/bullets/renderBullets.js";
import { renderShip } from "../../entities/ship/renderShip.js";
import { renderCollisionBox } from "../collisions/renderCollisionBox.js";
import { renderParticleEffect } from "../particles/renderParticleEffect.js";
export function renderGameObjects(gameState, renderingSystem) {
    var player = gameState.player, particleEffectsManager = gameState.particleEffectsManager, enemyBullets = gameState.enemyBullets;
    if (player.ship)
        renderShip(renderingSystem, player.ship);
    renderBullets(renderingSystem, player.bulletManager);
    renderBullets(renderingSystem, enemyBullets);
    particleEffectsManager.particleEffects.forEach(function (particleEffect) { return renderParticleEffect(renderingSystem, particleEffect); });
    if (debugging && player.ship)
        renderCollisionBox(renderingSystem, player.ship.collisionBox);
}
//# sourceMappingURL=renderGameObjects.js.map
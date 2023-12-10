import { renderBullets } from "../../entities/bullets/renderBullets.js";
import { renderShip } from "../../entities/ship/renderShip.js";
import GameState from "../../gameState.js";
import { renderParticleEffect } from "../particles/renderParticleEffect.js";
import { RenderingSystem } from "./render.js";

export function renderGameObjects(gameState: GameState, renderingSystem: RenderingSystem) {
    const {player, particleEffectsManager, enemyBullets} = gameState
    renderShip(renderingSystem, player.ship)
    renderBullets(renderingSystem, player.bulletManager)
    renderBullets(renderingSystem, enemyBullets)
    particleEffectsManager.particleEffects.forEach((particleEffect) => renderParticleEffect(renderingSystem, particleEffect))
}
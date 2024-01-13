import GameEntities from "./entities/gameEntities.js";
import { renderEntities } from "./entities/renderEntities.js";
import { GameStateEnum } from "./constants.js";
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js";
import { Renderer } from "./services/rendering/render.js";

export default (gameEntities: GameEntities, gameState: GameStateEnum, particleEffectsManager: ParticleEffectsManager) => {
    const renderer = new Renderer()

    renderer.clearScreen()
    renderEntities(gameEntities)
    particleEffectsManager.render()
}
import { handleInputs } from "./controllers/handleInputs.js"
import GameEntities from "./entities/gameEntities.js"
import { updateGameEntities } from "./entities/updateEntities.js"
import { GameStateEnum } from "./constants.js"
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js"
import { GamepadController } from "./controllers/controller.js"

export default (gameEntities: GameEntities, particleEffectsManager: ParticleEffectsManager, gameState: GameStateEnum, controllerSystem: GamepadController) => {
    handleInputs(gameEntities, gameState, controllerSystem)
    updateGameEntities(gameEntities, particleEffectsManager)
    particleEffectsManager.update()
}
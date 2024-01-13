import { handleInputs } from "./controllers/handleInputs.js"
import GameEntities from "./entities/gameEntities.js"
import { updateGameEntities } from "./entities/updateEntities.js"
import { GameStateEnum } from "./constants.js"
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js"

export default (gameEntities: GameEntities, particleEffectsManager: ParticleEffectsManager, gameState: GameStateEnum) => {
    handleInputs(gameEntities, gameState)
    updateGameEntities(gameEntities, particleEffectsManager)
    particleEffectsManager.update()
}
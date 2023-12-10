import GameState from './gameState.js'
import { renderGameObjects } from './services/rendering/renderGameObjects.js'

export default (gameState: GameState, renderingSystem) => {
    renderingSystem.clearScreen()
    renderGameObjects(gameState, renderingSystem)
}
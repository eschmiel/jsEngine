import GameState from './gameState.js'
import canvas from './services/canvas.js'
import { renderGameObjects } from './services/rendering/renderGameObjects.js'

export default (gameState: GameState, renderingSystem) => {
    const {particleEffectsManager } = gameState
    renderingSystem.clearScreen()
    // player.draw()
    // enemyBullets.draw()
    // particleEffectsManager.draw()
    renderGameObjects(gameState, renderingSystem)
}
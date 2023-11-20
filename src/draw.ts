import canvas from './services/canvas.js'

export default ({ player, enemyBullets, particleEffectsManager }) => {
    canvas.clearScreen()
    // player.draw()
    enemyBullets.draw()
    particleEffectsManager.draw()
    player.draw()
}
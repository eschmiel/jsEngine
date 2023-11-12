import canvas from './services/canvas.js'

export default ({ player, enemyBullets }) => {
    canvas.clearScreen()
    player.draw()
    enemyBullets.draw()
}
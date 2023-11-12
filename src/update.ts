import GameState from "./gameState.js"

export default ({ player, enemyBullets }: GameState) => {
    player.update()
    enemyBullets.update()
    player.collideWithBullets(enemyBullets)
}
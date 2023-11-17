import GameState from "./gameState.js"

export default ({ player, enemyBullets, particleEffectsManager }: GameState) => {
    player.update()
    enemyBullets.update()
    player.collideWithBullets(enemyBullets)
    particleEffectsManager.update()
}
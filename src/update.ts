import GameState from "./gameState.js"

export default ({ player, enemyBullets, particleEffectsManager }: GameState) => {
    player.update()
    enemyBullets.update()
    player.ship.collideWithBullets(enemyBullets)
    particleEffectsManager.update()
    enemyBullets.checkForBulletCollisions(player.ship)
}
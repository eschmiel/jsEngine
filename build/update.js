export default (function (_a) {
    var player = _a.player, enemyBullets = _a.enemyBullets, particleEffectsManager = _a.particleEffectsManager;
    player.update();
    enemyBullets.update();
    player.ship.collideWithBullets(enemyBullets);
    particleEffectsManager.update();
    enemyBullets.checkForBulletCollisions(player.ship);
});
//# sourceMappingURL=update.js.map
export default (function (_a) {
    var player = _a.player, enemyBullets = _a.enemyBullets, particleEffectsManager = _a.particleEffectsManager;
    player.update();
    enemyBullets.update();
    // player.collideWithBullets(enemyBullets)
    particleEffectsManager.update();
});
//# sourceMappingURL=update.js.map
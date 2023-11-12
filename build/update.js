export default (function (_a) {
    var player = _a.player, enemyBullets = _a.enemyBullets;
    player.update();
    enemyBullets.update();
    player.collideWithBullets(enemyBullets);
});
//# sourceMappingURL=update.js.map
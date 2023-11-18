import canvas from './services/canvas.js';
export default (function (_a) {
    var player = _a.player, enemyBullets = _a.enemyBullets, particleEffectsManager = _a.particleEffectsManager;
    canvas.clearScreen();
    player.draw();
    enemyBullets.draw();
    particleEffectsManager.draw();
});
//# sourceMappingURL=draw.js.map
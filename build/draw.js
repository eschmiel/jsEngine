import canvas from './services/canvas.js';
export default (function (_a) {
    var player = _a.player, enemyBullets = _a.enemyBullets;
    canvas.clearScreen();
    player.draw();
    enemyBullets.draw();
});
//# sourceMappingURL=draw.js.map
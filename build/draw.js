import canvas from './services/canvas.js';
var rando1 = Math.random() * (255);
var rando2 = Math.random() * (255);
var rando3 = Math.random() * (255);
var power = false;
// setInterval(() => {
//  power = true
// }, 1000)
// setInterval(() => {
//     power = false
//    }, 750)
export default (function (_a) {
    var player = _a.player, enemyBullets = _a.enemyBullets;
    canvas.clearScreen();
    player.draw();
    enemyBullets.draw();
    rando2 += 1;
    if (rando2 > 255)
        rando2 = 0;
    canvas.context.fillStyle = "rgb(".concat(rando1, ", ").concat(rando2, ", ").concat(rando3, "  )");
    // if(power) canvas.context.fillStyle = `rgb(${Math.random() * (255)}, ${Math.random() * (255)}, ${Math.random() * (255)}  )`
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
});
var rando = function () {
};
//# sourceMappingURL=draw.js.map
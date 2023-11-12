import canvas from './services/canvas.js';
export default (function (managers) {
    canvas.clearScreen();
    managers.forEach(function (manager) { return manager.draw(); });
});
//# sourceMappingURL=draw.js.map
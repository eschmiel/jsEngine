export default (function (managers) {
    managers.forEach(function (manager) { return manager.update(); });
    managers[0].entities[0].collideWithBullets(managers[1]);
});
//# sourceMappingURL=update.js.map
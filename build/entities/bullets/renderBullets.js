export function renderBullets(renderingSystem, bulletManager) {
    bulletManager.bullets.forEach(function (bullet) {
        var position = bullet.body.position;
        var radius = bullet.body.dimensions.values[0];
        renderingSystem.renderFillCircle(position, radius, 'blue');
    });
}
//# sourceMappingURL=renderBullets.js.map
var BulletRenderer = /** @class */ (function () {
    function BulletRenderer(renderer, bullet) {
        this.renderer = renderer;
        this.bullet = bullet;
    }
    BulletRenderer.prototype.run = function () {
        var position = this.bullet.body.position;
        var radius = this.bullet.body.dimensions.values[0];
        this.renderer.renderFillCircle(position, radius, 'blue');
    };
    return BulletRenderer;
}());
export { BulletRenderer };
//# sourceMappingURL=bulletRenderer.js.map
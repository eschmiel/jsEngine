import { Renderer } from "../../services/rendering/render.js";
export function renderBullet(bullet, player) {
    var renderer = new Renderer();
    var position = bullet.body.position;
    var radius = bullet.body.dimensions.values[0];
    renderer.renderFillCircle(position, radius, 'blue');
}
//# sourceMappingURL=renderBullet.js.map
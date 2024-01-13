import { renderBullet } from "./bullets/renderBullet.js";
import { renderShip } from "./ship/renderShip.js";
export function renderEntities(_a) {
    var ships = _a.ships, bulletManagers = _a.bulletManagers;
    ships.forEach(function (ship) {
        if (ship)
            renderShip(ship);
    });
    bulletManagers.forEach(function (manager) {
        manager.forEachBullet(renderBullet);
    });
}
//# sourceMappingURL=renderEntities.js.map
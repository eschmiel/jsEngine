import { renderBullet } from "./bullets/renderBullet.js";
import GameEntities from "./gameEntities.js";
import { renderShip } from "./ship/renderShip.js";

export function renderEntities({ships, bulletManagers, color}: GameEntities) {
    ships.forEach((ship, player) => {
        if(ship) renderShip(ship, player, color)
    })
    bulletManagers.forEach((manager) => {
        manager.forEachBullet(renderBullet)
    })
}
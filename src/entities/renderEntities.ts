import { renderBullet } from "./bullets/renderBullet.js";
import GameEntities from "./gameEntities.js";
import { renderShip } from "./ship/renderShip.js";

export function renderEntities({ships, bulletManagers}: GameEntities) {
    ships.forEach((ship) => {
        if(ship) renderShip(ship)
    })
    bulletManagers.forEach((manager) => {
        manager.forEachBullet(renderBullet)
    })
}
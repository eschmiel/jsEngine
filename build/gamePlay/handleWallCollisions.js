import { createCircleExplosion, killPlayer } from "./activeGameHelpers.js";
export function handleWallCollisions(gameEntities, particleEffectManager) {
    var ships = gameEntities.ships, bulletManagers = gameEntities.bulletManagers;
    ships.forEach(function (ship, player) {
        if (collidedWithWall(ship)) {
            killPlayer(player, gameEntities);
            createCircleExplosion(ship.body.position, particleEffectManager);
        }
    });
    bulletManagers.forEach(function (manager) {
        manager.forEachBullet(function (bullet) {
            if (collidedWithWall(bullet)) {
                manager.remove(bullet);
                createCircleExplosion(bullet.body.position, particleEffectManager);
            }
        });
    });
}
function collidedWithWall(entity) {
    var _a = entity.body.position.values, x = _a[0], y = _a[1];
    if (x < 0
        || x > 1000
        || y < 0
        || y > 600)
        return true;
    return false;
}
//# sourceMappingURL=handleWallCollisions.js.map
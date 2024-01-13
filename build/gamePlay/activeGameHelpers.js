import { Vector } from "../services/math/vector.js";
export function killPlayer(player, gameEntities) {
    var _a = gameEntities.getPlayerEntities(player), lives = _a.lives, respawnTimer = _a.respawnTimer;
    gameEntities.removeShip(player);
    if (lives) {
        gameEntities.removeLife(player);
        respawnTimer.activate();
        gameEntities.addShip(player, new Vector(220, 220));
    }
}
export function createCircleExplosion(position, particleEffectManager) {
    particleEffectManager.createCircleExplosionEffect(position.copy(), {
        particleSize: new Vector(10, 10),
        particleNumber: 7,
        startDistanceFromOrigin: 5
    });
}
//# sourceMappingURL=activeGameHelpers.js.map
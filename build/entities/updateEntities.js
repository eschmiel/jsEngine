import { handleWallCollisions } from "../gamePlay/handleWallCollisions.js";
export function updateGameEntities(gameEntities, particleEffectManager) {
    var ships = gameEntities.ships, bulletManagers = gameEntities.bulletManagers, respawnTimers = gameEntities.respawnTimers;
    ships.forEach(function (ship) { return ship === null || ship === void 0 ? void 0 : ship.update(); });
    bulletManagers.forEach(function (manager) { return manager === null || manager === void 0 ? void 0 : manager.update(); });
    handleWallCollisions(gameEntities, particleEffectManager);
    respawnTimers.forEach(function (timer) { return timer.update(); });
    // handleRespawns(gameEntities)
}
// function handleRespawns(gameEntities: GameEntities) {
//     gameEntities.players.forEach((player, playerIndex) => {
//         if(!player) return
//         const {ship, lives, respawnTimer} =  gameEntities.getPlayerEntities(playerIndex)
//         if(!ship && lives && !respawnTimer.active) {
//             gameEntities.addShip(playerIndex, new Vector(45, 45))
//             gameEntities.removeLife(playerIndex)
//         }
//     } )
// } 
//# sourceMappingURL=updateEntities.js.map
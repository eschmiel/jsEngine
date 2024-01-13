import { handleWallCollisions } from "../gamePlay/handleWallCollisions.js";
import { Vector } from "../services/math/vector.js";
import { ParticleEffectsManager } from "../services/particles/particleEffectsManager.js";
import GameEntities from "./gameEntities.js";

export function updateGameEntities(gameEntities: GameEntities, particleEffectManager: ParticleEffectsManager) {
    const { ships, bulletManagers, respawnTimers, respawnDelayTimers } = gameEntities
    
    ships.forEach((ship) => ship?.update())
    bulletManagers.forEach((manager) => manager?.update())
    
    handleWallCollisions(gameEntities, particleEffectManager)
    
    respawnTimers.forEach((timer) => timer?.update())
    respawnDelayTimers.forEach((timer, player) => {
        if(!timer) return
        if(!timer.active) {
            gameEntities.removeRespawnDelayTimer(player)
        } else {
            timer.update()
        }
    })
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
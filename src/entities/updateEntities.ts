import { handleWallCollisions } from "../gamePlay/handleWallCollisions.js";
import { Vector } from "../services/math/vector.js";
import { ParticleEffectsManager } from "../services/particles/particleEffectsManager.js";
import GameEntities from "./gameEntities.js";

export function updateGameEntities(gameEntities: GameEntities, particleEffectManager: ParticleEffectsManager) {
    const { ships, bulletManagers, respawnTimers, respawnDelayTimers, disableShootTimers } = gameEntities
    
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

    disableShootTimers.forEach((timer, player) => {
        if(!timer) return
        if(!timer.active) {
            gameEntities.removeDisableShootTimer(player)
        } else {
            timer.update()
        }
    })
}
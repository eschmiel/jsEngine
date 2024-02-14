import { handleCollisions } from "../gamePlay/handleCollisions.js";
import { ParticleEffectsManager } from "../services/particles/particleEffectsManager.js";
import GameEntities, { Timers } from "./gameEntities.js";

export function updateGameEntities(gameEntities: GameEntities, particleEffectManager: ParticleEffectsManager) {
    const { ships, bulletManagers, flashTimers, invincibleTimers } = gameEntities
    
    ships.forEach((ship) => ship?.update())
    bulletManagers.forEach((manager) => manager?.update())
    
    handleCollisions(gameEntities, particleEffectManager)
    
    runTimerThenDispose(Timers.RespawnDelay, gameEntities)
    runTimerThenDispose(Timers.DisableShoot, gameEntities)
    runTimerThenDispose(Timers.Invincible, gameEntities)

    flashTimers.forEach((timer, player) => {
        if(!timer) return
        const ship = ships[player]

        // If ship is no longer invincible
        // Stop flashing it
        if(!invincibleTimers[player]) {
            flashTimers[player] = null
            if(ship) ship.visible = true
            return
        }

        // Flash the ship
        if(!timer.active){
            ship.visible = !ship.visible
            timer.activate()
        }

        timer.update()
    })
}

function runTimerThenDispose(timerType: Timers, gameEntities: GameEntities) {
    const timers = gameEntities[timerType]

    timers.forEach((timer, player) => {
        if(!timer) return
        if(!timer.active) {
            gameEntities[timerType][player] = null
        } else {
            timer.update()
        }
    })
}
import GameEntities from "../entities/gameEntities.js";
import { Vector } from "../services/math/vector.js";

export function killPlayer(player: number, gameEntities: GameEntities) {
    gameEntities.removeShip(player)
    const respawnDelayTimer = gameEntities.addRespawnDelayTimer(player)
    respawnDelayTimer.activate()
}

export function createShipExplosion(position, particleEffectManager) {
    particleEffectManager.createCircleExplosionEffect(position.copy(),
        {
            particleSize:  new Vector(10, 10),
            particleNumber: 7,
            startDistanceFromOrigin: 5
        }
    )
}

export function createBulletExplosion(position, particleEffectManager) {
    particleEffectManager.createCircleExplosionEffect(position.copy(),
        {
            particleSize:  new Vector(10, 10),
            particleNumber: 7,
            startDistanceFromOrigin: 5,
            randomnessInParticleAngles: 100 
        }
    )
}
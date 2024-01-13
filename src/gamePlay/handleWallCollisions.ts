import { EntityBody } from "../entities/entityBody.js"
import GameEntities from "../entities/gameEntities.js"
import { ParticleEffectsManager } from "../services/particles/particleEffectsManager.js"
import { createCircleExplosion } from "./activeGameHelpers.js"

export function handleWallCollisions(gameEntities: GameEntities, particleEffectManager: ParticleEffectsManager) {
    const {ships, bulletManagers} = gameEntities

    ships.forEach((ship, player) => {
        if(!ship) return
        if(collidedWithWall(ship)){
            gameEntities.removeShip(player)
            createCircleExplosion(ship.body.position, particleEffectManager)
        }
    })

    bulletManagers.forEach((manager) => {
        manager.forEachBullet((bullet) => {
            if(collidedWithWall(bullet)) {
                manager.remove(bullet)
                createCircleExplosion(bullet.body.position, particleEffectManager)
            }
        })
    })
}

function collidedWithWall(entity: HasEntityBody) {
    const [x, y] = entity.body.position.values
    if(x < 0 
    || x > 1000
    || y < 0 
    || y > 600 ) return true
    return false
}

type HasEntityBody = {
    body: EntityBody
}
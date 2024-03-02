import { EntityBody } from "../../../schmielJS/entityBody.js"
import GameEntities from "../../entities/gameEntities.js"
import { colliding } from "../../../schmielJS/collisions/collisions.js"
import { ParticleEffectsManager } from "../../../schmielJS/particles/particleEffectsManager.js"
import { createBulletExplosion, createShipExplosion, killPlayer } from "./activeGameHelpers.js"

export function handleCollisions(gameEntities: GameEntities, particleEffectManager: ParticleEffectsManager) {
    const {ships, bulletManagers, invincibleTimers} = gameEntities

    ships.forEach((ship, player) => {
        if(!ship) return
        if(collidedWithWall(ship)){
            if(invincibleTimers[player]?.active) {
                stopOnWall(ship)
            } else {
                killPlayer(player, gameEntities)
                createShipExplosion(ship.body.position, particleEffectManager)
                const boom = new Audio('../../../public/audio/death.wav')
                    boom.play()
                    if(gameEntities.lives[player] == 0){
                        if(player == 0){
                        const intro = new Audio('../../../public/audio/redTriangle.wav')
                        intro.play()}
                        if(player == 2){
                            const intro = new Audio('../../../audio/public/blackTriangle.wav')
                            intro.play()}
                    }
            }
        }
    })

    bulletManagers.forEach((manager, bulletPlayer) => {
        manager.forEachBullet((bullet) => {
            if(!bullet) return
            ships.forEach((ship, shipPlayer) => {
                if(!ship) return
                if(
                    bulletPlayer !== shipPlayer
                    && !invincibleTimers[shipPlayer]?.active
                    && colliding(ship.collisionBox, bullet.collisionBox)
                ){
                    manager.remove(bullet)
                    killPlayer(shipPlayer, gameEntities)
                    createShipExplosion(ship.body.position, particleEffectManager)
                    const boom = new Audio('../../../public/audio/death.wav')
                    boom.play()
                    if(gameEntities.lives[shipPlayer] == 0){
                        if(shipPlayer == 0){
                        const intro = new Audio('../../../public/audio/redTriangle.wav')
                        intro.play()}
                        if(shipPlayer == 2){
                            const intro = new Audio('../../../public/audio/blackTriangle.wav')
                            intro.play()}
                    }
                }
            })
            if(collidedWithWall(bullet)) {
                manager.remove(bullet)
                createBulletExplosion(bullet.body.position, particleEffectManager)
            }
        })
    })
}

function collidedWithWall(entity: HasEntityBody) {
    const [x, y] = entity.body.position.values
    if(x < 0 
    || x > 1600
    || y < 0 
    || y > 750 ) return true
    return false
}

function stopOnWall(entity: HasEntityBody) {
    const entityPositionCoordinates = entity.body.position.values
    const [x, y] = entityPositionCoordinates
    if(x < 0) entityPositionCoordinates[0] = 0
    if(x > 1600) entityPositionCoordinates[0] = 1600
    if(y < 0) entityPositionCoordinates[1] = 0
    if(y > 900) entityPositionCoordinates[1] = 750
}

type HasEntityBody = {
    body: EntityBody
}
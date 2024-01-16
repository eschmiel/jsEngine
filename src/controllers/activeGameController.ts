import { Direction } from '../constants.js'
import { Bullet } from '../entities/bullets/bullet.js'
import { BulletManager } from '../entities/bullets/bulletManager.js'
import GameEntities from '../entities/gameEntities.js'
import Ship from '../entities/ship/ship.js'
import { rotatePoint } from '../services/math/transformations.js'
import { Vector, createDirection } from '../services/math/vector.js'
import { Controller, GamepadController } from './controller.js'

export function activeGameController(gameEntities: GameEntities, controllerSystem: GamepadController) {
    gameEntities.players.forEach((active, playerIndex) => {
        if(!active) return
        const { ship, bulletManager, lives, respawnDelayTimer, disableShootTimer} = gameEntities.getPlayerEntities(playerIndex)

        if(ship) {
            shipController(ship, bulletManager, disableShootTimer)
        } else if(lives && !respawnDelayTimer?.active) {
            respawnController(playerIndex, gameEntities)
        }
    })
}

function shipController(ship: Ship, bulletManager: BulletManager, disableShootTimer) {    
    if(Controller.ArrowUp) ship.accelerate()
    if(Controller.ArrowDown) ship.reverse()
    if(Controller.ArrowLeft) ship.rotate(Direction.Left)
    if(Controller.ArrowRight) ship.rotate(Direction.Right)
    if(!Controller.ArrowDown && !Controller.ArrowUp) ship.comeToRest()

    if(Controller.w) ship.boost(Direction.Forward)
    if(Controller.s) ship.boost(Direction.Backward)
    if(Controller.a) ship.boost(Direction.Left)
    if(Controller.d) ship.boost(Direction.Right) 
    if(Controller[' '] && !disableShootTimer?.active) {
        ship.shooting = true
        const [shipWidth, shipHeight] = ship.body.getDimensions()
        const bullet1ShipOffset = new Vector(shipWidth/2 - 16, 6)
        const bullet2ShipOffset = new Vector(shipWidth/2 - 16, -6)

        const bullet1 = createBullet(ship, bullet1ShipOffset)
        const bullet2 = createBullet(ship, bullet2ShipOffset)

        bulletManager.add(bullet1)
        bulletManager.add(bullet2)
    } else { ship.shooting = false}
}

function respawnController(player: number, gameEntities: GameEntities){
    if(Controller[' ']) {
        gameEntities.removeLife(player)

        gameEntities.addShip(player, new Vector(220, 220))

        const disableShootTimer = gameEntities.addDisableShootTimer(player)
        const invincibleTimer = gameEntities.addInvincibleTimer(player)
        const flashTimer = gameEntities.addFlashTimer(player)
        
        disableShootTimer.activate()
        invincibleTimer.activate()
        flashTimer.activate()
    }
}

function createBullet(ship, shipPositionOffset) {
    const direction = createDirection(ship.body.rotation)

    const rotatedPosition = rotatePoint(shipPositionOffset, ship.body.rotation)
    const bulletPosition = rotatedPosition.addVector(ship.body.position)

    return new Bullet ({
        position: bulletPosition,
        dimensions: new Vector(3, 3),
        speed: 20,
        direction: direction
    })
}
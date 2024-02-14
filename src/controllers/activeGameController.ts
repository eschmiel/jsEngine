import { Direction, ControllerButton, ControllerAxis } from '../constants.js'
import { Bullet } from '../entities/bullets/bullet.js'
import { BulletManager } from '../entities/bullets/bulletManager.js'
import GameEntities from '../entities/gameEntities.js'
import Ship from '../entities/ship/ship.js'
import { rotatePoint } from '../services/math/transformations.js'
import { Vector, createDirection } from '../services/math/vector.js'
import { Controller, GamepadController, GamepadState } from './controller.js'

export function activeGameController(gameEntities: GameEntities, controllerSystem: GamepadController) {
    gameEntities.players.forEach((active, playerIndex) => {
        if(!active) return
        const { 
            ship, 
            bulletManager, 
            lives, 
            respawnDelayTimer, 
            disableShootTimer, 
            playerController
        } = gameEntities.getPlayerEntities(playerIndex)

        const gamepadState = controllerSystem.gamepadStates[playerController]
        console.log(gamepadState.axes)
        if(ship) {
            shipController(gamepadState, ship, bulletManager, disableShootTimer)
        } else if(lives && !respawnDelayTimer?.active) {
            respawnController(gamepadState, playerIndex, gameEntities)
        }
    })
}

function shipController(gamepadState: GamepadState, ship: Ship, bulletManager: BulletManager, disableShootTimer) {    
    const {pressedButtons, axes} = gamepadState

    const lStickX = axes[ControllerAxis.LStickX]
    const lStickY = axes[ControllerAxis.LStickY]
    const rStickX = axes[ControllerAxis.RStickX]
    const rStickY = axes[ControllerAxis.RStickY]

    if(pressedButtons.includes(ControllerButton.LTrigger)) ship.accelerate()
    if(pressedButtons.includes(ControllerButton.LBumper)) ship.reverse()
    if(lStickX < -0.05) ship.rotate(Direction.Left, lStickX)
    if(lStickX > 0.05) ship.rotate(Direction.Right, lStickX)
    if(
        !pressedButtons.includes(ControllerButton.LBumper)
        && !pressedButtons.includes(ControllerButton.LTrigger)
    ) {ship.comeToRest()}

    if(rStickY > 0.5) ship.boost(Direction.Backward)
    if(rStickY < -0.5) ship.boost(Direction.Forward)
    if(rStickX < -0.5) ship.boost(Direction.Left)
    if(rStickX > 0.5) ship.boost(Direction.Right) 
    if(pressedButtons.includes(ControllerButton.RTrigger) && !disableShootTimer?.active) {
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

function respawnController(gamepadState: GamepadState, player: number, gameEntities: GameEntities){
    if(gamepadState.pressedButtons.includes(ControllerButton.RTrigger)) {
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
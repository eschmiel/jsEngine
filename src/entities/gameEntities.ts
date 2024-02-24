import { activeGameConfig } from "../gameStates/activeGame/activeGameConfig.js"
import { Vector } from "../../schmielJS/math/vector.js"
import { Timer } from "../../schmielJS/timer.js"
import { BulletManager } from "./bullets/bulletManager.js"
import Ship from "./ship/ship.js"

export default class GameEntities {
    players: boolean[]
    ships: Ship[]
    bulletManagers: BulletManager[]
    lives: number[]
    respawnTimers: Timer[]
    respawnDelayTimers: Timer[]
    disableShootTimers: Timer[]
    invincibleTimers: Timer[]
    flashTimers: Timer[]
    playerControllers: number[]

    constructor() {
        this.players = []
        this.ships = []
        this.bulletManagers = []
        this.lives = []
        // this.respawnTimers = []
        this.respawnDelayTimers = []
        this.disableShootTimers = []
        this.invincibleTimers = []
        this.flashTimers = []
        this.playerControllers = []
    }

    addShip(player: number, position: Vector) {
        this.ships[player] = new Ship(position)
    }

    addBulletManager(player: number) {
        this.bulletManagers[player] = new BulletManager()
    }

    addPlayer(player: number){
        this.players[player] = true
    }

    addRespawnDelayTimer(player: number) {
        const newTimer = new Timer(activeGameConfig.respawnDelay)
        this.respawnDelayTimers[player] = newTimer
        return newTimer
    }

    addDisableShootTimer(player: number) {
        const newTimer = new Timer(activeGameConfig.disableShootOnRespawnTime)
        this.disableShootTimers[player] = newTimer
        return newTimer
    }

    addInvincibleTimer(player: number) {
        const newTimer = new Timer(activeGameConfig.invincibleOnSpawnTime)
        this.invincibleTimers[player] = newTimer
        return newTimer
    }

    addFlashTimer(player: number) {
        const newTimer = new Timer(activeGameConfig.invincibleFlashTime)
        this.flashTimers[player] = newTimer
        return newTimer
    }

    removePlayer(player:number){
        this.players[player] = false
        this.ships[player] =  null
        this.bulletManagers[player] =  null
        this.lives[player] =  null
        // this.respawnTimers[player] =  null
        this.respawnDelayTimers[player] = null
        this.disableShootTimers[player] = null
        this.invincibleTimers[player] = null
        this.flashTimers[player] = null
    }

    removeShip(player: number) {
        this.ships[player] = null
    }

    removeLife(player: number) {
        this.lives[player]--
    }

    getPlayerEntities(player:number){
        return {
            ship: this.ships[player],
            bulletManager: this.bulletManagers[player],
            lives: this.lives[player],
            // respawnTimer: this.respawnTimers[player],
            respawnDelayTimer: this.respawnDelayTimers[player],
            disableShootTimer: this.disableShootTimers[player],
            invincibleTimer: this.invincibleTimers[player],
            flashTimer: this.flashTimers[player],
            playerController: this.playerControllers[player]
        }
    }
}

export enum Timers {
    RespawnDelay = 'respawnDelayTimers',
    DisableShoot = 'disableShootTimers',
    Invincible = 'invincibleTimers'
}
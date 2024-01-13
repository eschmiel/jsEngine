import { activeGameConfig } from "../activeGameConfig.js"
import { Vector } from "../services/math/vector.js"
import { Timer } from "../services/timer.js"
import { BulletManager } from "./bullets/bulletManager.js"
import Ship from "./ship/ship.js"

export default class GameEntities {
    players: boolean[]
    ships: Ship[]
    bulletManagers: BulletManager[]
    lives: number[]
    respawnTimers: Timer[]
    respawnDelayTimers: Timer[]

    constructor() {
        this.players = []
        this.ships = []
        this.bulletManagers = []
        this.lives = []
        this.respawnTimers = []
        this.respawnDelayTimers = []
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

    removePlayer(player:number){
        this.players[player] = false
        this.ships[player] =  null
        this.bulletManagers[player] =  null
        this.lives[player] =  null
        this.respawnTimers[player] =  null
    }

    removeShip(player: number) {
        this.ships[player] = null
    }

    removeLife(player: number) {
        this.lives[player]--
    }

    removeRespawnDelayTimer(player: number) {
        this.respawnDelayTimers[player] = null
    }

    getPlayerEntities(player:number){
        return {
            ship: this.ships[player],
            bulletManager: this.bulletManagers[player],
            lives: this.lives[player],
            respawnTimer: this.respawnTimers[player],
            respawnDelayTimer: this.respawnDelayTimers[player]
        }
    }
}
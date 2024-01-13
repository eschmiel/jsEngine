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

    constructor() {
        this.players = []
        this.ships = []
        this.bulletManagers = []
        this.lives = []
        this.respawnTimers = []
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

    getPlayerEntities(player:number){
        return {
            ship: this.ships[player],
            bulletManager: this.bulletManagers[player],
            lives: this.lives[player],
            respawnTimer: this.respawnTimers[player]
        }
    }
}
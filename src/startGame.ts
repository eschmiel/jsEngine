import { BulletManager } from "./entities/bullets/bulletManager.js";
import GameEntities from "./entities/gameEntities.js";
import Ship from "./entities/ship/ship.js";
import { Vector } from "../schmielJS/math/vector.js";
import { activeGameConfig } from "./gameStates/activeGame/activeGameConfig.js";

export function startGame(gameEntities: GameEntities){
    gameEntities.addPlayer(0)
    gameEntities.addPlayer(2)
    const {players, ships, bulletManagers, lives, playerControllers} = gameEntities
    
    players.forEach((active, playerIndex) => {
        if(!active) return

        ships[playerIndex] = new Ship(new Vector(Math.floor(Math.random() * 1400) +50, Math.floor(Math.random() * 600) + 50))
        bulletManagers[playerIndex] = new BulletManager()
        lives[playerIndex] = activeGameConfig.lives
        playerControllers[playerIndex] = playerIndex
    })
}
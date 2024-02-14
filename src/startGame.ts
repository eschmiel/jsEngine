import { BulletManager } from "./entities/bullets/bulletManager.js";
import GameEntities from "./entities/gameEntities.js";
import Ship from "./entities/ship/ship.js";
import { GameStateEnum } from "./constants.js";
import { Vector } from "./services/math/vector.js";
import { activeGameConfig } from "./activeGameConfig.js";

export function startGame(gameEntities: GameEntities, gameState:GameStateEnum){
    gameEntities.addPlayer(0)
    gameEntities.addPlayer(2)
    const {players, ships, bulletManagers, lives, playerControllers} = gameEntities
    gameState = GameStateEnum.activeGame
    
    players.forEach((active, playerIndex) => {
        if(!active) return

        ships[playerIndex] = new Ship(new Vector(30 + 30 * playerIndex, 30 + 30 * playerIndex))
        bulletManagers[playerIndex] = new BulletManager()
        lives[playerIndex] = activeGameConfig.lives
        playerControllers[playerIndex] = playerIndex
    })
}
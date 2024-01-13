import { BulletManager } from "./entities/bullets/bulletManager.js";
import Ship from "./entities/ship/ship.js";
import { GameStateEnum } from "./constants.js";
import { Vector } from "./services/math/vector.js";
import { Timer } from "./services/timer.js";
export function startGame(gameEntities, gameState) {
    gameEntities.addPlayer(0);
    var players = gameEntities.players, ships = gameEntities.ships, bulletManagers = gameEntities.bulletManagers, lives = gameEntities.lives, respawnTimers = gameEntities.respawnTimers;
    gameState = GameStateEnum.activeGame;
    players.forEach(function (active, playerIndex) {
        if (!active)
            return;
        ships[playerIndex] = new Ship(new Vector(30 + 30 * playerIndex, 30 + 30 * playerIndex));
        bulletManagers[playerIndex] = new BulletManager();
        lives[playerIndex] = 5;
        respawnTimers[playerIndex] = new Timer(60);
    });
}
//# sourceMappingURL=startGame.js.map
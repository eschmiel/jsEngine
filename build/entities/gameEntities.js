import { BulletManager } from "./bullets/bulletManager.js";
import Ship from "./ship/ship.js";
var GameEntities = /** @class */ (function () {
    function GameEntities() {
        this.players = [];
        this.ships = [];
        this.bulletManagers = [];
        this.lives = [];
        this.respawnTimers = [];
    }
    GameEntities.prototype.addShip = function (player, position) {
        this.ships[player] = new Ship(position);
    };
    GameEntities.prototype.addBulletManager = function (player) {
        this.bulletManagers[player] = new BulletManager();
    };
    GameEntities.prototype.addPlayer = function (player) {
        this.players[player] = true;
    };
    GameEntities.prototype.removePlayer = function (player) {
        this.players[player] = false;
        this.ships[player] = null;
        this.bulletManagers[player] = null;
        this.lives[player] = null;
        this.respawnTimers[player] = null;
    };
    GameEntities.prototype.removeShip = function (player) {
        this.ships[player] = null;
    };
    GameEntities.prototype.removeLife = function (player) {
        this.lives[player]--;
    };
    GameEntities.prototype.getPlayerEntities = function (player) {
        return {
            ship: this.ships[player],
            bulletManager: this.bulletManagers[player],
            lives: this.lives[player],
            respawnTimer: this.respawnTimers[player]
        };
    };
    return GameEntities;
}());
export default GameEntities;
//# sourceMappingURL=gameEntities.js.map
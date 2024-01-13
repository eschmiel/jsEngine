// export default class GameState {
//     player: Player
//     enemyBullets: BulletManager
//     timeTracker: TimeTracker
//     state: GameStateEnum
//     constructor() {
//         this.player = new Player(1)
//         this.player.createShip(new Vector(200, 400))
//         this.enemyBullets = new BulletManager()
//         this.timeTracker = new TimeTracker()
//         this.state = GameStateEnum.activeGame
//     }
// }
export var GameStateEnum;
(function (GameStateEnum) {
    GameStateEnum["startGame"] = "start game";
    GameStateEnum["activeGame"] = "active game";
})(GameStateEnum || (GameStateEnum = {}));
//# sourceMappingURL=gameState.js.map
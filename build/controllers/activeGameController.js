import { Direction } from '../constants.js';
import { Bullet } from '../entities/bullets/bullet.js';
import { rotatePoint } from '../services/math/transformations.js';
import { Vector, createDirection } from '../services/math/vector.js';
import Controller from './controller.js';
export function activeGameController(gameEntities) {
    gameEntities.players.forEach(function (active, playerIndex) {
        if (!active)
            return;
        handlePlayerInput(gameEntities, playerIndex);
    });
}
function handlePlayerInput(gameEntities, player) {
    var ship = gameEntities.ships[player];
    var bulletManager = gameEntities.bulletManagers[player];
    if (!ship)
        return;
    if (Controller.ArrowUp)
        ship.accelerate();
    if (Controller.ArrowDown)
        ship.reverse();
    if (Controller.ArrowLeft)
        ship.rotate(Direction.Left);
    if (Controller.ArrowRight)
        ship.rotate(Direction.Right);
    if (!Controller.ArrowDown && !Controller.ArrowUp)
        ship.comeToRest();
    if (Controller.w)
        ship.boost(Direction.Forward);
    if (Controller.s)
        ship.boost(Direction.Backward);
    if (Controller.a)
        ship.boost(Direction.Left);
    if (Controller.d)
        ship.boost(Direction.Right);
    if (Controller[' ']) {
        var _a = ship.body.getDimensions(), shipWidth = _a[0], shipHeight = _a[1];
        var bullet1ShipOffset = new Vector(shipWidth / 2 - 16, 6);
        var bullet2ShipOffset = new Vector(shipWidth / 2 - 16, -6);
        var bullet1 = createBullet(ship, bullet1ShipOffset);
        var bullet2 = createBullet(ship, bullet2ShipOffset);
        bulletManager.add(bullet1);
        bulletManager.add(bullet2);
    }
}
function createBullet(ship, shipPositionOffset) {
    var direction = createDirection(ship.body.rotation);
    var rotatedPosition = rotatePoint(shipPositionOffset, ship.body.rotation);
    var bulletPosition = rotatedPosition.addVector(ship.body.position);
    return new Bullet({
        position: bulletPosition,
        dimensions: new Vector(3, 3),
        speed: 20,
        direction: direction
    });
}
//# sourceMappingURL=activeGameController.js.map
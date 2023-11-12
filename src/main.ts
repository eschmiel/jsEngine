import Ship from "./entities/ship.js"
import update from './update.js'
import draw from './draw.js'
import canvas from "./services/canvas.js"
import EntityManager, {Entity} from "./entities/entityManager.js"
import { Bullet, BulletManager } from "./entities/bullet.js"
import { colliding } from "./services/collisions.js"
import { Vector } from "./services/vector.js"
import { TriangleExplosion} from './services/particles.js'

(() => {
  const entityManager = new EntityManager([new Ship(20,40)])
  const enemyBullets = new BulletManager()
  enemyBullets.bullets[0] = new Bullet(400, 400, 10)

  function game(time = null) {
      window.requestAnimationFrame(game)
      
      update([entityManager, enemyBullets])
      draw([entityManager, enemyBullets])
  }

  game()
})()

function initialize() {
  const ship = new Ship(20, 40)

  return ship
}
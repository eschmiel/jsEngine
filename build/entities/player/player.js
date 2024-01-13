// import { Vector } from "../../services/math/vector.js"
// import { BulletManager } from "../bullets/bulletManager.js"
// import Ship, { CreateShipOptions } from "../ship/ship.js"
// import { Respawner } from "../../services/respawner.js"
// export class Player {
//     id: number
//     lives: number
//     ship?: Ship
//     bulletManager?: BulletManager
//     respawning: boolean
//     respawner: Respawner
//     constructor(id: number) {
//         this.id = id
//         this.lives = 5
//         this.respawning = false
//         this.respawner = new Respawner(60)
//     }
//     createShip(position: Vector, options?: CreateShipOptions) {
//         const [x, y] = position.values
//         this.bulletManager = new BulletManager()
//         this.ship = new Ship(new Vector(x, y), options)
//     }
//     update(){
//         this.ship?.update()
//         this.bulletManager?.update()
//         this.respawner.update()
//         if(!this.ship.alive && !this.respawning){
//             this.loseALife()
//         }
//         if(this.respawning && !this.respawner.active){
//             this.createShip(new Vector(200, 400), {respawn: true})
//         }
//     }
//     loseALife(){
//         this.lives--
//         if(this.lives>0) {
//             this.respawning = true
//             this.respawner.activate()
//         }
//         this.ship = null
//     }
//             // case BulletEvents.hit:
//             //     if(isBullet(eventData)) this.bulletManager.remove(eventData)
//             //     break
// }
//# sourceMappingURL=player.js.map
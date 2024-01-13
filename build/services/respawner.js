// import { Observable, Observer } from "./observable.js"
// export class Respawner {
//     timeBetweenRespawns: number
//     respawnCountDown: number
//     active: boolean
//     observable: Observable
//     constructor(timeBetweenRespawns) {
//         this.timeBetweenRespawns = timeBetweenRespawns
//         this.respawnCountDown = 0
//         this.active = false
//         this.observable = new Observable()
//     }
//     activate() {
//         if(!this.active) {
//             this.respawnCountDown = this.timeBetweenRespawns
//             this.active = true
//         }
//     }
//     update() {
//         if(this.active){
//             this.respawnCountDown--
//             if(this.respawnCountDown <= 0) {
//                 this.active = false
//                 this.observable.notify(RespawnerEvents.respawn)
//             }
//         }
//     }
//     addObserver(observer: Observer) {
//         this.observable.add(observer)
//     }
// }
// // Types and Enums
// export enum RespawnerEvents {
//     respawn = 'respawn'
// }
//# sourceMappingURL=respawner.js.map
// import { Renderer } from "../../services/rendering/render.js";
// import { rotatePoint } from "../../services/math/transformations.js";
// import { Vector } from "../../services/math/vector.js";
// import Ship, { ShipEvents } from "./ship.js";
// import { Timer, TimerEvents } from "../../services/timer.js";
// export class ShipRenderer {
//     renderer: Renderer
//     ship: Ship
//     flashTimer: Timer
//     visible: boolean
//     constructor(renderer: Renderer, ship: Ship) {
//         this.renderer = renderer
//         this.visible = true
//         this.ship = ship
//         this.ship.addObserver(this)
//         this.flashTimer = new Timer(7, TimerEvents.Done)
//         this.flashTimer.addObserver(this)
//         if(this.ship.respawning) this.flashTimer.activate()
//     }
//     onNotify(eventType) {
//         switch(eventType) {
//             case TimerEvents.Done:
//                 this.visible = !this.visible
//                 this.flashTimer.activate()
//                 break;
//             case ShipEvents.doneSpawning:
//                 this.visible = true
//                 this.flashTimer.deactivate()
//                 break
//             default:
//         }
//     }
//     run(){
//         this.flashTimer.update()
//         if(this.ship.alive && this.visible) {
//             const trianglePoints = this.getTrianglePoints()
//             this.renderer.renderFillTriangle(trianglePoints)
//         }
//     }
//     getTrianglePoints() {
//         const [width, height] = this.ship.body.getDimensions()
//         const {rotation, position} = this.ship.body
//         const pointsFromPointOfRotation = [
//             new Vector(-width/2, height/2),
//             new Vector(width/2, 0),
//             new Vector(-width/2, -height/2)
//         ]
//         const rotatedPoints = pointsFromPointOfRotation.map((point) => rotatePoint(point, rotation))
//         const pointsOffsetFromShipPosition = rotatedPoints.map((point) => point.addVector(position))
//         return pointsOffsetFromShipPosition
//     }
// }
//# sourceMappingURL=shipRenderer.js.map
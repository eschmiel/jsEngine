import { Accelerator, AcceleratorDirection } from "../../services/accelerator.js"
import { Vector, createDirection } from "../../services/vector.js"
import { EntityBody } from "../entityBody"

type Boostable = {
    body: EntityBody
}

export class Booster {
    active: boolean
    target: Boostable
    coolDownTime: number
    coolDownTimer: number
    boostSpeed: number
    accelerator: Accelerator
    direction: Vector

    constructor(target: Boostable, boostSpeed: number, coolDown: number = 100){
        this.active = false
        this.target = target
        this.coolDownTime = coolDown
        this.coolDownTimer = 0
        this.boostSpeed = boostSpeed
        this.direction = createDirection()
        this.accelerator = new Accelerator(this.boostSpeed, .3)
    }

    activate(angle = 0) {
        if(!this.coolDownTimer) {
            this.active = true
            this.coolDownTimer = this.coolDownTime
            this.accelerator.setDirection(AcceleratorDirection.Forward) 
            this.direction = createDirection(this.target.body.rotation + angle)
        }
    }

    deactivate() {
        this.active = false
        this.accelerator.setDirection(AcceleratorDirection.Stop)
    }
    
    update(){
        const currentSpeed = this.accelerator.run()
        if(this.active && currentSpeed >= this.boostSpeed) this.deactivate()
        if(this.coolDownTimer > 0) this.coolDownTimer -= 1
        if(currentSpeed) this.moveTarget(currentSpeed)
    }

    moveTarget(currentSpeed) {
        const distanceInDirection = this.direction.multiplyByScalar(currentSpeed)
        this.target.body.position = this.target.body.position.addVector(distanceInDirection) 
    }
}
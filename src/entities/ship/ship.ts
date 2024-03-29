import { Vector } from '../../services/math/vector.js';
import { CollisionBox } from '../../services/collisions/collisionBox.js';
import { EntityBody } from '../entityBody.js';
import { Accelerator, AcceleratorDirection } from '../../services/lerpers/accelerator.js';
import { Booster } from './booster.js';
import { Direction } from '../../constants.js';
import { activeGameConfig } from '../../activeGameConfig.js';

// Vector tutorial
// https://www.gamedev.net/tutorials/programming/math-and-physics/vector-maths-for-game-dev-beginners-r5442/

export default class Ship {
    body: EntityBody;
    accelerator: Accelerator;
    booster: Booster;
    collisionBox: CollisionBox
    visible: boolean
    shooting: boolean

    constructor(position: Vector) {
        
        const dimensions = new Vector(28, 25)

        const entityBodyOptions = {
            position:position.copy(),
            dimensions: dimensions.copy()
        }
        this.body = new EntityBody(entityBodyOptions)
        this.accelerator = new Accelerator(0, activeGameConfig.shipMaxSpeed, activeGameConfig.shipAccelerationRate)
        this.booster = new Booster(this, 30, 100) 
        this.visible = true

        this.collisionBox = new CollisionBox(new Vector(0,0), dimensions.copy(), this.body)
    }

    update() {
        this.body.update()
        this.booster.update()
        let newSpeed = this.accelerator.run()
        if(this.shooting && Math.abs(newSpeed) > Math.abs(activeGameConfig.shipMaxSpeedWhileShooting)) {
            newSpeed = activeGameConfig.shipMaxSpeedWhileShooting * Math.sign(newSpeed) 
        }
        this.body.speed = newSpeed
    }

    rotate(direction: Direction, stickPercent) {
        if(direction !== Direction.Left && direction !== Direction.Right) return
        let rotation = this.shooting ? activeGameConfig.rotateWhileShootingSpeed : activeGameConfig.normalRotateSpeed
        rotation = rotation * stickPercent
        // if(direction === Direction.Left) rotation *= -1
        this.body.adjustRotation(rotation)
    }

    accelerate(){
        this.accelerator.setDirection(AcceleratorDirection.Forward)
    }

    reverse(){
        this.accelerator.setDirection(AcceleratorDirection.Backward)
    }

    comeToRest(){
        this.accelerator.setDirection(AcceleratorDirection.Stop)
    }

    boost(direction:Direction){
        switch(direction){
            case Direction.Forward:
                this.booster.activate()
                break;
            case Direction.Backward:
                this.booster.activate(180)
                break;
            case Direction.Left: 
                this.booster.activate(270)
                break;
            case Direction.Right: 
                this.booster.activate(90)
                break;
            default:
                throw new Error(`ship.boost(direction) failed - no acceptable direction parameter was provided. direction: ${direction}`)
        }
    }
}
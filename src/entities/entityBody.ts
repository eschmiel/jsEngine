import { Vector, createDirection } from '../services/math/vector.js'

export class EntityBody {
    position: Vector;
    dimensions: Vector;
    rotation: number;
    rotationSpeed: number;
    speed: number;

    constructor(options: EntityBodyOptions = defaultEntityBodyOptions) {
        const { position, dimensions, rotation, rotationSpeed, speed } = options

        this.position = position?.copy() ?? defaultEntityBodyOptions.position.copy() 
        this.dimensions = dimensions?.copy() ?? defaultEntityBodyOptions.dimensions.copy() 
        this.rotation = rotation ?? defaultEntityBodyOptions.rotation
        this.rotationSpeed = rotationSpeed ?? defaultEntityBodyOptions.rotationSpeed
        this.speed = speed ?? defaultEntityBodyOptions.speed
    }

    getPosition() { return this.position.values.map((value) => value) }
    getDimensions() { return this.dimensions.values.map((value) => value) }
    
    getCenterPosition() {
        const [x, y] = this.position.values
        const [width, height] = this.dimensions.values
        
        const centerX = x + width/2
        const centerY = y + height/2

        return [centerX, centerY]
    }

    getCenterPositionVector() {
        return new Vector(...this.getCenterPosition())
    }
    
    getEndPosition() { 
        const [x, y] = this.position.values
        const [width, height] = this.dimensions.values
        
        const endX = x + width
        const endY = y + height

        return [endX, endY]
    }

    getEndPositionVector() {
        return new Vector(...this.getEndPosition())
    }

    adjustRotation(change) {
        this.rotation += change

        if(this.rotation > 0) this.rotation += 360
        if(this.rotation > 360) this.rotation -= 360
    }

    moveOld() {
        const direction = createDirection(this.rotation)
        const distanceInDirection = direction.multiplyByScalar(this.speed)
        this.position = this.position.addVector(distanceInDirection) 
    }

    rotate() {
        this.rotation += this.rotationSpeed
    }

    move(velocity: Vector) {
        this.position = this.position.addVector(velocity)
    }

    update() {
        this.rotate()
        this.moveOld()
    }

    copy() {
        const copyBodyOptions = {
            position: this.position.copy(),
            dimensions: this.dimensions.copy(),
            rotation: this.rotation,
            rotationSpeed: this.rotationSpeed,
            speed: this.speed
        }

        return new EntityBody(copyBodyOptions)
    }
}



// Types and defaults



export type EntityBodyOptions = {
    position?: Vector,
    dimensions?: Vector,
    rotation?: number,
    rotationSpeed?: number,
    speed?: number    
}

const defaultEntityBodyOptions = {
    position: new Vector(0,0),
    dimensions: new Vector(10, 10),
    rotation: 0,
    rotationSpeed: 0,
    speed: 0    
}
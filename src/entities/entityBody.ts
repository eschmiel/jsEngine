import { Vector, createDirection } from '../services/vector.js'

export class EntityBody {
    position: Vector;
    dimensions: Vector;
    rotation: number;
    rotationSpeed: number;
    speed: number;

    constructor(position: Vector = new Vector(0,0), dimensions: Vector = new Vector(0,0)) {
        this.position = position.copy()
        this.dimensions = dimensions.copy()
        this.rotation = 0
        this.rotationSpeed = 0
        this.speed = 0
        
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

    move() {
        const direction = createDirection(this.rotation)
        const distanceInDirection = direction.multiplyByScalar(this.speed)
        this.position = this.position.addVector(distanceInDirection) 
    }

    rotate() {
        this.rotation += this.rotationSpeed
    }

    update() {
        this.rotate()
        this.move()
    }
}
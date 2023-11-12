import { Entity, NullEntity } from "../entities/entityManager.js";
import { Vector } from "./vector.js";
import canvas from "./canvas.js";

export class CollisionBox implements Entity{
    position: Vector
    offsetPosition: Vector
    dimensions: Vector
    centerPosition: Vector
    rotation: number;
    entity: Entity;

    constructor(offsetPosition: Vector, dimensions: Vector, entity: Entity = new NullEntity()) {
        this.offsetPosition = structuredClone(offsetPosition)
        this.dimensions = structuredClone(dimensions)
        this.entity = entity
    }

    getPosition() {
        const [offsetX, offsetY] = this.offsetPosition.values
        const [entityX, entityY] = this.entity.position.values

        return new Vector(entityX + offsetX, entityY + offsetY)
    }

    getCenterPosition() {
        const [x, y] = this.getPosition().values
        const [width, height] = this.dimensions.values

        const centerX = x + width / 2
        const centerY = y + height / 2
        
        return new Vector(centerX, centerY)
    }

    update() {
        this.onCollision(this.entity)
    }

    draw() {
        canvas.save()
        canvas.rotate2(this.entity.rotation, this.getCenterPosition())
        canvas.drawRectangle(this.getPosition(), this.dimensions, 'red')
        canvas.restore()
    }

    onCollision(entity:Entity) {}
}

export const colliding = (box1: CollisionBox, box2: CollisionBox) => {
    const [startX1, startY1] = box1.getPosition().values
    const [box1Width, box1Height] = box1.dimensions.values
    const endX1 = startX1 + box1Width
    const endY1 = startY1 + box1Height

    const [startX2, startY2] = box2.getPosition().values
    const [box2Width, box2Height] = box2.dimensions.values
    const endX2 = startX2 + box2Width
    const endY2 = startY2 + box2Height

    return (
        startX1 < endX2
        && endX1 > startX2 
        && startY1 < endY2 
        && endY1 > startY2
    )
    
}
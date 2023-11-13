import { Vector } from "../vector.js";
import canvas from "../canvas.js";
import { EntityBody } from "../../entities/entityBody.js";

export class CollisionBox {
    position: Vector
    offsetPosition: Vector
    dimensions: Vector
    centerPosition: Vector
    rotation: number;
    entity: EntityBody;

    constructor(offsetPosition: Vector, dimensions: Vector, entity: EntityBody = new EntityBody()) {
        this.offsetPosition = offsetPosition.copy()
        this.dimensions = dimensions.copy()
        this.entity = entity
    }

    getPosition() {
        const [offsetX, offsetY] = this.offsetPosition.values
        const [entityX, entityY] = this.entity.getPosition()

        return new Vector(entityX + offsetX, entityY + offsetY)
    }

    getCenterPosition() {
        const [x, y] = this.getPosition().values
        const [width, height] = this.dimensions.values

        const centerX = x + width / 2
        const centerY = y + height / 2
        
        return new Vector(centerX, centerY)
    }

    draw() {
        canvas.save()
        canvas.rotate(this.entity.rotation, this.getCenterPosition())
        canvas.drawRectangle(this.getPosition(), this.dimensions, 'red')
        canvas.restore()
    }

    onCollision(entity:EntityBody) {}
}
import { Vector } from "../math/vector.js";
import { EntityBody } from "../entityBody.js";

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

    onCollision(entity:EntityBody) {}
}
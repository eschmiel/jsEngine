import { CollisionBox } from "../services/collisions/collisionBox.js";
import { Vector } from "../services/vector.js";

export interface Entity {
    position: Vector,
    dimensions: Vector,
    rotation: number,
    update: () => void;
    draw: () => void;
    collisionBox?: CollisionBox
}

export class NullEntity implements Entity {
    position: Vector;
    dimensions: Vector;
    rotation: number;
    collisionBox: CollisionBox;

    constructor() {
        this.position = new Vector(0, 0)
        this.dimensions = new Vector(0,0)
        this.rotation = 0
    }

    update() {}
    draw() {}
}

export default class EntityManager {
    entities: Entity[]

    constructor(entities: Entity[] = []) {
        this.entities = entities.map((entity) => entity)
    }

    add(entity: Entity) {
        this.entities.push(entity)
    }

    remove(entity: Entity) {
        const entityIndex = this.entities.findIndex((existingEntity) => existingEntity === entity)
        this.entities.splice(entityIndex, 1)
    }

    update() {
        this.entities.forEach((entity) => entity.update())
    }

    draw() {
        this.entities.forEach((entity) => entity.draw())
    }
}
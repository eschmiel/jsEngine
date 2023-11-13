import { EntityBody } from "../../entities/entityBody.js";
import { Vector } from "../vector.js";
import { Accelerator } from "../accelerator.js";
import { ParticleTypes } from "./particles";
import { EntityBodyTriangleDrawTypes, drawEntityBodyTriangle } from "../../entities/drawEntityBody.js";

export class Particle {
    direction: Vector
    accelerator: Accelerator;
    body: EntityBody

    constructor(position: Vector, dimensions: Vector, direction: Vector, maxspeed: number, accelerationRate: number,) {
        this.body = new EntityBody(position.copy(), dimensions.copy())
        this.direction = direction.copy()
        this.accelerator = new Accelerator(0, .01)
    }

    update() {
        this.body.update()
    }

    draw() {
        drawEntityBodyTriangle(this.body, EntityBodyTriangleDrawTypes.Stroke)
    }
}
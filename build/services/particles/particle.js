import { EntityBody } from "../../entities/entityBody.js";
import { Accelerator } from "../accelerator.js";
import { EntityBodyTriangleDrawTypes, drawEntityBodyTriangle } from "../../entities/drawEntityBody.js";
var Particle = /** @class */ (function () {
    function Particle(position, dimensions, direction, maxspeed, accelerationRate) {
        this.body = new EntityBody(position.copy(), dimensions.copy());
        this.direction = direction.copy();
        this.accelerator = new Accelerator(0, .01);
    }
    Particle.prototype.update = function () {
        this.body.update();
    };
    Particle.prototype.draw = function () {
        drawEntityBodyTriangle(this.body, EntityBodyTriangleDrawTypes.Stroke);
    };
    return Particle;
}());
//# sourceMappingURL=particle.js.map
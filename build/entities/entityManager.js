import { Vector } from "../services/vector.js";
var NullEntity = /** @class */ (function () {
    function NullEntity() {
        this.position = new Vector(0, 0);
        this.dimensions = new Vector(0, 0);
        this.rotation = 0;
    }
    NullEntity.prototype.update = function () { };
    NullEntity.prototype.draw = function () { };
    return NullEntity;
}());
export { NullEntity };
var EntityManager = /** @class */ (function () {
    function EntityManager(entities) {
        if (entities === void 0) { entities = []; }
        this.entities = entities.map(function (entity) { return entity; });
    }
    EntityManager.prototype.add = function (entity) {
        this.entities.push(entity);
    };
    EntityManager.prototype.remove = function (entity) {
        var entityIndex = this.entities.findIndex(function (existingEntity) { return existingEntity === entity; });
        this.entities.splice(entityIndex, 1);
    };
    EntityManager.prototype.update = function () {
        this.entities.forEach(function (entity) { return entity.update(); });
    };
    EntityManager.prototype.draw = function () {
        this.entities.forEach(function (entity) { return entity.draw(); });
    };
    return EntityManager;
}());
export default EntityManager;
//# sourceMappingURL=entityManager.js.map
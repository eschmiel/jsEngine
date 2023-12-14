import { Observable } from "./observable.js";
var Respawner = /** @class */ (function () {
    function Respawner(timeBetweenRespawns) {
        this.timeBetweenRespawns = timeBetweenRespawns;
        this.respawnCountDown = 0;
        this.active = false;
        this.observable = new Observable();
    }
    Respawner.prototype.activate = function () {
        if (!this.active) {
            this.respawnCountDown = this.timeBetweenRespawns;
            this.active = true;
        }
    };
    Respawner.prototype.update = function () {
        if (this.active) {
            this.respawnCountDown--;
            if (this.respawnCountDown <= 0) {
                this.active = false;
                this.observable.notify(RespawnerEvents.respawn);
            }
        }
    };
    Respawner.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return Respawner;
}());
export { Respawner };
// Types and Enums
export var RespawnerEvents;
(function (RespawnerEvents) {
    RespawnerEvents["respawn"] = "respawn";
})(RespawnerEvents || (RespawnerEvents = {}));
//# sourceMappingURL=respawner.js.map
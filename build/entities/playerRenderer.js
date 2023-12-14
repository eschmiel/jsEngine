import { Observable } from "../services/observable.js";
import { ParticleEffectsManagerEvents } from "../services/particles/particleEffectsManager.js";
import { RespawnerEvents } from "../services/respawner.js";
import { BulletEvents } from "./bullets/bullet.js";
import { BulletRenderer } from "./bullets/bulletRenderer.js";
import { ShipEvents } from "./ship/ship.js";
import { ShipRenderer } from "./ship/shipRenderer.js";
var PlayerRenderer = /** @class */ (function () {
    function PlayerRenderer(renderer, particleEffectsManager, player) {
        this.renderer = renderer;
        this.particleEffectsManager = particleEffectsManager;
        this.player = player;
        this.shipRenderer = new ShipRenderer(this.renderer, this.player.ship);
        this.bulletRenderers = [];
        this.observable = new Observable();
        this.player.addObserver(this);
    }
    PlayerRenderer.prototype.run = function () {
        var _a;
        (_a = this.shipRenderer) === null || _a === void 0 ? void 0 : _a.run();
        this.bulletRenderers.forEach(function (renderer) { return renderer.run(); });
    };
    PlayerRenderer.prototype.onNotify = function (event, data) {
        var particleEffectsManagerEvents = Object.values(ParticleEffectsManagerEvents);
        switch (event) {
            case ShipEvents.death:
                this.shipRenderer = null;
                break;
            case RespawnerEvents.respawn:
                this.shipRenderer = new ShipRenderer(this.renderer, this.player.ship);
                break;
            case ShipEvents.shoot:
                if (isBullet(data)) {
                    this.bulletRenderers.push(new BulletRenderer(this.renderer, data));
                }
                break;
            case BulletEvents.hit:
                if (isBullet(data)) {
                    this.bulletRenderers = this.bulletRenderers.filter(function (_a) {
                        var bullet = _a.bullet;
                        return bullet !== data;
                    });
                }
            default:
                if (particleEffectsManagerEvents.includes(event)) {
                    this.observable.notify(event, data);
                }
        }
    };
    PlayerRenderer.prototype.addObserver = function (observer) {
        this.observable.add(observer);
    };
    return PlayerRenderer;
}());
export { PlayerRenderer };
// Types
export function isBullet(input) {
    return input.hit !== undefined;
}
//# sourceMappingURL=playerRenderer.js.map
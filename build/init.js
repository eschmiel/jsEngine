import GameEntities from "./entities/gameEntities.js";
import { GameStateEnum } from "./constants.js";
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js";
import { TimeTracker } from "./services/timeTracker.js";
export function init() {
    return {
        gameEntities: new GameEntities(),
        particleEffectManager: new ParticleEffectsManager(),
        timeTracker: new TimeTracker(),
        gameState: GameStateEnum.activeGame
    };
}
//# sourceMappingURL=init.js.map
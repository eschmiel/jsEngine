import GameEntities from "./entities/gameEntities.js";
import { GameStateEnum } from "./constants.js";
import { ParticleEffectsManager } from "./services/particles/particleEffectsManager.js";
import { TimeTracker } from "./services/timeTracker.js";
import { GamepadController } from "./controllers/controller.js";

export function init() {
    return {
        gameEntities: new GameEntities(),
        particleEffectManager: new ParticleEffectsManager(),
        timeTracker: new TimeTracker(),
        gameState: GameStateEnum.activeGame,
        controllerSystem: new GamepadController()
    }
}
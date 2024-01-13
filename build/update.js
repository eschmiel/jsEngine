import { handleInputs } from "./controllers/handleInputs.js";
import { updateGameEntities } from "./entities/updateEntities.js";
export default (function (gameEntities, particleEffectsManager, gameState) {
    handleInputs(gameEntities, gameState);
    updateGameEntities(gameEntities, particleEffectsManager);
    particleEffectsManager.update();
});
//# sourceMappingURL=update.js.map
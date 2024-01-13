import { GameStateEnum } from "../constants.js";
import { activeGameController } from "./activeGameController.js";
export function handleInputs(gameEntities, gameState) {
    switch (gameState) {
        case GameStateEnum.activeGame:
            activeGameController(gameEntities);
            break;
        default:
    }
}
//# sourceMappingURL=handleInputs.js.map
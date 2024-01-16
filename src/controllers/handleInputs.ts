import GameEntities from "../entities/gameEntities.js";
import { GameStateEnum } from "../constants.js";
import { activeGameController } from "./activeGameController.js";
import { GamepadController } from "./controller.js";

export function handleInputs(gameEntities: GameEntities, gameState: GameStateEnum, controllerSystem: GamepadController) {
    const beep = controllerSystem.getGamepadStates()

    switch (gameState) {
        case GameStateEnum.activeGame: 
            activeGameController(gameEntities, controllerSystem)
            break;
        default:
    }
}
import GameEntities from "../entities/gameEntities.js";
import { GameStateEnum } from "../constants.js";
import { activeGameController } from "./activeGameController.js";

export function handleInputs(gameEntities: GameEntities, gameState: GameStateEnum) {
    switch (gameState) {
        case GameStateEnum.activeGame: 
            activeGameController(gameEntities)
            break;
        default:
    }
}
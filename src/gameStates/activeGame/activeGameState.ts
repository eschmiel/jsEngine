import { activeGameController } from "./activeGameController.js";
import { GamepadState } from "../../../schmielJS/controller.js";
import GameEntities from "../../entities/gameEntities.js";
import { renderEntities } from "../../entities/renderEntities.js";
import { updateGameEntities } from "../../entities/updateEntities.js";
import { ParticleEffectsManager } from "../../../schmielJS/particles/particleEffectsManager.js";
import { Renderer } from "../../../schmielJS/rendering/render.js";
import { startGame } from "../../startGame.js";

export default class ActiveGameState {
    gameEntities: GameEntities
    particleEffectsManager: ParticleEffectsManager

    constructor() {
        this.gameEntities = new GameEntities(),
        this.particleEffectsManager = new ParticleEffectsManager()
        startGame(this.gameEntities)
    }

    update(gamepadStates: GamepadState[]) {
        activeGameController(this.gameEntities, gamepadStates)
        updateGameEntities(this.gameEntities, this.particleEffectsManager)
        this.particleEffectsManager.update()
    }

    draw() {
        const renderer = new Renderer()

        renderer.clearScreen()
        renderEntities(this.gameEntities)
        this.particleEffectsManager.render()
    }
}
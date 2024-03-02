import { activeGameController } from "./activeGameController.js";
import { GamepadState } from "../../../schmielJS/controller.js";
import GameEntities from "../../entities/gameEntities.js";
import { renderEntities } from "../../entities/renderEntities.js";
import { updateGameEntities } from "../../entities/updateEntities.js";
import { ParticleEffectsManager } from "../../../schmielJS/particles/particleEffectsManager.js";
import { Renderer } from "../../../schmielJS/rendering/render.js";
import { startGame } from "../../startGame.js";
import { FONT_WEIGHT, TEXT_ALIGN } from "../../../schmielJS/rendering/renderConstants.js";
import { Vector } from "../../../schmielJS/math/vector.js";

export default class ActiveGameState {
    gameEntities: GameEntities
    particleEffectsManager: ParticleEffectsManager

    constructor() {
        this.gameEntities = new GameEntities(),
        this.particleEffectsManager = new ParticleEffectsManager()
        startGame(this.gameEntities)
        const song = new Audio('../../../public/audio/Skull_Break.wav')
        song.play()
        const intro = new Audio('../../../public/audio/startMatch.wav')
        intro.play()
    }

    update(gamepadStates: GamepadState[]) {
        const newState = activeGameController(this.gameEntities, gamepadStates)
        // if(newState) return newState
        updateGameEntities(this.gameEntities, this.particleEffectsManager)
        this.particleEffectsManager.update()
    }

    draw() {
        const renderer = new Renderer()

        renderer.clearScreen()
        renderEntities(this.gameEntities)
        this.particleEffectsManager.render()
        
        renderer.renderText(`${this.gameEntities.lives[0]}`, new Vector(790, 675), {textAlign: TEXT_ALIGN.CENTER, fontSize: '23px', color: `${this.gameEntities.color[0]}`})
        renderer.renderText(`${this.gameEntities.lives[2]}`, new Vector(810, 675), {textAlign: TEXT_ALIGN.CENTER, fontSize: '23px', color: `${this.gameEntities.color[2]}`})
        if(this.gameEntities.lives[0] <= 0 && !this.gameEntities.ships[0]) {   
            renderer.renderText(`Red Triangle WINS`, new Vector(800, 350), {textAlign: TEXT_ALIGN.CENTER, fontSize: '59px', color: `${this.gameEntities.color[2]}`, fontWeight: FONT_WEIGHT.BOLD})
        }
        if(this.gameEntities.lives[2] <= 0 && !this.gameEntities.ships[2]) {   
            renderer.renderText(`Black Triangle WINS`, new Vector(800, 350), {textAlign: TEXT_ALIGN.CENTER, fontSize: '59px', color: `${this.gameEntities.color[0]}`, fontWeight: FONT_WEIGHT.BOLD})
        }
    }
}
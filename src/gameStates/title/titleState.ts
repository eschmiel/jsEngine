import ActiveGameState from "../activeGame/activeGameState.js";
import { GamepadState } from "../../../schmielJS/controller.js";
import { Vector } from "../../../schmielJS/math/vector.js";
import { Renderer } from "../../../schmielJS/rendering/render.js";
import  Canvas  from '../../../schmielJS/rendering/canvas.js'
import { TEXT_ALIGN } from "../../../schmielJS/rendering/renderConstants.js";
import { ControllerButton } from "../../constants.js";

export default class TitleState {
    image: HTMLImageElement
    constructor() {
        this.image = new Image()
        this.image.src = '../../../public/images/logo light.png'
        
        const intro = new Audio('../../../public/audio/title.wav')
        intro.play()
    }

    update(gamepadStates: GamepadState[]) {
        if(gamepadStates.some((state) => state?.pressedButtons?.includes(ControllerButton.A))) {
            return new ActiveGameState()
        }
    }

    draw() {
        const renderer = new Renderer()
        renderer.clearScreen()

        Canvas.drawImage(this.image, new Vector(300, 40), new Vector(1000, 600))
        renderer.renderText('Press the A Button to Start', new Vector(800, 675), {textAlign: TEXT_ALIGN.CENTER, fontSize: '23px'})
    }
}
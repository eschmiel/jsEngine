import ActiveGameState from "../activeGame/activeGameState.js";
import { GamepadState } from "../../../schmielJS/controller.js";
import { Vector } from "../../../schmielJS/math/vector.js";
import { Renderer } from "../../../schmielJS/rendering/render.js";

export default class TitleState {
    constructor() {}

    update(gamepadStates: GamepadState[]) {
        if(gamepadStates.some((state) => state?.pressedButtons?.length)) {
            return new ActiveGameState()
        }
    }

    draw() {
        const renderer = new Renderer()

        renderer.clearScreen()
        renderer.renderLine(new Vector(29, 49), new Vector(80, 54), 'red')
        renderer.renderText('TRI', new Vector(300, 300))
        renderer.renderText('ANGLE', new Vector(300, 320))
        renderer.renderText('SHOOTER', new Vector(300, 340))
    }
}
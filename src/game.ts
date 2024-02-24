import {  GamepadController, GamepadState } from '../schmielJS/controller.js'

export default class Game {
    state: State
    controllerSystem: GamepadController

    constructor(startingState) {
        this.state = startingState
        this.controllerSystem = new GamepadController()
    }

    update() {
        const gamepadStates = this.controllerSystem.getGamepadStates()
        const newState = this.state.update(gamepadStates)

        if(newState) this.state = newState
    }

    draw() {
        this.state.draw()
    }
}

export type State = {
    update: (gamepadStates: GamepadState[]) => (State | null)
    draw: () => void
}

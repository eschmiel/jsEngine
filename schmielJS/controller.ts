export class KeyboardController {
    ArrowDown: boolean;
    ArrowUp: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    w: boolean;
    s: boolean;
    a: boolean;
    d: boolean;
    ' ': boolean;

    constructor() {
        document.addEventListener("keydown", (event) => this[event.key] = true )
        document.addEventListener("keyup", (event) => this[event.key] = false )
    }
}

export class GamepadController {
    gamepadStates: GamepadState[]

    constructor() { }
    
    getGamepadStates(){
        const gamepadStates: GamepadState[] = []
        const connectedGamepads = navigator.getGamepads()

        connectedGamepads.forEach((gamepad, gamepadID) => {
            gamepadStates[gamepadID] = { 
                id: '',
                pressedButtons: [],
                axes: []
            }

            if(!gamepad) return

            gamepad?.buttons.forEach((button, i) => {
                if(button.pressed) {
                    gamepadStates[gamepadID].pressedButtons.push(i)
                }
            })

            gamepadStates[gamepadID].axes = [...gamepad.axes]
            gamepadStates[gamepadID].id = gamepad.id
        })

        return gamepadStates
    }
}

export type GamepadState = {
    id: string,
    pressedButtons: number[],
    axes: number[]
}
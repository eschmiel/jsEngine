class KeyboardController {
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

export const Controller = new KeyboardController()

export class GamepadController {
    gamepadStates: GamepadState[]

    // constructor() {
    //     this.connectedGamepads = []
    //     const boundGamepadConnectedHandler = this.gamepadConnectedHandler.bind(this)
    //     window.addEventListener('gamepadconnected', boundGamepadConnectedHandler)
    // }

    constructor() {
        this.gamepadStates = []
    }
    
    getGamepadStates(){
        const connectedGamepads = navigator.getGamepads()
        connectedGamepads.forEach((gamepad, gamepadID) => {
            this.gamepadStates[gamepadID] = { 
                pressedButtons: [],
                axes: []
            }

            if(!gamepad) return
            
            gamepad?.buttons.forEach((button, i) => {
                if(button.pressed) {
                    this.gamepadStates[gamepadID].pressedButtons.push(i)
                }
            })

            this.gamepadStates[gamepadID].axes = [...gamepad.axes]
        })
    }

    // gamepadConnectedHandler(event: GamepadEvent) {
    //     this.connectedGamepads.push(event.gamepad)
    // }

    // gamepadUpdateHandler(gamepad) {
    //     const buttonsPressed = []
    //     gamepad?.buttons?.forEach((button, i) => {
    //         if(button?.pressed) {
    //             buttonsPressed.push(button)
    //             // console.log(i)
    //         }
    //     })
    //     return buttonsPressed
    // }

}

export type GamepadState = {
    pressedButtons: number[],
    axes: number[]
}
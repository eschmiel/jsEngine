import { GamepadState } from "../../../schmielJS/controller.js"
import { Vector } from "../../../schmielJS/math/vector.js"
import { Renderer } from "../../../schmielJS/rendering/render.js"
import { ControllerButton } from "../../constants.js"

export default class ReadyState {
    players: Player[]
    maxPlayers: number
    availableColors: PLAYER_COLOR[]

    constructor() {
        this.players = [],
        this.maxPlayers = 4
        this.availableColors = Object.values(PLAYER_COLOR)
    }

    addPlayer(gamepadID) {
        for(let playerSlot = 0; playerSlot < this.maxPlayers; playerSlot++) {
            if(!this.players[playerSlot]){
                this.players[playerSlot] = {
                    gamepadID: gamepadID,
                    color: this.availableColors[0],
                    ready: false
                }
                break
            }
        }
    }
    update(gamepadStates: GamepadState[]) {
        gamepadStates.forEach(({pressedButtons, id: gamepadID}) => {
            const player = this.players.find((player) => player?.gamepadID == gamepadID)

            if(pressedButtons.includes(ControllerButton.A)){
                if(!player) this.addPlayer(gamepadID)
            }

            if(pressedButtons.includes(ControllerButton.B) && player){
                if(player.ready) {player.ready = false}
                else {
                    const playerIndex = this.players.findIndex((player) => player?.gamepadID == gamepadID)
                    this.players[playerIndex] = null
                }
            }
        })
    }

    draw() {
        const renderer = new Renderer()

        renderer.clearScreen()

        for(let playerSlot = 0; playerSlot < this.maxPlayers; playerSlot++){
            const windowWidth = 180
            const windowHeight = 360
            const leftMargin = 56
            const topMargin = 56
            const windowX = leftMargin + (leftMargin * playerSlot) + (windowWidth * playerSlot)
            const windowY = topMargin 
            const windowOrigin = new Vector(windowX, windowY)
            const windowDimensions = new Vector(windowWidth, windowHeight)

            this.renderPlayerWindow(windowOrigin, windowDimensions, playerSlot, renderer)
        }
    }

    renderPlayerWindow(origin: Vector, dimensions: Vector, playerSlot: number, renderer: Renderer) {
        const [x, y] = origin.values
        renderer.renderRectangle(origin, dimensions)
        if(!this.players[playerSlot]) {
            renderer.renderText('Press A to Join', new Vector(x + 20, y + 170), {fontSize: '23px'})
        }
    }
}

type Player = {
    gamepadID: string,
    color: PLAYER_COLOR
    ready: boolean
}

enum PLAYER_COLOR {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
    BLACK = 'black'
}
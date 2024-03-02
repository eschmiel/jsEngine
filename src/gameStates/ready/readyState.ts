import { GamepadState } from "../../../schmielJS/controller.js"
import { Vector } from "../../../schmielJS/math/vector.js"
import { Renderer } from "../../../schmielJS/rendering/render.js"
import { TEXT_ALIGN } from "../../../schmielJS/rendering/renderConstants.js"
import { ControllerAxis, ControllerButton } from "../../constants.js"

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
                    ready: false,
                    selectedMenuItem: 0
                }
                break
            }
        }
    }
    update(gamepadStates: GamepadState[]) {
        gamepadStates.forEach(({pressedButtons, axes, id: gamepadID}) => {
            const player = this.players.find((player) => player?.gamepadID == gamepadID)

            if( player ) {
                if(!player.ready) {
                    if(axes[ControllerAxis.LStickY] > .75 || pressedButtons.includes(ControllerButton.DpadUp)) {
                        player.selectedMenuItem -= 1
                        if(player.selectedMenuItem < 0) player.selectedMenuItem = 1
                    }
                    if(axes[ControllerAxis.LStickY] < -.75 || pressedButtons.includes(ControllerButton.DpadDown)) {
                        player.selectedMenuItem += 1
                        if(player.selectedMenuItem > 1) player.selectedMenuItem = 0
                    }
                    if(pressedButtons.includes(ControllerButton.B)){
                        const playerIndex = this.players.findIndex((player) => player?.gamepadID == gamepadID)
                        this.players[playerIndex] = null
                    }
                }
                else {
                    if(pressedButtons.includes(ControllerButton.B)) {player.ready = false}
                }
            } else {
                if(pressedButtons.includes(ControllerButton.A)) this.addPlayer(gamepadID)
            }
        
        })
    }

    draw() {
        const renderer = new Renderer()

        renderer.clearScreen()

        for(let playerSlot = 0; playerSlot < this.maxPlayers; playerSlot++){
            const player = this.players[playerSlot]

            const windowWidth = 180
            const windowHeight = 360
            const leftMargin = 56
            const topMargin = 56
            const windowX = leftMargin + (leftMargin * playerSlot) + (windowWidth * playerSlot)
            const windowY = topMargin 
            const windowOrigin = new Vector(windowX, windowY)
            const windowDimensions = new Vector(windowWidth, windowHeight)

            this.renderPlayerWindow(windowOrigin, windowDimensions, player, renderer)
            if (player && !player.ready) this.renderReadyMenu(windowOrigin, windowDimensions, player, renderer)
        }
    }

    renderPlayerWindow(origin: Vector, dimensions: Vector, player: Player, renderer: Renderer) {
        const [x, y] = origin.values
        renderer.renderRectangle(origin, dimensions)
        if(!player) {
            renderer.renderText('Press A to Join', new Vector(x + 20, y + 170), {fontSize: '23px'})
        }
    }

    renderReadyMenu(origin: Vector, dimensions: Vector, player: Player, renderer: Renderer) {
        const topMargin = 20

        const [originX, originY] = origin.values
        const [width, height] = dimensions.values
        const centerX = width/2 + originX
        const menuY = originY + height + topMargin

        const colorSelectColor = player.selectedMenuItem == 0 ? '#757575' : '#c9c8c5'
        const readyColor = player.ready ? 'black' : player.selectedMenuItem == 1 ? '#757575' : '#c9c8c5'


        renderer.renderText('Color', new Vector(centerX, menuY  + topMargin), {textAlign: TEXT_ALIGN.CENTER, color: 'black', fontSize: '20px'})
        renderer.renderText(`< ${player.color} >`, new Vector(centerX, menuY  + topMargin * 2 + 6), {textAlign: TEXT_ALIGN.CENTER, color: colorSelectColor, fontSize: '20px'})

        renderer.renderText(`Ready`, new Vector(centerX, menuY  + topMargin * 4 + 6), {textAlign: TEXT_ALIGN.CENTER, color: readyColor, fontSize: '20px'})
    }
}

type Player = {
    gamepadID: string,
    color: PLAYER_COLOR
    ready: boolean,
    selectedMenuItem: number
}

enum PLAYER_COLOR {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
    BLACK = 'black'
}
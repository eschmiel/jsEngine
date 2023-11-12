import canvas from './services/canvas.js'

export default (managers) => {
    canvas.clearScreen()
    managers.forEach((manager) => manager.draw())
}
import canvas from './services/canvas.js'

let rando1 = Math.random() * (255)
let rando2 = Math.random() * (255)
let rando3 = Math.random() * (255)
let power = false
// setInterval(() => {
//  power = true
// }, 1000)

// setInterval(() => {
//     power = false
//    }, 750)

export default ({ player, enemyBullets }) => {
    canvas.clearScreen()
    player.draw()
    enemyBullets.draw()

    rando2+= 1


    if(rando2 > 255) rando2 = 0

    
    
    canvas.context.fillStyle = `rgb(${rando1}, ${rando2}, ${rando3}  )`
    // if(power) canvas.context.fillStyle = `rgb(${Math.random() * (255)}, ${Math.random() * (255)}, ${Math.random() * (255)}  )`
    canvas.context.fillRect(0, 0, canvas.width, canvas.height)
}

const rando = () => {

}
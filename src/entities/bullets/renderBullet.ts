import { Renderer } from "../../../schmielJS/rendering/render.js"
import { Bullet } from "./bullet.js"

export function renderBullet(bullet: Bullet, player: number) {
    const renderer = new Renderer()

    const position = bullet.body.position
    const radius = bullet.body.dimensions.values[0]

    renderer.renderFillCircle(position, radius, 'blue')
}
import { Renderer } from "../../services/rendering/render.js"
import { Bullet } from "./bullet.js"

export class BulletRenderer{
    renderer: Renderer
    bullet: Bullet
    
    constructor(renderer: Renderer, bullet: Bullet) {
        this.renderer = renderer
        this.bullet = bullet
    }

    run(){
        const position = this.bullet.body.position
        const radius = this.bullet.body.dimensions.values[0]

        this.renderer.renderFillCircle(position, radius, 'blue')
    }
}
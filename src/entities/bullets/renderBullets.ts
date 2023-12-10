import { RenderingSystem } from "../../services/rendering/render"
import { BulletManager } from "./bulletManager"

export function renderBullets(renderingSystem: RenderingSystem, bulletManager: BulletManager) {
    bulletManager.bullets.forEach((bullet) => {
        const position = bullet.body.position
        const radius = bullet.body.dimensions.values[0]
    
        renderingSystem.renderFillCircle(position, radius, 'blue')
    })
}
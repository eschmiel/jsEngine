import { Renderer } from "../rendering/render.js";
import { CollisionBox } from "./collisionBox.js";

export function renderCollisionBox(renderingSystem: Renderer, collisionBox: CollisionBox) {
    renderingSystem.renderRectangle(collisionBox.entity.position, collisionBox.entity.dimensions, 'red')
}
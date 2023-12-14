import { Renderer } from "../rendering/render";
import { CollisionBox } from "./collisionBox";

export function renderCollisionBox(renderingSystem: Renderer, collisionBox: CollisionBox) {
    renderingSystem.renderRectangle(collisionBox.entity.position, collisionBox.entity.dimensions, 'red')
}
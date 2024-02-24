import { CollisionBox } from "./collisionBox.js"

export const colliding = (box1: CollisionBox, box2: CollisionBox) => {
    const [startX1, startY1] = box1.getPosition().values
    const [box1Width, box1Height] = box1.dimensions.values
    const endX1 = startX1 + box1Width
    const endY1 = startY1 + box1Height

    const [startX2, startY2] = box2.getPosition().values
    const [box2Width, box2Height] = box2.dimensions.values
    const endX2 = startX2 + box2Width
    const endY2 = startY2 + box2Height

    return (
        startX1 < endX2
        && endX1 > startX2 
        && startY1 < endY2 
        && endY1 > startY2
    )
}

export type Collidable = {
    collisionBox: CollisionBox
}
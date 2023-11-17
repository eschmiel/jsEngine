export type Manageable = {
    update: () => void
    draw: () => void
}

export class Manager<Type extends Manageable> {
    managedObjects: Type[]

    constructor() {
        this.managedObjects = []
    }

    push(obj: Type) {
        this.managedObjects.push(obj)
    }

    update() {
        this.managedObjects.forEach((object) => object.update())
    }

    draw() {
        this.managedObjects.forEach((object) => object.draw())
    }
}
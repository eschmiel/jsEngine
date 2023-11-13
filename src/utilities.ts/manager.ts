export type Manageable = {
    update: () => {}
    draw: () => {}
}

export class Manager {
    managedObjects: Manageable[]

    constructor() {
        this.managedObjects = []
    }

    run() {
        this.managedObjects.forEach((object) => object.update())
    }

    draw() {
        this.managedObjects.forEach((object) => object.draw())
    }
}
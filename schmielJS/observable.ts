// We tried building the system greatly relying on observables once. Ultimately we
// we decided to pull them out. But the observable class is still here in case we
// we want to use some again in a more limited capacity.
export class Observable {
    observers: Observer[]

    constructor() {
        this.observers = []
    }

    add(observer: Observer) {
        this.observers.push(observer)
    }

    remove(observerToRemove: Observer) {
        this.observers = this.observers.filter((observer) => observer !== observerToRemove)
    }

    notify(event, data?){
        this.observers.forEach((observer) => observer.onNotify(event, data))
    }
}

// Populate these with the kinds of events things should look for
export type ObserverEventData = void
export type ObserverEventType = void

export type Observer = {
    onNotify: (ObserverEventType, ObserverEventData) => void
}
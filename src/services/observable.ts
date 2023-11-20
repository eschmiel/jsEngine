import { Observer, ObserverEventType, ObserverEventData } from "../types"

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

    notify(event: ObserverEventType, data: ObserverEventData){
        this.observers.forEach((observer) => observer.onNotify(event, data))
    }
}
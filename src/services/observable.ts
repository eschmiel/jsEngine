import { BulletEvents } from "../entities/bullets/bullet.js"
import { BulletManagerEventData, BulletManagerEvents } from "../entities/bullets/bulletManager.js"
import { ShipEvents } from "../entities/ship/ship.js"
import { ParticleEffectsManagerEventData, ParticleEffectsManagerEvents } from "./particles/particleEffectsManager.js"
import { RespawnerEvents } from "./respawner.js"

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

    notify(event: ObserverEventType, data?: ObserverEventData){
        this.observers.forEach((observer) => observer.onNotify(event, data))
    }
}

export type ObserverEventData = ParticleEffectsManagerEventData | BulletManagerEventData
export type ObserverEventType = ParticleEffectsManagerEvents | BulletManagerEvents | RespawnerEvents | ShipEvents | BulletEvents


export type Observer = {
    onNotify: (ObserverEventType, ObserverEventData) => void
}
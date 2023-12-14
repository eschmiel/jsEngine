import { Observable, Observer, ObserverEventType, ObserverEventData } from "./observable.js"

export class Timer {
    timeLimit: number
    currentTime: number
    active: boolean
    observable: Observable
    timeCompleteEvent: ObserverEventType
    timeCompleteEventData: ObserverEventData

    constructor(timeLimit, timeCompleteEvent: ObserverEventType, timeCompleteEventData?: ObserverEventData) {
        this.timeLimit = timeLimit
        this.currentTime = 0
        this.active = false
        this.observable = new Observable()
        this.timeCompleteEvent = timeCompleteEvent
        this.timeCompleteEventData = timeCompleteEventData
    }

    activate() {
        if(!this.active) {
            this.currentTime = this.timeLimit
            this.active = true
        }
    }

    update() {
        if(this.active){
            this.currentTime--
            if(this.currentTime <= 0) {
                this.active = false
                this.observable.notify(this.timeCompleteEvent, this.timeCompleteEventData)
            }
        }
    }

    addObserver(observer: Observer) {
        this.observable.add(observer)
    }
}
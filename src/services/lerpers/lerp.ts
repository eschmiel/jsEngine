export class Lerp {
    currentTime: number
    length: number
    origin: number
    destination: number
    accelerationRate: number

    constructor(origin, destination, accelerationRate){
        this.currentTime = 0
        this.origin = origin
        this.destination = destination
        this.accelerationRate = accelerationRate
    }

    run() {
        if(this.currentTime >= 1) return this.destination
        const value = this.lerp()
        this.currentTime += this.accelerationRate
        if(this.currentTime > 1) this.currentTime = 1

        return value
    }

    lerp(): number {
        return this.origin * (1 - this.currentTime) + this.destination * this.currentTime
    }

    redirect(destination: number) {
        this.origin = this.lerp()
        this.destination = destination
        this.currentTime = 0
    }

    reset() {
        this.origin = 0
        this.currentTime = 0
        this.destination = 0
    }
}
export const degreesToRadians = (degrees) => (Math.PI / 180) * degrees

// export const lerp = (start: number, end: number, t: number): number => {
//     return start * (1 - t) + end * t
// }

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
        const value = this.lerp()
        this.currentTime += this.accelerationRate
        if(this.currentTime > 1) this.currentTime = 1

        return value
    }

    lerp(): number {
        return this.origin * (1 - this.currentTime) + this.destination * this.currentTime
    }

    redirect(destination, accelerationRate = this.accelerationRate) {
        this.origin = this.lerp()
        this.destination = destination
        this.currentTime = 0
    }
}
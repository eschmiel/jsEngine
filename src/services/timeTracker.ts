export class TimeTracker {
    previousTimeInSeconds: number
    timeBetweenUpdates: number
    timeLimitBetweenUpdates: number

    constructor() {
        this.previousTimeInSeconds =  0
        this.timeBetweenUpdates = 0
        this.timeLimitBetweenUpdates = 1/60
    }

    // current time should be in milliseconds
    trackTime(currentTime) {
        const currentTimeInSeconds = currentTime / 1000
        const timePassed = currentTimeInSeconds - this.previousTimeInSeconds
        this.previousTimeInSeconds = currentTimeInSeconds
        this.timeBetweenUpdates += timePassed
    }

    isTimeBetweenUpdatesOverTimeLimit() {
        return this.timeBetweenUpdates > this.timeLimitBetweenUpdates
    }

    logUpdate() {
        this.timeBetweenUpdates -= this.timeLimitBetweenUpdates
    }
}

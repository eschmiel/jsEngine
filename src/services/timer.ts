export class Timer {
    timeLimit: number
    currentTime: number
    active: boolean

    constructor(timeLimit) {
        this.timeLimit = timeLimit
        this.currentTime = 0
        this.active = false
    }

    activate() {
        if(!this.active) {
            this.currentTime = this.timeLimit
            this.active = true
        }
    }

    deactivate(){
        if(this.active) {
            this.active = false
            this.currentTime = 0
        }
    }

    update() {
        if(this.active){
            this.currentTime--
            if(this.currentTime <= 0) {
                this.active = false
            }
        }
    }
}
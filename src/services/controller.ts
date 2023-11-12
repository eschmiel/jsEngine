class Controller {
    ArrowDown: boolean;
    ArrowUp: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    w: boolean;
    s: boolean;
    a: boolean;
    d: boolean;
    
    constructor() {
        document.addEventListener("keydown", (event) => this[event.key] = true )
        document.addEventListener("keyup", (event) => this[event.key] = false )
    }
}

export default new Controller()
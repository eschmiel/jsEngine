export enum Direction {
    Left = 'left',
    Right = 'right',
    Forward = 'forward',
    Backward = 'backward'
}

export enum GAME_STATE {
    TITLE_SCREEN = 'title screen',
    READY_SCREEN = 'ready screen',
    ACTIVE_GAME = 'active game'
}

export enum ControllerButton {
    DpadLeft = 14,
    DpadUp = 12,
    DpadRight = 15,
    DpadDown = 13,
    Y = 3,
    B = 1,
    A = 0,
    X = 2,
    Select = 8,
    Start = 9,
    LTrigger = 6,
    LBumper = 4,
    RTrigger = 7,
    RBumper = 5
}

// axes[0]) x axis left joystick
// axes[1]) y axis left joystick
// axes[2]) x axis right joystick
// axes[3]) y axis right joystick
export enum ControllerAxis {
    LStickX = 0,
    LStickY = 1,
    RStickX = 2,
    RStickY = 3
}

interface GamepadTickEvent {
    gamepad:Gamepad,
    hasAnyButtonTicked:boolean,
    hasAnyAxesTicked:boolean,
    isAnyButtonPressed:boolean,
    hasAnyAxesActivity:boolean,
    axes: {
        [key: string]: number
    }
    buttons: {
        [key: string]: number
    }
}

interface Axis{
    index: string,
    reversed: boolean
}
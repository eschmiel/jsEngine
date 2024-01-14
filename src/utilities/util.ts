export const degreesToRadians = (degrees) => (Math.PI / 180) * degrees

export const getPropertyName = (property) => {
    return Object.keys({property})[0]
}

// This janky. What if the range is -3 to -6? Make this more elegant and robust at some point
export function getRandomWholeNumberInRange(minimum: number, maximum: number) {
    let multiplier = maximum
    if(minimum < 0) maximum - minimum 
    return Math.floor(Math.random() * multiplier) + minimum
}
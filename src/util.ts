export const degreesToRadians = (degrees) => (Math.PI / 180) * degrees

export const getPropertyName = (property) => {
    return Object.keys({property})[0]
}
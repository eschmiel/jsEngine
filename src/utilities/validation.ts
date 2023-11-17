import { getPropertyName } from "../util.js"

export const validateIsBetweenOneAndZero = (value: number, message: string = "ERROR") => {
    if(value > 1 || value < 0) {
        const propertyName = getPropertyName(value)
        throw new Error(`${message} - ${propertyName} cannot be greater than 1 or less than zero. ${propertyName} was ${value}`)
    }
}
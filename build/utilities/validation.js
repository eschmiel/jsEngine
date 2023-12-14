import { getPropertyName } from "./util.js";
export var validateIsBetweenOneAndZero = function (value, message) {
    if (message === void 0) { message = "ERROR"; }
    if (value > 1 || value < 0) {
        var propertyName = getPropertyName(value);
        throw new Error("".concat(message, " - ").concat(propertyName, " cannot be greater than 1 or less than zero. ").concat(propertyName, " was ").concat(value));
    }
};
//# sourceMappingURL=validation.js.map
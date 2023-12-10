var RendererObserver = /** @class */ (function () {
    function RendererObserver(renderingSystem) {
        this.renderingSystem = renderingSystem;
    }
    RendererObserver.prototype.onNotify = function (event, data) {
        switch (event) {
            case RenderingEvents.fillTriangle:
                if (isFillTriangleOptions(data))
                    this.renderingSystem.renderFillTriangle(data.trianglePoints, data.color);
                break;
            case RenderingEvents.fillCircle:
                if (isFillCircleOptions(data))
                    this.renderingSystem.renderFillCircle(data.position, data.radius, data.color);
                break;
            default:
        }
    };
    return RendererObserver;
}());
export { RendererObserver };
// Types
export var RenderingEvents;
(function (RenderingEvents) {
    RenderingEvents["fillTriangle"] = "fillTriangle";
    RenderingEvents["fillCircle"] = "fillCircle";
})(RenderingEvents || (RenderingEvents = {}));
export function isFillTriangleOptions(input) {
    return input.trianglePoints !== undefined
        || input.color !== undefined;
}
export function isFillCircleOptions(input) {
    return input.position !== undefined
        || input.radius !== undefined
        || input.color !== undefined;
}
//# sourceMappingURL=rendererObserver.js.map
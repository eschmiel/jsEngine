var offScreenCanvas = new OffscreenCanvas(300, 300);
var offScreenCanvasContext = offScreenCanvas.getContext('2d');
var gameCanvas = document.getElementById("gameCanvas");
var gameCanvasContext = gameCanvas.getContext("2d");
export { offScreenCanvas, offScreenCanvasContext, gameCanvas, gameCanvasContext };
//# sourceMappingURL=canvases.js.map
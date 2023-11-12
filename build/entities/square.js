var Square = /** @class */ (function () {
    function Square(x, y) {
        this.x = x;
        this.y = y;
        this.height = 25;
        this.width = 50;
        this.rotation = 0;
    }
    Square.prototype.draw = function () {
        var canvas = document.getElementById("gameCanvas");
        var context = canvas.getContext("2d");
        var scratchPadCanvas = document.getElementById("scratchPad");
        var scratchPadContext = scratchPadCanvas.getContext("2d");
        scratchPadContext.save();
        scratchPadContext.globalCompositeOperation = "destination-over";
        scratchPadContext.clearRect(0, 0, 300, 300); // clear canvas
        scratchPadContext.translate(this.width / 2, this.height / 2);
        scratchPadContext.rotate((Math.PI / 180) * this.rotation);
        scratchPadContext.translate(-(this.width / 2), -(this.height / 2));
        // scratchPadContext.fill(this.createPath2D())
        scratchPadContext.fillStyle = 'blue';
        scratchPadContext.fillRect(25, 0, 50, 50);
        scratchPadContext.restore();
        scratchPadContext.fillStyle = 'red';
        scratchPadContext.fillRect(50, 50, this.width, this.height);
        context.drawImage(scratchPadCanvas, this.x, this.y);
        context.fillRect(50, 50, this.width, this.height);
    };
    Square.prototype.control = function (keyName) {
        if (keyName === 'ArrowDown')
            this.y += 5;
        if (keyName === 'ArrowUp')
            this.y -= 5;
        if (keyName === 'ArrowLeft')
            this.rotation += 1;
        if (keyName === 'ArrowRight')
            this.rotation -= 1;
    };
    return Square;
}());
export { Square };
//# sourceMappingURL=square.js.map
import { degreesToRadians } from '../utilities/util.js'
import { Vector } from '../math/vector.js';
import { FONT_STRETCH, FONT_STYLE, FONT_WEIGHT, TEXT_ALIGN } from './renderConstants.js';

class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    height: number;
    width: number;
    
    constructor(){
        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        this.width = 1000
        this.height = 600

        this.canvas.setAttribute("width", this.width.toString())
        this.canvas.setAttribute("height", this.height.toString())
    }

    rotate(degrees, centerPosition: Vector) {
        // context.rotate uses radans as the unit of measurement for its rotation.
        // This statement converts degrees into radans.
        const radians = degreesToRadians(degrees)
        const [x, y] = centerPosition.values

        this.context.translate(x, y)
        this.context.rotate(radians)
        this.context.translate(-x, -y)
    }

    drawLine(origin: Vector, end: Vector, color = 'black') {
        const [originX, originY] = origin.values
        const [endX, endY] = end.values
        this.context.strokeStyle = color

        this.context.beginPath()

        this.context.moveTo(originX, originY);
        this.context.lineTo(endX, endY);

        this.context.closePath()
        this.context.stroke()
    }

    fillTriangle(points: Vector[], color = 'black') {
        this.context.fillStyle = color

        this.context.beginPath()

        this.context.moveTo(points[0].values[0], points[0].values[1]);
        this.context.lineTo(points[1].values[0], points[1].values[1]);
        this.context.lineTo(points[2].values[0], points[2].values[1]);

        this.context.fill()
    }

    strokeTriangle(points: Vector[], color = 'black') {
        this.context.strokeStyle = color

        this.context.beginPath()

        this.context.moveTo(points[0].values[0], points[0].values[1]);
        this.context.lineTo(points[1].values[0], points[1].values[1]);
        this.context.lineTo(points[2].values[0], points[2].values[1]);

        this.context.closePath()
        this.context.stroke()
    }

    drawRectangle(position:Vector, dimensions: Vector, color: string = 'black') {
        const [x, y] = position.values
        const [width, height] = dimensions.values

        this.context.strokeStyle = color
        this.context.strokeRect(x, y, width, height)
    }

    strokeCircle(position:Vector, radius: number, color: string = 'black') {
        const [x, y] = position.values
        this.context.strokeStyle = color

        this.context.beginPath()
        this.context.arc(x, y, radius, 0, Math.PI * 2,)
        this.context.stroke()
    }

    fillCircle(position:Vector, radius: number, color: string = 'black') {
        const [x, y] = position.values
        this.context.fillStyle = color

        this.context.beginPath()
        this.context.arc(x, y, radius, 0, Math.PI * 2,)
        this.context.fill()
    }

    fillText(text: string, position: Vector, fillTextOptions?: FillTextOptions){
        const [x, y] = position.values

        const fontSize = fillTextOptions?.fontSize ?? defaultFillTextOptions.fontSize
        const fontWeight = fillTextOptions?.fontWeight ?? defaultFillTextOptions.fontWeight
        const fontStyle = fillTextOptions?.fontStyle ?? defaultFillTextOptions.fontStyle
        const fontStretch = fillTextOptions?.fontStretch ?? defaultFillTextOptions.fontStretch

        this.context.font = `${fontSize} ${fontWeight} ${fontStyle} ${fontStretch}`
        this.context.fillStyle = fillTextOptions?.color ?? defaultFillTextOptions.color
        this.context.textAlign = fillTextOptions?.textAlign ?? defaultFillTextOptions.textAlign

        this.context.fillText(text, x, y)
    }

    save() {
        this.context.save()
    }

    restore() {
        this.context.restore()
    }

    clearScreen() {      
        this.context.globalCompositeOperation = "destination-over";
        this.context.clearRect(0, 0, this.width, this.height);
      }
}

export default new Canvas()

export type FillTextOptions = {
    textAlign?: TEXT_ALIGN,
    fontSize?: string,
    fontWeight?: FONT_WEIGHT | number,
    fontStyle?: FONT_STYLE,
    fontStretch?: FONT_STRETCH | number,
    color?: string
}

const defaultFillTextOptions = {
    textAlign: TEXT_ALIGN.LEFT,
    fontSize: '12px',
    fontWeight: FONT_WEIGHT.NORMAL,
    fontStyle: FONT_STYLE.NORMAL,
    fontStretch: FONT_STRETCH.NORMAL,
    color: 'black'
}
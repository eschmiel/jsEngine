import { Lerp } from "../util.js";
import canvas from "./canvas.js";
import { Vector, createDirection } from "./vector.js";

export class TriangleExplosion {
    particles: TriangleParticle[]

    constructor(position: Vector, particleSize: Vector, particleNumber: number = 1){
        this.particles = []

        const particleDegreeGap = 360/particleNumber
        for ( let i = 1; i <= particleNumber; i++ ) {
            const particleDirection = createDirection(particleDegreeGap * i)
            const particlePosition = position.addVector(particleDirection.multiplyByScalar(5))
            this.particles.push(new TriangleParticle(particlePosition, particleSize.copy(), particleDirection))
        }
    }

    update() { this.particles.forEach((particle) => particle.update())}
    draw() { this.particles.forEach((particle) => particle.draw())}
}

class TriangleParticle {
    position: Vector
    dimensions: Vector
    direction: Vector
    rotation: number
    particleColor: string;
    speed: number;
    timer: number;
    maxTimer: number;
    accelerationLerp: Lerp

    constructor(position: Vector, dimensions: Vector, direction: Vector) {
        this.position = position.copy()
        this.dimensions = dimensions.copy()
        this.direction = direction.copy()
        this.particleColor = 'black'
        this.rotation =0
        this.speed = 10
        this.timer = 0
        this.maxTimer = 45
        this.accelerationLerp = new Lerp(this.speed, 0, .01)
    }

    createTrianglePoints() {
        const [x, y] = this.position.values
        const [width, height] = this.dimensions.values
        return [
            new Vector(...this.position.values),
            new Vector(x + width, this.getCenterY()),
            new Vector(x, y + height)
        ]
    }

    getCenterX = () => {
        const x = this.position.values[0]
        const width = this.dimensions.values[0]
        
        return x + width/2
    }

    getCenterY = () => {
        const y = this.position.values[1]
        const height = this.dimensions.values[1]

        return y + height/2
    }

    update() {
        this.rotation += 25;
        if(this.rotation > 360) this.rotation -= 360
        this.speed = this.accelerationLerp.run()
        const distanceInDirection = this.direction.multiplyByScalar(this.speed)
        this.position = this.position.addVector(distanceInDirection) 
        if(this.timer <= this.maxTimer) this.timer += 1
    }

    draw() {
        canvas.save()
        canvas.context.globalAlpha = 0
        if(this.maxTimer > this.timer) canvas.context.globalAlpha = 1 - this.timer / this.maxTimer
        const trianglePoints = this.createTrianglePoints()

        canvas.rotate(this.rotation, this.getCenterX(), this.getCenterY())
        canvas.strokeTriangle(trianglePoints, this.particleColor)

        canvas.restore()
    }
}
import { Lerp, getCenterPosition } from "../../util.js";
import canvas from "../canvas.js";
import { Vector, createDirection } from "../vector.js";

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
    rotation: number
    rotationSpeed: number;
    speed: number;
    direction: Vector
    particleColor: string;
    timer: number;
    maxTimer: number;
    accelerationLerp: Lerp

    constructor(position: Vector, dimensions: Vector, direction: Vector) {
        this.position = position.copy()
        this.dimensions = dimensions.copy()
        this.direction = direction.copy()
        this.particleColor = 'black'
        this.rotation =0
        this.rotationSpeed = 25
        this.speed = 10
        this.timer = 0
        this.maxTimer = 45
        this.accelerationLerp = new Lerp(this.speed, 0, .01)
    }

    createTrianglePoints() {
        const [x, y] = this.position.values
        const [width, height] = this.dimensions.values
        const [centerX, centerY] = getCenterPosition(this.position, this.dimensions).values

        return [
            this.position.copy(),
            new Vector(x + width, centerY),
            new Vector(x, y + height)
        ]
    }

    update() {
        if(this.timer < this.maxTimer) {
            this.rotation += this.rotationSpeed;
            if(this.rotation > 360) this.rotation -= 360
            this.speed = this.accelerationLerp.run()
            const distanceInDirection = this.direction.multiplyByScalar(this.speed)
            this.position = this.position.addVector(distanceInDirection) 
            if(this.timer <= this.maxTimer) this.timer += 1
        }
    }

    draw() {
        if(this.timer < this.maxTimer) {
            const [centerX, centerY] = getCenterPosition(this.position, this.dimensions).values

            canvas.save()

            canvas.context.globalAlpha = 0
            if(this.maxTimer > this.timer) canvas.context.globalAlpha = 1 - this.timer / this.maxTimer
            const trianglePoints = this.createTrianglePoints()

            canvas.rotate(this.rotation, new Vector(centerX, centerY))
            canvas.strokeTriangle(trianglePoints, this.particleColor)

            canvas.restore()
        }
    }
}
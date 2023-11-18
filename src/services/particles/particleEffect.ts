import { Particle } from "./particle.js"

export class ParticleEffect {
    particles: Particle[]

    constructor() {
        this.particles = []
    }

    update() {
        this.particles.forEach((particle) => {
            particle.update()
            if(particle.outOfTime()) this.remove(particle)
        })
    }

    draw() {
        this.particles.forEach((particle) => particle.draw())
    }

    add(particle) {
        this.particles.push(particle)
    }

    remove(particleToRemove) {
        this.particles = this.particles.filter((particle) => particle !== particleToRemove)
    }

    particleCount() { return this.particles.length }
}
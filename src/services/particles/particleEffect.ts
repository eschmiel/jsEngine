import { Particle } from "./particle.js"

export class ParticleEffect {
    particles: Particle[]

    constructor() {
        this.particles = []
    }

    run() {
        this.particles.forEach((particle) => {
            particle.run()
            if(particle.outOfTime()) this.remove(particle)
        })
    }

    add(particle) {
        this.particles.push(particle)
    }

    remove(particleToRemove) {
        this.particles = this.particles.filter((particle) => particle !== particleToRemove)
    }

    particleCount() { return this.particles.length }
}
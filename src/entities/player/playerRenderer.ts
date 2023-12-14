import { Observable, Observer, ObserverEventData, ObserverEventType } from "../../services/observable.js"
import { ParticleEffectsManager, ParticleEffectsManagerEvents } from "../../services/particles/particleEffectsManager.js"
import { Renderer } from "../../services/rendering/render.js"
import { RespawnerEvents } from "../../services/respawner.js"
import { Bullet, BulletEvents } from "../bullets/bullet.js"
import { BulletRenderer } from "../bullets/bulletRenderer.js"
import { Player } from "./player.js"
import { ShipEvents } from "../ship/ship.js"
import { ShipRenderer } from "../ship/shipRenderer.js"

export class PlayerRenderer {
    renderer: Renderer
    particleEffectsManager: ParticleEffectsManager
    player: Player
    shipRenderer: ShipRenderer
    bulletRenderers: BulletRenderer[]
    observable: Observable

    constructor(renderer: Renderer, particleEffectsManager: ParticleEffectsManager, player: Player){
        this.renderer = renderer
        this.particleEffectsManager = particleEffectsManager
        this.player = player
        this.shipRenderer = new ShipRenderer(this.renderer, this.player.ship)
        this.bulletRenderers = []
        this.observable = new Observable()

        this.player.addObserver(this)
    }

    run(){
        this.shipRenderer?.run()
        this.bulletRenderers.forEach((renderer) => renderer.run())
    }

    onNotify(event: ObserverEventType, data: ObserverEventData) {
        const particleEffectsManagerEvents = Object.values(ParticleEffectsManagerEvents)

        switch(event){
            case ShipEvents.death:
                this.shipRenderer = null
                break
            case RespawnerEvents.respawn:
                this.shipRenderer = new ShipRenderer(this.renderer, this.player.ship)
                break
            case ShipEvents.shoot:
                if(isBullet(data)){
                    this.bulletRenderers.push(new BulletRenderer(this.renderer, data))
                }
                break
            case BulletEvents.hit:
                if(isBullet(data)){
                    this.bulletRenderers = this.bulletRenderers.filter(({bullet}) => bullet !== data)
                }
            default:
                if(particleEffectsManagerEvents.includes(event)) {
                    this.observable.notify(event, data)
                }
        }
    }

    addObserver(observer: Observer){
        this.observable.add(observer)
    }
}



// Types



export function isBullet(input: ObserverEventData): input is Bullet {
    return (input as Bullet).hit !== undefined
}
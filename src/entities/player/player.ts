import { Vector } from "../../services/math/vector.js"
import { BulletManager, isBullet } from "../bullets/bulletManager.js"
import Ship, { CreateShipOptions, ShipEvents } from "../ship/ship.js"
import { Respawner, RespawnerEvents } from "../../services/respawner.js"
import { Observable, Observer } from "../../services/observable.js"
import { BulletEvents } from "../bullets/bullet.js"

export class Player {
    id: number
    lives: number
    ship?: Ship
    bulletManager?: BulletManager
    respawner: Respawner
    observable: Observable

    constructor(id: number) {
        this.id = id
        this.lives = 5
        this.respawner = new Respawner(60)
        this.observable = new Observable()

        this.respawner.addObserver(this)
    }

    createShip(position: Vector, options?: CreateShipOptions) {
        const [x, y] = position.values
        this.bulletManager = new BulletManager()
        this.ship = new Ship(x, y, options)
        
        this.bulletManager.addObserver(this)
        this.ship.addObserver(this)
    }

    update(){
        this.ship?.update()
        this.bulletManager?.update()
        this.respawner.update()
    }

    onNotify(eventType, eventData){
        switch(eventType) {
            case ShipEvents.death:
                this.lives--
                if(this.lives>0) {
                    this.respawner.activate()
                }
                this.ship = null
                break;
            case RespawnerEvents.respawn:
                this.createShip(new Vector(200, 400), {respawn: true})
                break;
            case ShipEvents.shoot:
                if(isBullet(eventData)) this.bulletManager.add(eventData)
                break;
            case BulletEvents.hit:
                if(isBullet(eventData)) this.bulletManager.remove(eventData)
                break
            default:
        }

        this.observable.notify(eventType, eventData)
    }

    addObserver(observer: Observer) {
        this.observable.add(observer)
    }
}



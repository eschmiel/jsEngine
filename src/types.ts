import { BulletManagerEventData, BulletManagerEvents } from "./entities/bullets/bulletManager"
import { ParticleEffectsManagerEventData, ParticleEffectsManagerEvents } from "./services/particles/particleEffectsManager"

export type ObserverEventData = ParticleEffectsManagerEventData | BulletManagerEventData
export type ObserverEventType = ParticleEffectsManagerEvents | BulletManagerEvents


export type Observer = {
    onNotify: (ObserverEventType, ObserverEventData) => void
}
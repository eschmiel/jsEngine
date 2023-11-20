import { ParticleEffectsManagerEventData, ParticleEffectsManagerEvents } from "./particles/particleEffectsManager"

export type ObserverEventData = ParticleEffectsManagerEventData
export type ObserverEventType = ParticleEffectsManagerEvents


export type Observer = {
    onNotify: (ObserverEventType, ObserverEventData) => void
}
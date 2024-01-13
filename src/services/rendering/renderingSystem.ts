// import { PlayerRenderer } from "../../entities/player/playerRenderer.js";
// import GameState from "../../gameState.js";
// import { ParticleEffectsManager } from "../particles/particleEffectsManager.js";
// import { Renderer } from "./render.js";
    
// export class RenderingSystem2 {
//     renderer: Renderer
//     playerRenderer: PlayerRenderer
//     particleEffectManager: ParticleEffectsManager
    
//     constructor(gameState: GameState) {
//         this.renderer = new Renderer()
//         this.particleEffectManager = new ParticleEffectsManager()

//         this.playerRenderer = new PlayerRenderer(gameState.player)
        
//         this.playerRenderer.addObserver(this.particleEffectManager)
//     }

//     run() {
//         this.renderer.clearScreen()
//         this.playerRenderer.run()
//         this.particleEffectManager.run()
//     }
// }
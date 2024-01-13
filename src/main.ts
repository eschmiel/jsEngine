import update from './update.js'
import { init } from './init.js'
import { startGame } from './startGame.js'
import draw from './draw.js'

(() => {
  const {gameEntities, particleEffectManager, timeTracker, gameState} = init()
  startGame(gameEntities, gameState)
  
  function game(time = 0) {
      window.requestAnimationFrame(game)

      timeTracker.trackTime(time)
      
      while(timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
        update(gameEntities, particleEffectManager, gameState)
        timeTracker.logUpdate()
      }
      draw(gameEntities, gameState, particleEffectManager)
  }

  game()
})()

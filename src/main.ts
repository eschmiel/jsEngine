import GameState from './gameState.js'
import update from './update.js'
import { RenderingSystem2 } from './services/rendering/renderingSystem.js'



(() => {
  const gameState = new GameState()
  const renderingSystem2 = new RenderingSystem2(gameState)
  const {timeTracker} = gameState
  function game(time = 0) {
      window.requestAnimationFrame(game)

      timeTracker.trackTime(time)
      
      while(timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
        update(gameState)
        renderingSystem2.run()
        timeTracker.logUpdate()
      }
  }

  game()
})()

import GameState from './gameState.js'
import update from './update.js'
import draw from './draw.js'



(() => {
  const gameState = new GameState()
 
  const {timeTracker} = gameState
  function game(time = 0) {
      window.requestAnimationFrame(game)

      timeTracker.trackTime(time)
      
      while(timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
        update(gameState)
        timeTracker.logUpdate()
      }
      draw(gameState)
  }

  game()
})()

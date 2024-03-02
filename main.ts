import TitleState from './src/gameStates/title/titleState.js'
import Game from './src/game.js'
import { TimeTracker } from './schmielJS/timeTracker.js'
import ReadyState from './src/gameStates/ready/readyState.js'

(() => {
  const timeTracker = new TimeTracker()
  const startingState = new TitleState()

  const game = new Game(startingState)
   
  function mainLoop(time = 0) {
      window.requestAnimationFrame(mainLoop)

      timeTracker.trackTime(time)
      
      while(timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
        game.update()
        timeTracker.logUpdate()
      }
      game.draw()
  }

  mainLoop()
})()

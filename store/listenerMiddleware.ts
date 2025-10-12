import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { tick } from './slices/timerSlice'
import { completeCurrentGoal } from './slices/goalSlice'

// Create the middleware instance
export const listenerMiddleware = createListenerMiddleware()

// Add a listener for the tick action
listenerMiddleware.startListening({
  actionCreator: tick,  // Listen for the tick action
  
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    
    if (state.timer.timeRemaining === 0) {
      // Check if there's a current goal to complete
      const currentGoal = state.goal.createdGoals.find(g => g.isCurrentGoal)
      
      if (currentGoal && !currentGoal.isCompleted) {
        listenerApi.dispatch(completeCurrentGoal(state.timer.studyDuration))
      }
    }
  },
})
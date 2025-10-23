import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { setTimeRemaining } from './slices/timerSlice'
import { completeSession } from './slices/goalSlice'

// Create the middleware instance
export const listenerMiddleware = createListenerMiddleware()

// Add a listener for the setTimeRemaining action (fires every second when timer is running)
listenerMiddleware.startListening({
  actionCreator: setTimeRemaining,  // Listen for the setTimeRemaining action
  
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    
    // Check if timer reached 0 and we have an active goal
    if (state.goal.currentGoalId && action.payload === 0 && state.timer.isRunning) {
      const elapsedTime = state.timer.studyDuration;

      // Timer completed - record the session
      listenerApi.dispatch(completeSession({
        duration: elapsedTime,
        completed: true
      }))
    }
  },
})
import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { tick } from './slices/timerSlice'
import { completeSession } from './slices/goalSlice'

// Create the middleware instance
export const listenerMiddleware = createListenerMiddleware()

// Add a listener for the tick action
listenerMiddleware.startListening({
  actionCreator: tick,  // Listen for the tick action
  
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    
    if (state.timer.timeRemaining === 0 && state.goal.currentGoalId) {
      // Timer completed - record the session
      listenerApi.dispatch(completeSession({
        duration: state.timer.studyDuration,
        completed: true
      }))
    }
  },
})
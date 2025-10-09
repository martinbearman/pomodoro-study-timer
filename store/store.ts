import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './slices/timerSlice'
import goalReducer from './slices/goalSlice'

/**
 * Redux Store Configuration
 * 
 * This is the central store that holds the entire state of your app.
 * We're using Redux Toolkit's configureStore which includes:
 * - Good default middleware (thunk for async actions)
 * - Redux DevTools integration
 * - Simplified configuration
 */
export const store = configureStore({
  reducer: {
    timer: timerReducer,  // Manages timer state (time, isRunning, etc.)
    goal: goalReducer,     // Manages study goals and sessions
  },
})

// These types are used throughout the app for TypeScript support
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

 
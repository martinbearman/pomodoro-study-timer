import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Timer State Interface
 * 
 * Defines the shape of our timer state.
 * This helps TypeScript catch errors and provides autocomplete.
 */
interface TimerState {
  timeRemaining: number      // Time left in seconds
  isRunning: boolean         // Is the timer currently counting down?
  isBreak: boolean          // Are we in break mode or study mode?
  studyDuration: number     // Study session length in seconds (default: 25 min)
  breakDuration: number     // Break length in seconds (default: 7 min)
}

/**
 * Initial State
 * 
 * The starting values when the app loads.
 * 25 minutes = 1500 seconds
 * 7 minutes = 420 seconds
 */
const initialState: TimerState = {
  timeRemaining: 1500,  // 25 minutes in seconds
  isRunning: false,
  isBreak: false,
  studyDuration: 1500,  // 25 minutes
  breakDuration: 420,   // 7 minutes
}

/**
 * Timer Slice
 * 
 * A "slice" is a collection of Redux reducer logic and actions
 * for a single feature. This slice handles all timer-related state.
 * 
 * Redux Toolkit automatically generates action creators for each reducer!
 */
const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    /**
     * Start the timer
     */
    start: (state) => {
      state.isRunning = true
    },

    /**
     * Pause the timer
     */
    pause: (state) => {
      state.isRunning = false
    },

    /**
     * Reset timer to initial duration
     */
    reset: (state) => {
      state.isRunning = false
      state.timeRemaining = state.isBreak ? state.breakDuration : state.studyDuration
    },

    /**
     * Decrease time by 1 second (called every second by the app)
     */
    tick: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1
      } else {
        // Time's up! Auto-pause
        state.isRunning = false
      }
    },

    /**
     * Switch between study and break modes
     */
    toggleMode: (state) => {
      state.isBreak = !state.isBreak
      state.timeRemaining = state.isBreak ? state.breakDuration : state.studyDuration
      state.isRunning = false
    },

    /**
     * Update study duration
     * Payload is the new duration in minutes
     */
    setStudyDuration: (state, action: PayloadAction<number>) => {
      const seconds = action.payload * 60
      state.studyDuration = seconds
      // Update current time if we're in study mode and not running
      if (!state.isBreak && !state.isRunning) {
        state.timeRemaining = seconds
      }
    },

    /**
     * Update break duration
     * Payload is the new duration in minutes
     */
    setBreakDuration: (state, action: PayloadAction<number>) => {
      const seconds = action.payload * 60
      state.breakDuration = seconds
      // Update current time if we're in break mode and not running
      if (state.isBreak && !state.isRunning) {
        state.timeRemaining = seconds
      }
    },
  },
})

// Export actions to use in components
export const { 
  start, 
  pause, 
  reset, 
  tick, 
  toggleMode, 
  setStudyDuration, 
  setBreakDuration 
} = timerSlice.actions

// Export reducer to include in the store
export default timerSlice.reducer


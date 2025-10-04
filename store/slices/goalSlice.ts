import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Goal State Interface
 */
interface GoalState {
  currentGoal: string          // The study goal text
  completedSessions: number    // Number of completed study sessions
  totalStudyTime: number       // Total time studied in seconds
}

/**
 * Initial State
 */
const initialState: GoalState = {
  currentGoal: '',
  completedSessions: 0,
  totalStudyTime: 0,
}

/**
 * Goal Slice
 * 
 * Manages study goals and session tracking.
 * This is separate from the timer to follow the
 * principle of separating concerns.
 */
const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    /**
     * Set or update the current study goal
     */
    setGoal: (state, action: PayloadAction<string>) => {
      state.currentGoal = action.payload
    },

    /**
     * Mark a session as complete and track stats
     */
    completeSession: (state, action: PayloadAction<number>) => {
      state.completedSessions += 1
      state.totalStudyTime += action.payload
    },

    /**
     * Reset all goal data
     */
    resetGoal: (state) => {
      state.currentGoal = ''
      state.completedSessions = 0
      state.totalStudyTime = 0
    },
  },
})

export const { setGoal, completeSession, resetGoal } = goalSlice.actions
export default goalSlice.reducer


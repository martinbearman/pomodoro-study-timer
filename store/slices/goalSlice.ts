import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Individual Goal Interface
 */
export interface Goal {
  id: string, // The id of the goal
  durationSet: number, // The duration set for the goal
  durationStudied: number, // The time studied for the goal
  goalDescription: string, // The study goal text
  isCurrentGoal: boolean, // Sets the current goal to True otherwise it'll be false
  goalTimeStamp: number // Time and date the goal was created
  isCompleted: boolean // If the goal was completed (timer ran to zero)
}

/**
 * Goal State Interface
 */
export interface GoalState {
  // The description of the current goal
  createdGoals: Array<Goal>,
  totalStudyTime: number       // Total time studied in seconds
  completedSessions: number    // Number of completed study sessions
}

/**
 * Set Goal Payload Interface
 */

interface SetGoalPayload {
  description: string, // The description of the goal
  duration: number // The duration of the goal in seconds
}
/**
 * Initial State
 */
const initialState: GoalState = {
  createdGoals: [{
    id: 'test-goal-1',
    goalDescription: 'Study for 25 minutes',
    durationSet: 1500,
    durationStudied: 0,
    isCurrentGoal: true,
    goalTimeStamp: Date.now(),
    isCompleted: false
  }],
  totalStudyTime: 0,
  completedSessions: 0
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
    setGoal: (state, action: PayloadAction<SetGoalPayload>) => {
      // Set all goals to not current
      state.createdGoals.forEach(goal => {
        goal.isCurrentGoal = false
      })

      // Set the new goal to current
      const newGoal = {
        id: crypto.randomUUID(),
        durationSet: action.payload.duration,
        durationStudied: 0,
        goalDescription: action.payload.description,
        isCurrentGoal: true,
        goalTimeStamp: Date.now(),
        isCompleted: false
      }
      state.createdGoals.push(newGoal)
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
      //state.currentGoal = ''
      state.completedSessions = 0
      state.totalStudyTime = 0
    },

    /**
     * Mark the current goal as completed
     */
    completeCurrentGoal: (state, action: PayloadAction<number>) => {
      state.createdGoals.forEach(goal => {
        if (goal.isCurrentGoal) {
          goal.isCompleted = true
          goal.durationStudied = action.payload
          goal.isCurrentGoal = false
        }
      })
    },

    // Switch to a different goal
    switchCurrentGoal: (state, action: PayloadAction<string>) => { 
      // Set all goals to not current
      state.createdGoals.forEach(goal => {
        goal.isCurrentGoal = false;
      });
      
      const selectedGoal = state.createdGoals.find(goal => goal.id === action.payload);

      if(selectedGoal && !selectedGoal.isCompleted) {
        selectedGoal.isCurrentGoal = true;
      }
    },

    saveGoal: (state) => {
      const currentGoal = state.createdGoals.find(goal => goal.isCurrentGoal);
      if(currentGoal) {
        currentGoal.isCurrentGoal = false;
      }
    },

  },
})

export const { setGoal, completeSession, resetGoal, completeCurrentGoal, switchCurrentGoal, saveGoal } = goalSlice.actions
export default goalSlice.reducer


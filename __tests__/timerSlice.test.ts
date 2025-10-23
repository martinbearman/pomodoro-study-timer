import { describe, it, expect } from 'vitest'
import timerReducer, { 
  start, 
  pause, 
  reset, 
  toggleMode,
  setStudyDuration,
  setBreakDuration
} from '@/store/slices/timerSlice'

/**
 * Redux Slice Tests
 * 
 * These tests demonstrate how to test Redux reducers.
 * We test that actions properly update the state.
 */

describe('timerSlice', () => {
  const initialState = {
    timeRemaining: 1500,
    isRunning: false,
    isBreak: false,
    studyDuration: 1500,
    breakDuration: 420,
  }

  it('should return initial state', () => {
    expect(timerReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle start action', () => {
    const actual = timerReducer(initialState, start())
    expect(actual.isRunning).toBe(true)
  })

  it('should handle pause action', () => {
    const runningState = { ...initialState, isRunning: true }
    const actual = timerReducer(runningState, pause())
    expect(actual.isRunning).toBe(false)
  })

  it('should handle reset action', () => {
    const modifiedState = { 
      ...initialState, 
      timeRemaining: 500,
      isRunning: true 
    }
    const actual = timerReducer(modifiedState, reset())
    
    expect(actual.isRunning).toBe(false)
    expect(actual.timeRemaining).toBe(1500) // Reset to study duration
  })


  it('should handle toggleMode action', () => {
    const actual = timerReducer(initialState, toggleMode())
    
    expect(actual.isBreak).toBe(true)
    expect(actual.timeRemaining).toBe(420) // Break duration
    expect(actual.isRunning).toBe(false)
  })

  it('should handle setStudyDuration action', () => {
    const actual = timerReducer(initialState, setStudyDuration(30))
    
    expect(actual.studyDuration).toBe(1800) // 30 minutes in seconds
    expect(actual.timeRemaining).toBe(1800) // Updated since in study mode
  })

  it('should handle setBreakDuration action', () => {
    const breakState = { ...initialState, isBreak: true }
    const actual = timerReducer(breakState, setBreakDuration(10))
    
    expect(actual.breakDuration).toBe(600) // 10 minutes in seconds
    expect(actual.timeRemaining).toBe(600) // Updated since in break mode
  })
})


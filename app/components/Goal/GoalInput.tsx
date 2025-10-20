'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { createGoal, clearCurrentGoal } from '@/store/slices/goalSlice';
import { start, pause, reset } from '@/store/slices/timerSlice';

export default function GoalInput() {
  const dispatch = useAppDispatch();
  const [goalText, setGoalText] = useState('');
  const isRunning = useAppSelector(state => state.timer.isRunning);
  const timeRemaining = useAppSelector(state => state.timer.timeRemaining)
  
  // Get current goal using currentGoalId
  const currentGoalId = useAppSelector(state => state.goal.currentGoalId);
  const currentGoal = useAppSelector(state => 
    state.goal.goals.find(goal => goal.id === currentGoalId)
  );

  const handleStartSession = () => {
    dispatch(createGoal(goalText));  // Just pass the description
    dispatch(reset());
    dispatch(start());
    setGoalText('');
  }

  const handlePauseSession = () => {
    dispatch(pause());
  }

  const handleResumeSession = () => {
    dispatch(start());
  }

  const handleStartNewSession = () => {
    dispatch(reset())
    dispatch(start())
  }

  const handleGetButtonText = () => {
    if (isRunning) {
      return 'Pause';
    }
    if (currentGoal) {
      return timeRemaining === 0 ? 'Start New Session' : 'Resume'
    }
    return 'Start Study Session';
  }

  const handleSaveForLater = () => {
    dispatch(clearCurrentGoal())
    dispatch(reset())
  }

  const isButtonDisabled = !currentGoal && goalText.trim() === '';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Current Goal Display */}
      <div className="text-center">
        <h2 className="text-sm text-red-500 uppercase tracking-wide mb-2">Current Goal</h2>
        {currentGoal 
          ? <p className="text-1xl font-bold text-blue-600">{currentGoal.goalDescription}</p>
          : <p className="text-3xl font-bold text-slate-300">No goal set yet</p>
        }    
      </div>

      {/* Goal Input Section */}
      <div className="space-y-4">
        {!currentGoal && (
          <input
            type="text"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Enter your next goal..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        )}
        
        <button 
          onClick={
            isRunning 
              ? handlePauseSession 
              : currentGoal 
                ? (timeRemaining === 0 ? handleStartNewSession : handleResumeSession)
                : handleStartSession
          } 
          disabled={isButtonDisabled}
          className="disabled:text-gray-500 disabled:bg-red-100 w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
        >
          {handleGetButtonText()}
        </button>
        
        {!isRunning && currentGoal && timeRemaining !== 0 && (
          <button 
            onClick={handleSaveForLater}
            className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Save for Later
          </button>
        )}
      </div>
    </div>
  )
}
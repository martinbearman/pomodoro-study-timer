'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { createGoal, clearCurrentGoal, completeSession } from '@/store/slices/goalSlice';
import { start, pause, reset } from '@/store/slices/timerSlice';
import { store } from '@/store/store';

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
  // Check if the button is disabled based on the current state
  const isButtonDisabled = !currentGoal && goalText.trim() === '';
  // Start a new session
  const handleStartSession = () => {
    dispatch(createGoal(goalText));  // Just pass the description
    dispatch(reset());
    dispatch(start());
    setGoalText('');
  }
  // Pause the current session
  const handlePauseSession = () => {
    dispatch(pause());
  }
  // Resume the current session
  const handleResumeSession = () => {
    dispatch(start());
  }
  // Start a new session
  const handleStartNewSession = () => {
    dispatch(reset())
    dispatch(start())
  }
  // Get the button text based on the current state
  const handleGetButtonText = () => {
    if (isRunning) {
      return 'Pause';
    }
    if (currentGoal) {
      return timeRemaining === 0 ? 'Start New Session' : 'Resume'
    }
    return 'Start Study Session';
  }
  // Save the current session and start a new one
  const handleSaveForLater = () => {
    const state = store.getState();
    const elapsedTime = state.timer.studyDuration - state.timer.timeRemaining;
    
    dispatch(completeSession({
      duration: elapsedTime,
      completed: true
    }))
    
    dispatch(clearCurrentGoal())
    dispatch(reset())
    console.log("handleSaveForLater called");
  }

  // Get the button click handler based on the current state
  const getButtonClickHandler = () => {
    if (isRunning) {
      return handlePauseSession;
    }
    if (currentGoal) {
      return timeRemaining === 0 ? handleStartNewSession : handleResumeSession;
    }
    return handleStartSession;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goalText.trim() !== '') {
      handleStartSession();
    }
  }

  return (
     <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Current Goal Display */}
      <div className="text-center mt-4">
        {currentGoal && (
          <p className="text-3xl text-red-600">{currentGoal.goalDescription}</p>
        )}
      </div>

      {/* Goal Input Section */}
      <div className="space-y-4">
        {!currentGoal && (
          <input
            type="text"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your next goal..."
            className="w-full px-6 py-4 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-red-500"
          />
        )}
        
        <button 
          onClick={getButtonClickHandler()}
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
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { setGoal } from '@/store/slices/goalSlice';
import { start, pause, reset } from '@/store/slices/timerSlice';
import { current } from '@reduxjs/toolkit';

export default function GoalInput() {
    const dispatch = useAppDispatch();
    const [goalText, setGoalText] = useState('');
    const studyDuration = useAppSelector(state => state.timer.studyDuration);
    const isRunning = useAppSelector(state => state.timer.isRunning);
    const currentGoal = useAppSelector(state => 
        state.goal.createdGoals.find(goal => goal.isCurrentGoal)
    )
    const isButtonDisabled = goalText.trim() === '' && !isRunning;

    const handleStartSession = () => {
        dispatch(setGoal({ description: goalText, duration: studyDuration }));
        dispatch(reset());  // Reset timer first
        dispatch(start());
        setGoalText('');
    }
    const handlePauseSession = () => {
        dispatch(pause());
    }

    const handleResumeSession = () => {
        dispatch(start());
    }
  
    return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Current Goal Display - shown when there's an active goal */}
      <div className="text-center">
        <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">Current Goal</h2>
        {currentGoal 
          ? <p className="text-1xl font-bold text-blue-600">{currentGoal.goalDescription }</p>
          : <p className="text-3xl font-bold text-slate-300">No goal set yet</p>}    
      </div>

      {/* Goal Input Section */}
      <div className="space-y-4">
        <input
          disabled={isRunning}
          type="text"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          placeholder="Enter your next goal..."
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        
        <button 
            onClick={
              isRunning 
                ? handlePauseSession 
                : (currentGoal) 
                  ? handleResumeSession 
                  : handleStartSession
            } 
            disabled={isButtonDisabled && !currentGoal}
            className="disabled:text-gray-500 disabled:bg-gray-200 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
            {isRunning 
              ? 'Pause' 
              : currentGoal 
                ? 'Resume' 
                : 'Start Study Session'
            } 
        </button>
      </div>
    </div>
  )
}


'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { setGoal } from '@/store/slices/goalSlice';
import { start, pause } from '@/store/slices/timerSlice';

export default function GoalInput() {
    const dispatch = useAppDispatch();
    const [goalText, setGoalText] = useState('');
    const studyDuration = useAppSelector(state => state.timer.studyDuration);
    const isRunning = useAppSelector(state => state.timer.isRunning);
    const currentGoal = useAppSelector(state => 
        state.goal.createdGoals.find(goal => goal.isCurrentGoal)
    )

    const handleStartSession = () => {
        dispatch(setGoal({ description: goalText, duration: studyDuration }));
        dispatch(start());
    }
    const handlePauseSession = () => {
        dispatch(pause());
    }
  
    return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Current Goal Display - shown when there's an active goal */}
      <div className="text-center">
        <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">Current Goal</h2>
        <p className="text-3xl font-bold text-blue-600">
            {currentGoal ? currentGoal.goalDescription : 'No goal set'}
        </p>
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
        
        <button onClick={isRunning ? handlePauseSession : handleStartSession} className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
          {isRunning ? 'Pause' : 'Start Study Session'} 
        </button>
      </div>
    </div>
  )
}


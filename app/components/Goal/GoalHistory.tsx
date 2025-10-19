'use client'

import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { formatTime, formatTimeStamp, isToday } from '@/lib/utils'
import { setCurrentGoal } from '@/store/slices/goalSlice'
import { setTimeRemaining } from '@/store/slices/timerSlice'

export default function GoalHistory() {
  const goals = useAppSelector(state => state.goal.goals)
  const sessions = useAppSelector(state => state.goal.sessions)
  const currentGoalId = useAppSelector(state => state.goal.currentGoalId)
  const isRunning = useAppSelector(state => state.timer.isRunning)
  const dispatch = useAppDispatch()

  const sortedGoals = [...goals].sort((a, b) => b.goalTimeStamp - a.goalTimeStamp)

  const handleGoalClick = (goalId: string) => {
    // Only allow switching if timer is NOT running
    if (!isRunning && goalId !== currentGoalId) {
      // Switch to this goal
      dispatch(setCurrentGoal(goalId))
      
      // Reset timer to full duration when switching goals
      const studyDuration = useAppSelector.getState?.()?.timer?.studyDuration || 1500
      dispatch(setTimeRemaining(studyDuration))
    }
  }

  // Count sessions per goal
  const getSessionCount = (goalId: string) => {
    return sessions.filter(s => s.goalId === goalId).length
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Goal History</h2>
      {sortedGoals.length === 0 ? (
        <p>Set a goal!</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 text-left font-semibold border-b'>Goal</th>
                <th className='px-4 py-2 text-left font-semibold border-b'>Created</th>
                <th className='px-4 py-2 text-left font-semibold border-b'>Total Time</th>
                <th className='px-4 py-2 text-left font-semibold border-b'>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {sortedGoals.map((goal, index) => (
                <tr 
                  key={goal.id}
                  onClick={() => handleGoalClick(goal.id)}
                  className={`cursor-pointer hover:opacity-80 ${
                    goal.id === currentGoalId
                      ? 'bg-blue-200 font-semibold'  // Highlight current goal
                      : index % 2 === 0 
                        ? 'bg-blue-50' 
                        : 'bg-white'
                  }`}
                >
                  <td className='px-3 py-2 border-b'>{goal.goalDescription}</td>
                  <td className='px-3 py-2 border-b text-gray-600 text-sm' suppressHydrationWarning>
                    {formatTimeStamp(goal.goalTimeStamp)} {isToday(goal.goalTimeStamp) ? '(today)' : ''}
                  </td>
                  <td className='px-3 py-2 border-b text-gray-600'>{formatTime(goal.totalTimeStudied)}</td>
                  <td className='px-3 py-2 border-b text-gray-600'>{getSessionCount(goal.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
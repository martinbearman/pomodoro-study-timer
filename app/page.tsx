'use client'

/**
 * Home Page
 * 
 * This is the main page of your app (route: /)
 * It's a client component because it uses Redux hooks and state.
 * 
 * For now, this is a placeholder. You'll build the actual
 * timer components in the next phase!
 */

import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { loadGoals, loadSessions } from '../store/slices/goalSlice'
import TimerDisplay from './components/Timer/TimerDisplay';
import GoalInput from './components/Goal/GoalInput';
import GoalHistory from './components/Goal/GoalHistory';
import BreakSettings from './components/Settings/BreakSettings';

export default function Home() {
  const dispatch = useAppDispatch()

  // Load goals and sessions from database on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [goalsRes, sessionsRes] = await Promise.all([
          fetch('/api/goals'),
          fetch('/api/sessions')
        ])

        if (goalsRes.ok) {
          const { goals } = await goalsRes.json()
          dispatch(loadGoals(goals))
        }

        if (sessionsRes.ok) {
          const { sessions } = await sessionsRes.json()
          dispatch(loadSessions(sessions))
        }
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [dispatch])

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        
        {/* Settings Header */}
        <div className="flex justify-end mb-4">
          <BreakSettings />
        </div>
        
        {/* Two-column layout: Timer on left, Goals on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Timer */}
          <div className="card text-center">
            <div className="p-0">
              <TimerDisplay />
            </div>
            <div>
              <GoalInput />
            </div>
          </div>

          {/* Right Column - Goals */}
          <div className="space-y-6">
            <div className="card bg-gray-50">
              <GoalHistory />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}


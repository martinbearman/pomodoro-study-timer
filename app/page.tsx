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

import TimerDisplay from './components/Timer/TimerDisplay';
import GoalInput from './components/Goal/GoalInput';
import GoalHistory from './components/Goal/GoalHistory';

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="card max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4 text-blue-500">
          📚 Study Timer
        </h1>
        
        <p className="text-lg text-gray-500 mb-8">
          Your Pomodoro-style study companion
        </p>

        <div className="mb-8">
          <GoalInput />
        </div>
        
        <div className="p-8 bg-gray-50 rounded-2xl mb-8">
          <TimerDisplay />
        </div>        

        <div className="p-8 bg-gray-50 rounded-2xl mb-8">
          <GoalHistory />
        </div>
      </div>
    </main>
  )
}


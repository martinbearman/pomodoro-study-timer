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
        
        <div className="p-8 bg-gray-50 rounded-2xl mb-8">
          <TimerDisplay />
        </div>
        
        <div className="flex gap-4 justify-center mb-8">
          <button className="button">
            Start
          </button>
          <button className="button bg-gray-500">
            Reset
          </button>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-2xl text-left">
          <label className="block text-sm font-medium mb-2 text-gray-500">
            Today's Study Goal
          </label>
          <input 
            className="input w-full"
            type="text"
            placeholder="What are you studying today?"
          />
        </div>
      </div>
    </main>
  )
}


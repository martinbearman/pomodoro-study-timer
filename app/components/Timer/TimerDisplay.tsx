'use client'

import { formatTime, playSound } from '@/lib/utils'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setTimeRemaining, pause, startBreak, skipBreak, hideBreakPrompt, updateElapsedTime } from '@/store/slices/timerSlice'
import { useEffect, useRef } from 'react'
import useSound from 'use-sound'
import Image from 'next/image'

export default function TimerDisplay() {
  const [playComplete, { stop }] = useSound('/sounds/timer-ring.mp3')
  const { timeRemaining, isRunning, studyDuration, breakDuration, isBreak, showBreakPrompt } = useAppSelector(state => state.timer)
  const dispatch = useAppDispatch()
  const formattedTime = formatTime(timeRemaining)
  const startTimeRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(Date.now())

  // Calculate elapsed time and update timer
  const updateTimer = () => {
    if (!isRunning || !startTimeRef.current) return

    const now = Date.now()
    const elapsed = Math.floor((now - startTimeRef.current) / 1000)
    const totalDuration = isBreak ? breakDuration : studyDuration
    const newTimeRemaining = Math.max(0, totalDuration - elapsed)
    
    if (newTimeRemaining !== timeRemaining) {
      dispatch(setTimeRemaining(newTimeRemaining))
      // Update elapsed time in state
      dispatch(updateElapsedTime(elapsed))
    }

    // Stop timer if it reaches 0
    if (newTimeRemaining === 0 && isRunning) {
      dispatch(pause()) // Stop the timer
    }
  }

  // Update timer every second
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      // Set start time when timer starts
      if (!startTimeRef.current) {
        const totalDuration = isBreak ? breakDuration : studyDuration
        startTimeRef.current = Date.now() - (totalDuration - timeRemaining) * 1000
      }
      
      intervalId = setInterval(updateTimer, 1000)
    } else {
      // Reset start time when timer stops
      startTimeRef.current = null
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, dispatch, timeRemaining, studyDuration, breakDuration, isBreak])

  // Handle visibility change to update timer when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isRunning) {
        // Tab became visible, update timer immediately
        updateTimer()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isRunning, timeRemaining, studyDuration, breakDuration, isBreak])

  // Play sound when timer reaches 15 seconds
  // Specicifially for timer-ring.mp3
  useEffect(() => {
    if(timeRemaining === 15) {
      playComplete()
    }
  }, [timeRemaining, playComplete])

  // Stop sound when timer is paused
  useEffect(() => {
    if (!isRunning && timeRemaining <= 10) {
      stop()
    }
  }, [isRunning, timeRemaining, stop])

  // Handle break prompt actions
  const handleStartBreak = () => {
    dispatch(startBreak())
  }

  const handleSkipBreak = () => {
    dispatch(skipBreak())
  }

  return (
    <div className="text-center">
      {/* Break Prompt Modal */}
      {showBreakPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Study Session Complete! 🎉</h3>
            <p className="text-gray-600 mb-6">Great work! Would you like to take a break?</p>
            <div className="space-y-3">
              <button
                onClick={handleStartBreak}
                className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                Start {Math.floor(breakDuration / 60)}-min Break
              </button>
              <button
                onClick={handleSkipBreak}
                className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Skip Break & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Image 
          src="/icons/tomato-timer.png" 
          alt="Timer" 
          width={300}
          height={300}
          className="max-w-[300px] h-auto object-contain mx-auto" 
          priority
        />
        <hr className="w-full border-t-[15px]" />
        <p className="absolute top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold font-mono text-white drop-shadow-lg">
          {formattedTime}
        </p>
        
        {/* Break Mode Indicator */}
        {isBreak && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Break Time
          </div>
        )}
      </div>
    </div>
  )
}
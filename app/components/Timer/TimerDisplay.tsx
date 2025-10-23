'use client'

import { formatTime, playSound } from '@/lib/utils'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setTimeRemaining, pause } from '@/store/slices/timerSlice'
import { useEffect, useRef } from 'react'
import useSound from 'use-sound'
import Image from 'next/image'

export default function TimerDisplay() {
  const [playComplete, { stop }] = useSound('/sounds/timer-ring.mp3')
  const { timeRemaining, isRunning, studyDuration, breakDuration, isBreak } = useAppSelector(state => state.timer)
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

  return (
    <div className="text-center">
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
      </div>
    </div>
  )
}
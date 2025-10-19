'use client'

import { formatTime, playSound } from '@/lib/utils'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { tick } from '@/store/slices/timerSlice'
import { useEffect } from 'react'

export default function TimerDisplay() {
  const { timeRemaining, isRunning } = useAppSelector(state => state.timer)
  const dispatch = useAppDispatch()
  const formattedTime = formatTime(timeRemaining)

  // Update timer every second
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if(isRunning) {
        intervalId = setInterval(() => {
            dispatch(tick())
        }, 1000)        
    } 

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }

  }, [isRunning, dispatch])

  // Play sound when timer reaches 0
  useEffect(() => {
    if(timeRemaining === 0) {
      playSound('complete')
    }
  }, [timeRemaining])

  return (<>
        <div className="relative inline-block">
            <img src="/icons/tomato-timer.png" alt="Timer" className="max-w-[300px] h-auto object-contain" />
            <p className="absolute top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold font-mono text-white drop-shadow-lg">{formattedTime}</p>
        </div>
    </>)
}
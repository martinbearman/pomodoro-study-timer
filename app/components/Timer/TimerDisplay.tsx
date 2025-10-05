'use client'

import { formatTime } from '@/lib/utils'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { tick } from '@/store/slices/timerSlice'
import { useEffect } from 'react'

export default function TimerDisplay() {
  const { timeRemaining, isRunning, isBreak } = useAppSelector(state => state.timer)
  const dispatch = useAppDispatch()
  const formattedTime = formatTime(timeRemaining)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if(isRunning) {
        intervalId = setInterval(() => {
            dispatch(tick())
        }, 1000)        
    } 

    return () => clearInterval(intervalId as NodeJS.Timeout)

  }, [isRunning])

  return (<>
        <div className="text-6xl font-bold font-mono text-blue-500">
            <h2 className="text-center">{formattedTime}</h2>
        </div>
        <p className="text-sm text-gray-500 mt-2">
            Study Session
        </p>
    </>)
}
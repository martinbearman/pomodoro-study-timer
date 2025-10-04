'use client'

import { formatTime } from '@/lib/utils'
import { useAppSelector } from '@/store/hooks'

export default function TimerDisplay() {
  const { timeRemaining, isRunning, isBreak } = useAppSelector(state => state.timer)

  const formattedTime = formatTime(timeRemaining)

  return (<>
        <div className="text-6xl font-bold font-mono text-blue-500">
            {formattedTime}
        </div>
        <p className="text-sm text-gray-500 mt-2">
            Study Session
        </p>
    </>)
}
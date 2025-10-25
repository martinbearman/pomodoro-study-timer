'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setBreakMode, setBreakDuration } from '@/store/slices/timerSlice'
import { useState } from 'react'

export default function BreakSettings() {
  const dispatch = useAppDispatch()
  const { breakMode, breakDuration } = useAppSelector(state => state.timer)
  const [isOpen, setIsOpen] = useState(false)

  const handleBreakModeChange = (mode: 'automatic' | 'manual' | 'none') => {
    dispatch(setBreakMode(mode))
  }

  const handleBreakDurationChange = (minutes: number) => {
    dispatch(setBreakDuration(minutes))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
      >
        ⚙️ Break Settings
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-10">
          <h3 className="font-semibold text-lg mb-4">Break Settings</h3>
          
          {/* Break Mode Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Break Mode
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="breakMode"
                  value="automatic"
                  checked={breakMode === 'automatic'}
                  onChange={() => handleBreakModeChange('automatic')}
                  className="mr-2"
                />
                <span className="text-sm">Automatic - Start break immediately</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="breakMode"
                  value="manual"
                  checked={breakMode === 'manual'}
                  onChange={() => handleBreakModeChange('manual')}
                  className="mr-2"
                />
                <span className="text-sm">Manual - Ask before starting break</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="breakMode"
                  value="none"
                  checked={breakMode === 'none'}
                  onChange={() => handleBreakModeChange('none')}
                  className="mr-2"
                />
                <span className="text-sm">None - No automatic breaks</span>
              </label>
            </div>
          </div>

          {/* Break Duration */}
          {breakMode !== 'none' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Break Duration (minutes)
              </label>
              <select
                value={Math.floor(breakDuration / 60)}
                onChange={(e) => handleBreakDurationChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value={1}>1 minute</option>
                <option value={2}>2 minutes</option>
                <option value={3}>3 minutes</option>
                <option value={5}>5 minutes</option>
                <option value={7}>7 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
              </select>
            </div>
          )}

          <div className="text-xs text-gray-500">
            {breakMode === 'automatic' && 'Breaks will start automatically after each study session.'}
            {breakMode === 'manual' && 'You\'ll be asked if you want to take a break after each study session.'}
            {breakMode === 'none' && 'No breaks will be suggested. You control when to start the next session.'}
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import {useState} from 'react'
import {useAppSelector, useAppDispatch} from '@/store/hooks'
import { formatTime, formatTimeStamp, isToday} from '@/lib/utils'
import { Goal } from '@/store/slices/goalSlice'
import { switchCurrentGoal, setGoal } from '@/store/slices/goalSlice'
import { setTimeRemaining } from '@/store/slices/timerSlice'

export default function GoalHistory() {

    const goals = useAppSelector(state => state.goal.createdGoals)
    //const [isOpen, setIsOpen] = useState(false)
    // const [expandedId, setExpandedId] = useState<string | null>(null)
    const sortedGoals = [...goals].sort((a, b) => b.goalTimeStamp - a.goalTimeStamp)
    const isRunning = useAppSelector(state => state.timer.isRunning)
    const dispatch = useAppDispatch()

    const handleGoalClick = (goal: Goal) => {
        if(!(goal.isCurrentGoal && isRunning) && !goal.isCompleted) {
            // Get the remaining time for the clicked goal
            const remainingTime = goal.durationSet - goal.durationStudied
            
            // Set the current goal to the clicked goal
            dispatch(switchCurrentGoal(goal.id))
            
            //console.log('goal clicked', goal.id)
            dispatch(setTimeRemaining(remainingTime))
        }
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
                                <th className='px-4 py-2 text-left font-semibold border-b'>Date</th>
                                <th className='px-4 py-2 text-left font-semibold border-b'>Target</th>
                                <th className='px-4 py-2 text-left font-semibold border-b'>Studied</th>
                                <th className='px-4 py-2 text-left font-semibold border-b'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedGoals.map((goal, index) => (
                                <tr 
                                    key={goal.id}
                                    onClick={() => handleGoalClick(goal)}
                                    className={`cursor-pointer hover:opacity-80 ${
                                        goal.isCompleted 
                                            ? 'bg-green-100' 
                                            : index % 2 === 0 
                                            ? 'bg-blue-50' 
                                            : 'bg-white'
                                    }`}
                                >
                                    <td className='px-3 py-2 border-b font-medium'>{goal.goalDescription}</td>
                                    <td className='px-3 py-2 border-b text-gray-600 text-sm' suppressHydrationWarning>
                                        {formatTimeStamp(goal.goalTimeStamp)} {isToday(goal.goalTimeStamp) ? '(today)' : ''}
                                    </td>
                                    <td className='px-3 py-2 border-b text-gray-600'>{formatTime(goal.durationSet)}</td>
                                    <td className='px-3 py-2 border-b text-gray-600'>{formatTime(goal.durationStudied)}</td>
                                    <td className='px-3 py-2 border-b'>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            goal.isCompleted 
                                                ? 'bg-green-200 text-green-800' 
                                                : 'bg-yellow-200 text-yellow-800'
                                        }`}>
                                            {goal.isCompleted ? 'Completed' : 'In Progress'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )

}


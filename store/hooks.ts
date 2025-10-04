import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

/**
 * Typed Redux Hooks
 * 
 * These are typed versions of the standard Redux hooks.
 * Using these instead of the plain useDispatch and useSelector
 * gives you full TypeScript support and autocomplete!
 * 
 * Usage:
 * const dispatch = useAppDispatch()  // Instead of useDispatch()
 * const time = useAppSelector(state => state.timer.timeRemaining)
 */

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Use throughout your app instead of plain `useSelector`
export const useAppSelector = useSelector.withTypes<RootState>()


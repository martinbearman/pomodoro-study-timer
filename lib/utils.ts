/**
 * Utility Functions
 * 
 * Helper functions used throughout the app.
 * Keeping them in a separate file makes them:
 * - Reusable
 * - Testable
 * - Easy to maintain
 */

/**
 * Format seconds into MM:SS format
 * 
 * @param seconds - Total seconds to format
 * @returns Formatted time string (e.g., "25:00", "05:30")
 * 
 * Example:
 * formatTime(1500) => "25:00"
 * formatTime(90) => "01:30"
 * formatTime(5) => "00:05"
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Convert minutes to seconds
 * 
 * @param minutes - Number of minutes
 * @returns Number of seconds
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60
}

/**
 * Convert seconds to minutes (rounded)
 * 
 * @param seconds - Number of seconds
 * @returns Number of minutes
 */
export function secondsToMinutes(seconds: number): number {
  return Math.round(seconds / 60)
}

/**
 * Play a notification sound
 * Uses the browser's Audio API
 * 
 * @param soundType - Type of sound to play ('complete' or 'tick')
 */
export function playSound(soundType: 'complete' | 'tick' = 'complete'): void {
  if (typeof window === 'undefined') return // Server-side check
  
  // For now, we'll use the browser's beep
  // In production, you'd load an actual sound file
  const context = new AudioContext()
  const oscillator = context.createOscillator()
  const gainNode = context.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(context.destination)
  
  if (soundType === 'complete') {
    oscillator.frequency.value = 800 // Higher pitch for completion
    gainNode.gain.value = 0.3
    oscillator.start()
    oscillator.stop(context.currentTime + 0.3)
  } else {
    oscillator.frequency.value = 400 // Lower pitch for tick
    gainNode.gain.value = 0.1
    oscillator.start()
    oscillator.stop(context.currentTime + 0.05)
  }
}

/**
 * Get a motivational message based on completed sessions
 * 
 * @param sessions - Number of completed sessions
 * @returns A motivational message
 */
export function getMotivationalMessage(sessions: number): string {
  if (sessions === 0) {
    return "Let's get started! 🚀"
  } else if (sessions === 1) {
    return "Great start! Keep going! 💪"
  } else if (sessions < 4) {
    return "You're on a roll! 🔥"
  } else if (sessions < 8) {
    return "Incredible focus! 🌟"
  } else {
    return "You're a study machine! 🏆"
  }
}

/**
 * Format total study time into a human-readable string
 * 
 * @param seconds - Total seconds studied
 * @returns Formatted string (e.g., "2h 30m", "45m")
 */
export function formatStudyTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}


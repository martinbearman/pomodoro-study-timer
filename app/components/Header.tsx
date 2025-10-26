'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

/**
 * Header Component
 * 
 * A full-width header with an inner container that matches the content width.
 * This ensures the header spans the full viewport width while keeping content aligned.
 */

export default function Header() {
  const { data: session, status } = useSession()

  // Extract first name from full name
  const getFirstName = (name: string | null | undefined) => {
    if (!name) return null
    return name.split(' ')[0]
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-4">
            <h1 className="text-2xl text-red-600">
              Temporizador Pomodoro
            </h1>
            
            {/* User Session Info */}
            {status === 'loading' ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : session ? (
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-semibold text-green-700">{getFirstName(session.user?.name) || session.user?.email}</span>! You are logged in.
              </span>
            ) : (
              <span className="text-sm text-gray-600">
                Not logged in. <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 underline">Sign in</Link> or <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 underline">sign up</Link>
              </span>
            )}
          </div>
          
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

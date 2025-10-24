import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'

import './globals.css'
import { Providers } from './providers'
import Header from './components/Header'
import Footer from './components/Footer'

/**
 * Font Configuration
 * Next.js automatically optimizes fonts!
  */
  const lexend = Lexend({ subsets: ['latin'] })
/**
 * Metadata for SEO
 * This appears in the browser tab and search results
 */
export const metadata: Metadata = {
  title: 'Study Timer - Focus & Learn',
  description: 'A Pomodoro-style study timer to help you stay focused and productive',
}

/**
 * Root Layout
 * 
 * This is the root layout component for your Next.js app.
 * It wraps all pages and is the perfect place to:
 * - Add global providers (like Redux Provider)
 * - Include global navigation/headers
 * - Add global styles
 * 
 * The {children} prop will be replaced with each page's content
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}


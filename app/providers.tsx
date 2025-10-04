'use client'

import { Provider } from 'react-redux'
import { store } from '@/store/store'

/**
 * Providers Component
 * 
 * This component wraps the app with necessary providers.
 * It's separated from layout.tsx because providers need
 * to be client components (they use React hooks and state).
 * 
 * The 'use client' directive tells Next.js this is a client
 * component, not a server component.
 * 
 * Why separate file?
 * - Keeps server components (layout.tsx) and client components separate
 * - Better code organization
 * - Allows layout to remain a server component for better performance
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}


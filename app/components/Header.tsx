/**
 * Header Component
 * 
 * A full-width header with an inner container that matches the content width.
 * This ensures the header spans the full viewport width while keeping content aligned.
 */

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-red-600">
            Temporizador Pomodoro
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Timer
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Goals
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Settings
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

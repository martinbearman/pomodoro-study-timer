/**
 * Footer Component
 * 
 * A full-width footer with an inner container that matches the content width.
 * This ensures the footer spans the full viewport width while keeping content aligned.
 */

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © 2025 Study Timer. Built with Next.js and Redux Toolkit.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

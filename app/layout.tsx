import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Contact Manager - Advanced Contact Management',
  description: 'A powerful contact management application with advanced features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <footer className="bg-gray-800 dark:bg-black text-white py-12 mt-20 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact Manager Pro</h3>
                  <p className="text-gray-400 text-sm">
                    Advanced contact management with powerful features for professionals.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Features</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>Smart Search</li>
                    <li>Analytics Dashboard</li>
                    <li>Dark Mode</li>
                    <li>Tags & Categories</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                    <li><a href="/contacts" className="hover:text-white transition-colors">All Contacts</a></li>
                    <li><a href="/import" className="hover:text-white transition-colors">Import/Export</a></li>
                    <li><a href="/settings" className="hover:text-white transition-colors">Settings</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                  <p className="text-gray-400 text-sm mb-4">Get tips and updates about new features</p>
                  <form className="flex">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:bg-gray-600"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; 2024 Contact Manager Pro.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
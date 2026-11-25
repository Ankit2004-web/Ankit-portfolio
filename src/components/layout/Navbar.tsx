import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { navLinks } from '@/data/site'
import { ResumeButton } from '@/components/common/ResumeButton'
import { siteConfig } from '@/data/site'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useTheme } from '@/hooks/useTheme'
import { cn, scrollToSection } from '@/lib/utils'

export function Navbar() {
  const scrolled = useScrollPosition(50)
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    setActiveSection(id)
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <nav
          className={cn(
            'container-custom mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300',
            scrolled
              ? 'glass rounded-2xl py-2 shadow-lg shadow-black/10'
              : 'bg-transparent py-2',
          )}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick('#home')}
              className="text-lg font-semibold hover:opacity-90 transition-opacity"
              aria-label="Go to home"
            >
              <span className="text-gradient">{siteConfig.name}</span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'px-3 py-2 text-sm rounded-lg transition-all duration-200',
                    activeSection === link.href.replace('#', '')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted hover:text-foreground hover:bg-white/5',
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <ResumeButton size="sm" label="Resume" icon="file" className="hidden sm:inline-flex" />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden glass rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-left text-sm rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <ResumeButton className="mt-2 w-full" label="Download Resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

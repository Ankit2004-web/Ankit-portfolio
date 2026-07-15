import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  Code2,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Trophy,
  Mail,
  FileDown,
  Moon,
  Sun,
  Search,
} from 'lucide-react'
import { navLinks } from '@/data/site'
import { useResumeAvailability, downloadResume } from '@/hooks/useResume'
import { useTheme } from '@/hooks/useTheme'
import { scrollToSection } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  About: <User className="w-4 h-4" />,
  Skills: <Code2 className="w-4 h-4" />,
  Projects: <FolderOpen className="w-4 h-4" />,
  Experience: <Briefcase className="w-4 h-4" />,
  Education: <GraduationCap className="w-4 h-4" />,
  Achievements: <Trophy className="w-4 h-4" />,
  Contact: <Mail className="w-4 h-4" />,
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const resumeAvailable = useResumeAvailability()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    const id = href.replace('#', '')
    scrollToSection(id)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-[201] w-full max-w-lg -translate-x-1/2"
          >
            <Command className="rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 border-b border-white/10">
                <Search className="w-4 h-4 text-muted shrink-0" />
                <Command.Input
                  placeholder="Search sections, actions..."
                  className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted"
                />
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 text-[10px] text-muted">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>
                <Command.Group heading="Navigation" className="text-xs text-muted px-2 py-1.5">
                  {navLinks.map((link) => (
                    <Command.Item
                      key={link.href}
                      onSelect={() => handleSelect(link.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer aria-selected:bg-white/10 transition-colors"
                    >
                      {iconMap[link.label]}
                      {link.label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Actions" className="text-xs text-muted px-2 py-1.5">
                  <Command.Item
                    onSelect={() => {
                      if (resumeAvailable) {
                        downloadResume()
                      }
                      setOpen(false)
                    }}
                    disabled={!resumeAvailable}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer aria-selected:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileDown className="w-4 h-4" />
                    {resumeAvailable ? 'Download Resume' : 'Resume — Coming Soon'}
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      toggleTheme()
                      setOpen(false)
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer aria-selected:bg-white/10"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

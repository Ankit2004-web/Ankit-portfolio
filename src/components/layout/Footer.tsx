import { siteConfig } from '@/data/site'
import { Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/SocialIcons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-surface/30">
      <div className="container-custom section-padding py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-1">
              <span className="text-gradient">{siteConfig.name}</span>
            </p>
            <p className="text-sm text-muted">{siteConfig.title}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React + TypeScript + Tailwind CSS
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}

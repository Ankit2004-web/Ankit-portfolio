import { FileText, ImageIcon, ExternalLink, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Certification } from '@/data/certifications'
import { getCertificateUrl } from '@/data/certifications'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CertificationCardProps {
  certification: Certification
  available: boolean
  index: number
}

function openCertificate(cert: Certification) {
  window.open(getCertificateUrl(cert), '_blank', 'noopener,noreferrer')
}

export function CertificationCard({ certification, available, index }: CertificationCardProps) {
  const TypeIcon = certification.type === 'pdf' ? FileText : ImageIcon

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={available ? { y: -6 } : undefined}
      className={cn(
        'group relative glass rounded-2xl p-6 flex flex-col h-full transition-all duration-300',
        available
          ? 'cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10'
          : 'opacity-80',
      )}
      onClick={available ? () => openCertificate(certification) : undefined}
      onKeyDown={
        available
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openCertificate(certification)
              }
            }
          : undefined
      }
      role={available ? 'link' : 'article'}
      tabIndex={available ? 0 : -1}
      aria-label={
        available
          ? `View certificate: ${certification.title}`
          : `${certification.title} — certificate file coming soon`
      }
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex items-start gap-4 mb-4">
        <div className="p-3 rounded-xl bg-primary/10 shrink-0 group-hover:scale-110 transition-transform duration-300">
          <TypeIcon className="w-6 h-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
            {certification.issuer}
          </p>
          <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">
            {certification.title}
          </h3>
          {certification.date && <p className="text-xs text-muted mt-1">{certification.date}</p>}
        </div>
        {available && (
          <Award className="w-5 h-5 text-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {certification.description && (
        <p className="relative text-sm text-muted leading-relaxed mb-6 flex-1">
          {certification.description}
        </p>
      )}

      <div className="relative mt-auto pt-2">
        {available ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:border-primary/40 group-hover:bg-primary/5"
            onClick={(e) => {
              e.stopPropagation()
              openCertificate(certification)
            }}
          >
            <ExternalLink className="w-4 h-4" />
            View Certificate
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full opacity-60 cursor-not-allowed" disabled>
            Certificate Coming Soon
          </Button>
        )}
      </div>
    </motion.article>
  )
}

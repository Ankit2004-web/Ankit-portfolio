import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { CertificationCard } from '@/components/common/CertificationCard'
import { certificationEntries, getCertificateUrl } from '@/data/certifications'

export function CertificationsSection() {
  const [availableFiles, setAvailableFiles] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let cancelled = false

    const checkFiles = async () => {
      const results: Record<string, boolean> = {}

      await Promise.all(
        certificationEntries.map(async (cert) => {
          try {
            const response = await fetch(getCertificateUrl(cert), { method: 'HEAD' })
            results[cert.id] = response.ok
          } catch {
            results[cert.id] = false
          }
        }),
      )

      if (!cancelled) setAvailableFiles(results)
    }

    checkFiles()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">Certifications</h3>
        </div>
        <p className="text-muted text-center text-sm max-w-xl mx-auto">
          Professional certifications in cloud security, system administration, and business analytics.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {certificationEntries.map((cert, index) => (
          <CertificationCard
            key={cert.id}
            certification={cert}
            available={availableFiles[cert.id] ?? false}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

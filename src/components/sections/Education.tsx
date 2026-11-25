import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { education } from '@/data/education'
import { staggerContainer, staggerItem } from '@/components/animations/variants'
import { cn } from '@/lib/utils'

const schoolBackdrops: Record<string, string> = {
  'KIIT University': 'from-emerald-500 via-green-600 to-teal-700',
  'Gorabazar Iswar Chandra Institution': 'from-zinc-400 via-slate-600 to-zinc-900',
  'Sagarpara High School': 'from-orange-500 via-red-500 to-amber-500',
}

export function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Education"
          title="Academic Background"
          description="From school foundations to university — the academic journey behind my engineering career."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={staggerItem}
              className="group relative h-full overflow-hidden rounded-2xl glass text-center"
            >
              <div className={cn('relative overflow-hidden bg-linear-to-br px-8 pb-8 pt-8', schoolBackdrops[edu.institution] ?? 'from-primary via-secondary to-accent')}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.38),transparent_46%)]" />
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-white/20">
                  {'logo' in edu && edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <GraduationCap className="h-8 w-8 text-primary" />
                  )}
                </div>
              </div>
              <div className="flex h-full flex-col px-8 pb-8 pt-6">
                <h3 className="mb-2 min-h-14 text-xl font-bold leading-snug">{edu.institution}</h3>
                <p className="mb-1 text-base font-medium text-primary">{edu.degree}</p>
                <p className="mb-4 text-sm text-muted">{edu.field}</p>
                <div className="mt-auto flex flex-wrap items-center justify-center gap-3">
                  <span className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-sm text-muted">
                    {edu.period}
                  </span>
                  {'cgpa' in edu && edu.cgpa && (
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                  {'percentage' in edu && edu.percentage && (
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      {edu.percentage}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

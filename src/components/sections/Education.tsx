import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { education } from '@/data/education'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

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
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={staggerItem}
              className="glass rounded-2xl p-8 text-center relative overflow-hidden group h-full"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col h-full">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 p-2 shadow-sm ring-1 ring-white/10">
                  {'logo' in edu && edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <GraduationCap className="w-8 h-8 text-primary" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 leading-snug">{edu.institution}</h3>
                <p className="text-base text-primary font-medium mb-1">{edu.degree}</p>
                <p className="text-muted mb-4 text-sm">{edu.field}</p>
                <div className="flex items-center justify-center gap-3 flex-wrap mt-auto">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-sm text-muted">
                    {edu.period}
                  </span>
                  {'cgpa' in edu && edu.cgpa && (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm text-primary font-medium">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                  {'percentage' in edu && edu.percentage && (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm text-primary font-medium">
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

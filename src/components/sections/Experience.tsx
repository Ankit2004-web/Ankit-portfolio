import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { experiences } from '@/data/experience'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

export function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="Building enterprise solutions and growing as a full stack developer."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {experiences.map((exp) => (
            <motion.div key={exp.company} variants={staggerItem} className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-primary via-secondary to-transparent hidden md:block" />

              <div className="glass rounded-2xl p-6 md:p-8 md:ml-12 relative">
                <div className="absolute -left-0 md:-left-12 top-8 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center hidden md:flex">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

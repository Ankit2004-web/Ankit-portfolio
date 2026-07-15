import { motion } from 'framer-motion'
import { Code2, Trophy, Medal, Crown, Award } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AchievementCard } from '@/components/common/AchievementCard'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { achievements } from '@/data/achievements'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

const categoryConfig = {
  sports: { icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Sports' },
  leadership: { icon: Crown, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Leadership' },
  certificate: { icon: Medal, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Certificate' },
  internship: { icon: Code2, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Internship' },
  award: { icon: Medal, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Award' },
}

export function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Achievements"
          title="Milestones & Recognition"
          description="Sports achievements, leadership roles, and professional certifications. Tap any card to view the certificate."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
        >
          {achievements.map((achievement) => {
            const config = categoryConfig[achievement.category]
            return (
              <motion.div key={achievement.id} variants={staggerItem} className="h-full">
                <AchievementCard achievement={achievement} config={config} />
              </motion.div>
            )
          })}
        </motion.div>

        <CertificationsSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted">Always learning, always growing</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

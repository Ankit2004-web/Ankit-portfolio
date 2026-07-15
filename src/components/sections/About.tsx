import { motion } from 'framer-motion'
import { Code2, Layers, Rocket, Target } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProfileAvatar } from '@/components/common/ProfileAvatar'
import { GlowCard } from '@/components/common/SkillBar'
import { profile } from '@/data/profile'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

const highlights = [
  {
    icon: Code2,
    title: 'Full Stack Developer',
    description: 'Building end-to-end enterprise solutions with React and ASP.NET Core.',
  },
  {
    icon: Layers,
    title: 'Enterprise Software',
    description: 'Crafting robust applications that solve real business problems at scale.',
  },
  {
    icon: Rocket,
    title: 'Scalable Applications',
    description: 'Designing systems with clean architecture and performance in mind.',
  },
  {
    icon: Target,
    title: 'Problem Solver',
    description: 'Strong backend and frontend skills to deliver intuitive user experiences.',
  },
]

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="About Me"
          title={profile.about.heading}
          description={profile.about.subheading}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 blur-2xl" />
                <div className="relative glass rounded-3xl p-8 flex flex-col items-center justify-center h-full">
                  <ProfileAvatar size="lg" className="mb-6" />
                  <h3 className="text-2xl font-bold mb-2">{profile.site.name}</h3>
                  <p className="text-muted text-center">{profile.about.role}</p>
                  <p className="text-sm text-muted mt-2">{profile.site.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {profile.about.paragraphs.map((paragraph, index) => (
              <motion.p key={index} variants={staggerItem} className="text-muted text-lg leading-relaxed">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <GlowCard className="h-full">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SkillBar } from '@/components/common/SkillBar'
import { skillCategories } from '@/data/skills'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

export function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Skills"
          title="Technologies I Work With"
          description="A comprehensive toolkit for building modern, scalable web applications."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="glass rounded-2xl p-6 hover:border-primary/20 transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/SocialIcons'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/data/site'
import { submitContactMessage } from '@/lib/contact'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().max(0, 'Invalid submission').optional(),
})

type ContactForm = z.infer<typeof contactSchema>

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: '' },
  })

  const onSubmit = async (data: ContactForm) => {
    setSubmitError(null)

    try {
      await submitContactMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      })
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please email me directly instead.',
      )
    }
  }

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: siteConfig.location },
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: 'Phone / WhatsApp', value: siteConfig.phone, href: `https://wa.me/${siteConfig.whatsapp}` },
    { icon: GithubIcon, label: 'GitHub', value: siteConfig.githubUsername, href: siteConfig.github },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ankit-biswas-6356a7256',
      href: siteConfig.linkedin,
    },
  ]

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind or want to connect? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-4 rounded-xl glass">
                <div className="p-2 rounded-lg bg-primary/10">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted mb-0.5">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-5"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register('website')}
            />

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" {...register('name')} />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" {...register('email')} />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell me about your project..." {...register('message')} />
              {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
            </div>

            {submitError && (
              <p className="text-red-400 text-sm text-center">{submitError}</p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || submitted}>
              {isSubmitting ? (
                'Sending...'
              ) : submitted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

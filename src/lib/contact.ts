import { profile } from '@/data/profile'

export interface ContactMessage {
  name: string
  email: string
  message: string
}

export async function submitContactMessage(data: ContactMessage): Promise<void> {
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  if (web3FormsKey) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name: data.name,
        email: data.email,
        message: data.message,
        subject: `Portfolio message from ${data.name}`,
        from_name: 'Ankit Biswas Portfolio',
      }),
    })

    const result = (await response.json()) as { success?: boolean; message?: string }
    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'Unable to send your message. Please try again.')
    }
    return
  }

  const recipient = encodeURIComponent(profile.site.email)
  const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: `Portfolio contact from ${data.name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  const result = (await response.json()) as { success?: string | boolean; message?: string }
  const success = result.success === true || result.success === 'true'

  if (!response.ok || !success) {
    throw new Error(result.message ?? 'Unable to send your message. Please try again.')
  }
}

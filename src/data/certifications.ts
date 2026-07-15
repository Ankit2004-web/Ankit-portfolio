/**
 * Certification metadata — add new entries here when you add files to certificates/.
 * Files are auto-synced to public/certificates/ via `npm run sync:certificates`.
 */

export type CertificateType = 'pdf' | 'image'

export interface Certification {
  id: string
  title: string
  issuer: string
  date?: string
  /** Exact filename inside certificates/ (synced to public/certificates/) */
  file: string
  type: CertificateType
  description?: string
}

export const CERTIFICATES_PATH = '/certificates'

export const certificationEntries: Certification[] = [
  {
    id: 'aws-cloud-architecting',
    title: 'AWS Academy Cloud Architecting',
    issuer: 'AWS Academy',
    date: '2025',
    file: 'AWS_Academy_Graduate___AWS_Academy_Cloud_Architecting_Badge20250713-28-aa4jxg.pdf',
    type: 'pdf',
    description: 'AWS Academy Graduate badge in cloud architecting fundamentals.',
  },
  {
    id: 'palo-alto-cloud-security',
    title: 'Fundamentals of Cloud Security',
    issuer: 'Palo Alto Networks Beacon',
    date: '2025',
    file: 'Fundamentals of Cloud Security _ Beacon.pdf',
    type: 'pdf',
    description: 'Core cloud security concepts, threats, and best practices.',
  },
  {
    id: 'palo-alto-network-security',
    title: 'Network Security Fundamentals',
    issuer: 'Palo Alto Networks Beacon',
    date: '2025',
    file: 'Network Security Fundamentals _ Beacon.pdf',
    type: 'pdf',
    description: 'Foundational network security principles and technologies.',
  },
  {
    id: 'palo-alto-cybersecurity',
    title: 'Cybersecurity Fundamentals',
    issuer: 'Palo Alto Networks Beacon',
    date: '2025',
    file: 'Cybersecurity Fundamentals _ Beacon.pdf',
    type: 'pdf',
    description: 'Essential cybersecurity concepts and security operations basics.',
  },
  {
    id: 'palo-alto-soc',
    title: 'Fundamentals of SOC (Security Operations Center)',
    issuer: 'Palo Alto Networks Beacon',
    date: '2025',
    file: 'Fundamentals of SOC (Security Operations Center) _ Beacon.pdf',
    type: 'pdf',
    description: 'Security Operations Center workflows, monitoring, and incident response.',
  },
  {
    id: 'palo-alto-sase',
    title: 'SASE Fundamentals',
    issuer: 'Palo Alto Networks Beacon',
    date: '2025',
    file: 'SASE Fundamentals _ Beacon.pdf',
    type: 'pdf',
    description: 'Secure Access Service Edge architecture and implementation fundamentals.',
  },
  {
    id: 'coursera-business-analytics',
    title: 'Business Analytics for Decision Making',
    issuer: 'Coursera',
    date: '2025',
    file: 'Coursera 5OGQIN425IUT.pdf',
    type: 'pdf',
    description: 'Data-driven decision making and business analytics techniques.',
  },
  {
    id: 'coursera-certificate',
    title: 'Coursera Professional Certificate',
    issuer: 'Coursera',
    date: '2025',
    file: 'Coursera AVO2DFG1U2N8.pdf',
    type: 'pdf',
    description: 'Professional certification completed through Coursera.',
  },
  {
    id: 'ibm-skillsbuild-1',
    title: 'IBM SkillsBuild Certificate',
    issuer: 'IBM',
    date: 'June 2025',
    file: 'IBMDesign20250608-27-d7st22.pdf',
    type: 'pdf',
    description: 'IBM SkillsBuild professional development certification.',
  },
  {
    id: 'ibm-skillsbuild-2',
    title: 'IBM SkillsBuild Certificate',
    issuer: 'IBM',
    date: 'June 2025',
    file: 'IBMDesign20250611-27-58yb4b.pdf',
    type: 'pdf',
    description: 'IBM SkillsBuild professional development certification.',
  },
  {
    id: 'ibm-skillsbuild-3',
    title: 'IBM SkillsBuild Certificate',
    issuer: 'IBM',
    date: 'June 2025',
    file: 'IBMDesign20250630-27-9p3i2u.pdf',
    type: 'pdf',
    description: 'IBM SkillsBuild professional development certification.',
  },
  {
    id: 'cybersecurity-internship',
    title: 'Virtual Internship in Cybersecurity',
    issuer: 'Industry Partner',
    date: '2025',
    file: 'Virtual internship of Cybersecurity ANKIT   BISWAS 351609.pdf',
    type: 'pdf',
    description: 'Completed virtual internship program in cybersecurity.',
  },
  {
    id: 'course-attendance',
    title: 'Professional Course Attendance',
    issuer: 'Training Provider',
    date: '2025',
    file: 'CourseAttendance20250701-26-fwcogl - Copy.pdf',
    type: 'pdf',
    description: 'Certificate of attendance for professional development course.',
  },
]

export function getCertificateUrl(cert: Certification): string {
  const segments = cert.file.split('/').map((segment) => encodeURIComponent(segment))
  return `${CERTIFICATES_PATH}/${segments.join('/')}`
}

export function getCertificateTypeFromFile(file: string): CertificateType {
  const ext = file.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return 'pdf'
  return 'image'
}

export const certifications = certificationEntries

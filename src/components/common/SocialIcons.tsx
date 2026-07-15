import { FaGithub, FaLinkedin } from 'react-icons/fa6'

interface IconProps {
  className?: string
}

export function GithubIcon({ className }: IconProps) {
  return <FaGithub className={className} />
}

export function LinkedinIcon({ className }: IconProps) {
  return <FaLinkedin className={className} />
}

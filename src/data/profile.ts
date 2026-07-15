/**
 * Central profile configuration — edit this file to update portfolio content.
 */

export const profile = {
  site: {
    name: 'Ankit Biswas',
    initials: 'AB',
    title: 'Software Engineer | Full Stack Developer',
    description:
      'Building scalable enterprise web applications using React, ASP.NET Core, SQL Server, and modern cloud technologies with a focus on clean architecture, performance, and user experience.',
    location: 'Hyderabad, Telangana, India',
    email: 'imankit.biswas@gmail.com',
    phone: '+91 7864939820',
    whatsapp: '+917864939820',
    github: 'https://github.com/Ankit2004-web',
    githubUsername: 'Ankit2004-web',
    linkedin: 'https://www.linkedin.com/in/ankit-biswas-6356a7256/',
    url: 'https://ankit-portfolio-iota-one.vercel.app',
    resumeUrl: '/resume.pdf',
    resumeAvailable: true as boolean,
    profileImage: '/image/profile.png',
    logo: '/logo.svg',
  },

  rotatingTitles: [
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    '.NET Developer',
  ],

  about: {
    heading: 'Crafting Digital Experiences',
    subheading: 'A passionate developer building scalable enterprise solutions.',
    paragraphs: [
      'I am a passionate Full Stack Developer and Software Engineer currently working as an IT Associate Trainee at Newmark. I specialize in building scalable enterprise web applications using React, ASP.NET Core, SQL Server, and modern cloud technologies.',
      'I enjoy solving real-world business problems through clean architecture, efficient backend systems, and intuitive user interfaces. I am constantly learning new technologies and improving my skills to build high-quality software that creates real impact.',
    ],
    role: 'IT Associate Trainee at Newmark',
  },

  experience: [
    {
      company: 'Newmark',
      role: 'IT Associate Trainee',
      period: 'May 2026 – Present',
      location: 'Hyderabad, Telangana, India',
      responsibilities: [
        'Develop enterprise web applications',
        'Build scalable REST APIs using ASP.NET Core',
        'Develop modern React frontends',
        'Work with SQL Server databases',
        'Implement authentication and role-based access',
        'Use Git and Azure DevOps',
        'Collaborate using Agile methodologies',
        'Optimize application performance and user experience',
      ],
    },
  ],

  education: [
    {
      institution: 'KIIT University',
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      period: '2022 – 2026',
      cgpa: '9.09',
      logo: '/image/kiit-logo.png',
    },
    {
      institution: 'Gorabazar Iswar Chandra Institution',
      degree: 'Higher Secondary (Class XII)',
      field: 'WBCHSE · West Bengal',
      period: '2020 – 2022',
      percentage: '89.89%',
      logo: '/image/gorabazar-ici-logo.png',
    },
    {
      institution: 'Sagarpara High School',
      degree: 'Secondary (Class X)',
      field: 'WBBSE · West Bengal',
      period: '2014 – 2020',
      percentage: '91.57%',
      logo: '/image/sagarpara-logo.png',
    },
  ],

  projects: [
    {
      id: 'wfims',
      title: 'Workforce Intelligence & Management System (WFIMS)',
      description:
        'Developed an enterprise-grade workforce management platform during my internship at Newmark. The application includes employee management, attendance tracking, leave management, analytics dashboards, authentication, role-based access control, notifications, reporting, multilingual support, and responsive UI for enterprise users.',
      techStack: [
        'React',
        'TypeScript',
        'ASP.NET Core',
        '.NET 8',
        'SQL Server',
        'JWT Authentication',
        'Azure DevOps',
        'Git',
      ],
      featured: true,
      isPrivate: true,
      githubRepoSlug: 'Workforce-Intelligence-Attendance-Management-System',
      liveUrl: null,
      gradient: 'from-blue-600 via-indigo-600 to-purple-700',
      icon: 'users' as const,
      logo: '/image/wfims-logo.png',
    },
    {
      id: 'railway-reservation',
      title: 'Railway Reservation Management System',
      description:
        'Built a secure railway reservation platform featuring JWT authentication, train search, ticket booking, booking management, and an admin dashboard with role-based access.',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'JWT'],
      featured: false,
      isPrivate: false,
      githubRepoSlug: 'Railway-Reservation-System',
      repoSearchKeywords: ['railway', 'reservation'],
      liveUrl: null,
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      icon: 'train' as const,
      logo: '/image/railway-reservation-logo.png',
    },
    {
      id: 'drowsiness-detection',
      title: 'Driver Drowsiness Detection System (Anti Sleep Alarm)',
      description:
        'Designed and implemented a driver drowsiness detection system that alerts users when signs of fatigue are detected, helping improve road safety.',
      techStack: ['Python', 'OpenCV', 'Computer Vision'],
      featured: false,
      isPrivate: false,
      githubRepoSlug: null,
      repoSearchKeywords: ['drowsiness', 'sleep', 'driver', 'anti'],
      liveUrl: null,
      gradient: 'from-orange-600 via-red-600 to-rose-700',
      icon: 'eye' as const,
      logo: '/image/drowsiness-detection-logo.png',
    },
    {
      id: 'encryption-system',
      title: 'Encryption System',
      description:
        'Designed and implemented a secure encryption application following software engineering principles to ensure confidentiality and data protection.',
      techStack: ['Java', 'Cryptography'],
      featured: false,
      isPrivate: false,
      githubRepoSlug: null,
      repoSearchKeywords: ['encryption', 'encrypt', 'crypto', 'cipher'],
      liveUrl: null,
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-700',
      icon: 'lock' as const,
      logo: '/image/encryption-system-logo.png',
    },
  ],

  skillCategories: [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Bootstrap', level: 75 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'C#', level: 88 },
        { name: 'ASP.NET Core', level: 85 },
        { name: '.NET 8', level: 85 },
        { name: 'Node.js', level: 78 },
        { name: 'Express.js', level: 75 },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'SQL Server', level: 85 },
        { name: 'MongoDB', level: 72 },
        { name: 'MySQL', level: 75 },
      ],
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'GitHub', level: 88 },
        { name: 'Azure DevOps', level: 80 },
        { name: 'Docker', level: 70 },
        { name: 'Postman', level: 85 },
        { name: 'Swagger', level: 82 },
        { name: 'Visual Studio', level: 88 },
        { name: 'VS Code', level: 92 },
      ],
    },
    {
      title: 'Other',
      skills: [
        { name: 'REST APIs', level: 90 },
        { name: 'JWT Authentication', level: 85 },
        { name: 'CI/CD', level: 78 },
        { name: 'Agile Development', level: 85 },
      ],
    },
  ],

  techBadges: ['React', 'Azure DevOps', 'TypeScript', 'C#', '.NET 8', 'SQL Server', 'Node.js'],

  achievements: [
    {
      id: 'motm-football',
      title: 'Man of the Match',
      description: 'Awarded at the Nibedita Football Academy Football Tournament.',
      category: 'sports' as const,
      date: '2022',
      image: 'man-of-the-match.png',
    },
    {
      id: 'mots-football',
      title: 'Man of the Series',
      description: 'Awarded at the Nibedita Football Academy Football Tournament.',
      category: 'sports' as const,
      date: '2022',
      image: 'man-of-the-series-football.png',
    },
    {
      id: 'captain-cricket',
      title: 'Captain — Sleek Strikers Cricket Team',
      description: 'Led the college cricket team in the Hostel Premier League.',
      category: 'leadership' as const,
      date: '2022',
      image: 'leadership.png',
    },
    {
      id: 'mots-cricket',
      title: 'Man of the Series',
      description: 'Hostel Premier League Cricket Tournament.',
      category: 'sports' as const,
      date: '2022',
      image: 'man-of-the-series-cricket.png',
    },
  ],
} as const

export type Profile = typeof profile
export type Project = (typeof profile.projects)[number]
export type Achievement = (typeof profile.achievements)[number]
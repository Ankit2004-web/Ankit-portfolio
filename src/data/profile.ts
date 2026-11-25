/**
 * Central profile configuration — edit this file to update portfolio content.
 */

export const profile = {
  site: {
    name: 'Ankit Biswas',
    initials: 'AB',
    title: 'Software Engineer | Full Stack Developer',
    description:
      'Full stack developer at Newmark. I build enterprise software and ship products you can open, from a private gift site to an encrypted messenger, using React, .NET, Next.js, and Python.',
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
    'React & Next.js Developer',
    '.NET & Python Developer',
  ],

  about: {
    heading: 'Enterprise work, and products you can open',
    subheading: 'Internship software at Newmark, plus Velune, CipherLink, and hardware you can see.',
    paragraphs: [
      'I am a passionate Full Stack Developer and Software Engineer currently working as an IT Associate Trainee at Newmark. I specialize in building scalable enterprise web applications using React, ASP.NET Core, SQL Server, and modern cloud technologies.',
      'I enjoy solving real-world business problems through clean architecture, efficient backend systems, and intuitive user interfaces. I am constantly learning new technologies and improving my skills to build high-quality software that creates real impact.',
      'Alongside the internship I ship my own work: Velune, a private birthday opened from one link, CipherLink, a messenger that stores chats as ciphertext, and an Arduino alarm that notices when a driver stops blinking.',
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
        'Workforce platform built during my internship at Newmark. Teams manage employees, attendance, and leave in one place, with role-based access, live analytics, notifications, and reports ready for day-to-day operations.',
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
      liveUrl: 'https://niia-26-wfi.azurewebsites.net/',
      gradient: 'from-blue-600 via-indigo-600 to-purple-700',
      icon: 'users' as const,
      logo: '/image/wfims-logo.png',
    },
    {
      id: 'velune',
      title: 'Velune',
      description:
        'A private birthday, delivered as one link. The sender packs photos, a letter, cake, and music, and the recipient opens a cinematic page on their phone with no app and no account. I shipped the creator studio, the recipient experience, photo storage, and the live site.',
      techStack: [
        'TypeScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'Prisma',
        'PostgreSQL',
        'Zod',
        'Google sign-in',
      ],
      featured: true,
      isPrivate: true,
      githubRepoSlug: 'velune',
      liveUrl: 'https://velune-iyco.onrender.com',
      gradient: 'from-purple-950 via-fuchsia-700 to-rose-500',
      icon: 'gift' as const,
      logo: '/image/velune-logo.png',
    },
    {
      id: 'railway-reservation',
      title: 'Railyatra — Railway Reservation System',
      description:
        'Passengers search trains, book tickets, and manage reservations without standing in a queue. Secure login protects each account, and an admin dashboard lets staff oversee bookings.',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'JWT'],
      featured: false,
      isPrivate: false,
      githubRepoSlug: 'RailYatra',
      githubUrl: 'https://github.com/Ankit2004-web/RailYatra',
      repoSearchKeywords: ['railyatra', 'railway', 'reservation'],
      liveUrl: 'https://railyatra-72z5.onrender.com',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      icon: 'train' as const,
      logo: '/image/railyatra-logo.png',
    },
    {
      id: 'drowsiness-detection',
      title: 'Anti Sleep Alarm',
      description:
        'A small device that notices when a driver stops blinking and sounds an alarm. Built the Arduino firmware with an IR blink sensor and buzzer, plus a live site that explains the hardware and code.',
      techStack: [
        'Arduino UNO',
        'C++',
        'IR Blink Sensor',
        'Piezo Buzzer',
        'Relay Module',
        'HTML5',
        'CSS3',
        'JavaScript',
        'Highlight.js',
        'Vercel',
      ],
      featured: false,
      isPrivate: false,
      githubRepoSlug: 'anti-sleep-alarm',
      githubUrl: 'https://github.com/Ankit2004-web/anti-sleep-alarm',
      repoSearchKeywords: ['drowsiness', 'sleep', 'driver', 'anti'],
      liveUrl: 'https://anti-sleep-alarm-tawny.vercel.app/',
      gradient: 'from-orange-600 via-red-600 to-rose-700',
      icon: 'eye' as const,
      logo: '/image/anti-sleep-alarm-logo.png',
    },
    {
      id: 'cipherlink',
      title: 'CipherLink',
      description:
        'A messenger that stays private even in the database. People sign in, chat in groups, and send photos and voice notes, while every message is stored as ciphertext using AES-256-GCM and RSA-OAEP.',
      techStack: [
        'Python',
        'Flask',
        'React',
        'Vite',
        'PostgreSQL',
        'AES-256-GCM',
        'RSA-OAEP',
        'Google Auth',
      ],
      featured: true,
      isPrivate: false,
      githubRepoSlug: 'CipherLink',
      githubUrl: 'https://github.com/Ankit2004-web/CipherLink',
      repoSearchKeywords: ['cipherlink', 'cipher'],
      liveUrl: null,
      gradient: 'from-violet-700 via-[#8B5CFF] to-purple-950',
      icon: 'lock' as const,
      logo: '/image/cipherlink-logo.png',
    },
  ],

  skillCategories: [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 84 },
        { name: 'TypeScript', level: 88 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Vite', level: 82 },
        { name: 'Bootstrap', level: 75 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'C#', level: 88 },
        { name: 'ASP.NET Core', level: 85 },
        { name: '.NET 8', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Flask', level: 78 },
        { name: 'Node.js', level: 78 },
        { name: 'Express.js', level: 75 },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'PostgreSQL', level: 82 },
        { name: 'SQL Server', level: 85 },
        { name: 'Prisma', level: 78 },
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
      title: 'Security',
      skills: [
        { name: 'REST APIs', level: 90 },
        { name: 'JWT Authentication', level: 85 },
        { name: 'Google sign-in', level: 80 },
        { name: 'Cryptography', level: 78 },
        { name: 'CI/CD', level: 78 },
        { name: 'Agile', level: 85 },
      ],
    },
    {
      title: 'Embedded',
      skills: [
        { name: 'Arduino', level: 74 },
        { name: 'C++', level: 76 },
      ],
    },
  ],

  techBadges: ['React', 'Next.js', 'TypeScript', 'C#', '.NET 8', 'PostgreSQL', 'Python'],

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
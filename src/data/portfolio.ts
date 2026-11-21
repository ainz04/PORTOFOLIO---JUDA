/**
 * ============================================================================
 * KONFIGURASI DATA PORTOFOLIO (SATU FILE UNTUK SEMUA KONTEN)
 * ============================================================================
 * Edit file ini untuk mengganti nama, bio, foto, musik, pengalaman, tech stack,
 * proyek, penghargaan, dan kontak Anda untuk bahasa Indonesia (id) & Inggris (en).
 */

export type Lang = "id" | "en";

export interface TrackItem {
  title: string;
  artist: string;
  audioSrc: string;
  lrcSrc?: string;
}

export interface TimelineEntry {
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
}

export interface TechItem {
  name: string;
  color: string;
  logo: string;
  invertInDark?: boolean;
}

export interface TechCategory {
  categoryKey: "frontend" | "backend" | "db" | "devops";
  items: TechItem[];
}

export interface ShowcaseItem {
  eyebrow: string;
  title: string;
  desc: string;
  img: string;
  fallbackImg?: string;
  url?: string;
  repoUrl?: string;
  livePreview?: boolean;
  tags?: string[];
  date?: string;
}

export interface ContactLinkItem {
  key: "github" | "email" | "telegram" | "instagram";
  href: string;
}

const simpleIcon = (slug: string, hex: string) =>
  `https://cdn.simpleicons.org/${slug}/${hex.replace("#", "")}`;

// ----------------------------------------------------------------------------
// 1. PENGATURAN UMUM, FOTO, CV, MAPS, & TAUTAN SOSIAL
// ----------------------------------------------------------------------------
export const SITE_CONFIG = {
  metaTitle: "JUDA SORITUA MUNTE | Fullstack Web Developer",
  metaDescription:
    "Portofolio profesional Fullstack Web Developer. Spesialis Next.js, TypeScript, Arsitektur Backend, dan UI Minimalis.",
  heroAvatar: "/images/hero/profile.jpg",
  aboutPhoto: "/images/about/portrait.jpg",
  cvHref: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1",
  cvDownloadName: "CV_Juda_Soritua_Munte.txt",
  typingRoles: [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Medan,+Indonesia&t=&z=13&ie=UTF8&iwloc=&output=embed",
  mapTitle: "Map — Medan, Indonesia",
  githubUsername: "ainz04",
  githubAllProjectsUrl: "https://github.com/ainz04",
  socialLinks: {
    instagram: "https://www.instagram.com/jd_srt_?knvt=cDQ0dWJnZDB3OQ==",
    github: "https://github.com/ainz04",
    telegram: "https://t.me/A_JD04",
    email: "mailto:lordweeb@gmail.com",
  },
  contactLinks: [
    { key: "github", href: "https://github.com/ainz04" },
    { key: "email", href: "mailto:lordweeb@gmail.com" },
    { key: "telegram", href: "https://t.me/A_JD04" },
    { key: "instagram", href: "https://www.instagram.com/jd_srt_?knvt=cDQ0dWJnZDB3OQ==" },
  ] satisfies ContactLinkItem[],
};

// ----------------------------------------------------------------------------
// 2. DAFTAR LAGU & LIRIK SINKRON (.LRC)
// Ganti dengan file .mp3 dan .lrc milik Anda di folder /public/audio/
// ----------------------------------------------------------------------------
export const HERO_TRACKS: TrackItem[] = [
  {
    title: "EVERYTHING",
    artist: "The Black Skirts (검정치마)",
    audioSrc: "https://music.youtube.com/watch?v=HXV5aZaBLDo",
    lrcSrc: "/audio/everything.lrc",
  },
  {
    title: "Midnight Code",
    artist: "Lo-Fi Studio Session",
    audioSrc: "/audio/midnight-code.wav",
    lrcSrc: "/audio/midnight-code.lrc",
  },
  {
    title: "Monochrome Drift",
    artist: "Ambient Synth Collective",
    audioSrc: "/audio/monochrome-drift.wav",
    lrcSrc: "/audio/monochrome-drift.lrc",
  },
];

export const ABOUT_TRACKS: TrackItem[] = [
  ...HERO_TRACKS,
];

// ----------------------------------------------------------------------------
// 3. TECH STACK (KATEGORI & IKON)
// ----------------------------------------------------------------------------
export const TECH_STACK: TechCategory[] = [
  {
    categoryKey: "frontend",
    items: [
      { name: "React", color: "#61DAFB", logo: simpleIcon("react", "61DAFB") },
      {
        name: "Tailwind CSS",
        color: "#06B6D4",
        logo: simpleIcon("tailwindcss", "06B6D4"),
      },
      {
        name: "Bootstrap",
        color: "#7952B3",
        logo: simpleIcon("bootstrap", "7952B3"),
      },
      {
        name: "Next.js",
        color: "#000000",
        logo: simpleIcon("nextdotjs", "000000"),
        invertInDark: true,
      },
      {
        name: "TypeScript",
        color: "#3178C6",
        logo: simpleIcon("typescript", "3178C6"),
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        logo: simpleIcon("javascript", "F7DF1E"),
      },
      {
        name: "Framer Motion",
        color: "#0055FF",
        logo: simpleIcon("framer", "0055FF"),
      },
    ],
  },
  {
    categoryKey: "backend",
    items: [
      {
        name: "Node.js",
        color: "#339933",
        logo: simpleIcon("nodedotjs", "339933"),
      },
      {
        name: "Express.js",
        color: "#000000",
        logo: simpleIcon("express", "000000"),
        invertInDark: true,
      },
    ],
  },
  {
    categoryKey: "db",
    items: [
      {
        name: "PostgreSQL",
        color: "#4169E1",
        logo: simpleIcon("postgresql", "4169E1"),
      },
      { name: "MySQL", color: "#4479A1", logo: simpleIcon("mysql", "4479A1") },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: simpleIcon("mongodb", "47A248"),
      },
      {
        name: "Supabase",
        color: "#3ECF8E",
        logo: simpleIcon("supabase", "3ECF8E"),
      },
    ],
  },
  {
    categoryKey: "devops",
    items: [
      { name: "Git", color: "#F05032", logo: simpleIcon("git", "F05032") },
      {
        name: "GitHub",
        color: "#000000",
        logo: simpleIcon("github", "000000"),
        invertInDark: true,
      },
      {
        name: "Postman API",
        color: "#FF6C37",
        logo: simpleIcon("postman", "FF6C37"),
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 4. TEKS DWIBAHASA (INDONESIA & INGGRIS)
// ----------------------------------------------------------------------------
export const TRANSLATIONS = {
  id: {
    // Navbar & Preloader
    navHome: "Beranda",
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navProjects: "Proyek",
    navContacts: "Kontak",
    wordmark: "PORTFOLIO.",
    loadingTitle: "Juda.dev",
    loadingLabel: "PORTFOLIO LOADING",
    loadingStatus: "SISTEM MEMUAT",

    // Hero
    availableBadge: "Tersedia untuk Pekerjaan & Kontrak",
    heroH1: "what's up, saya juda",
    bio: "Halo! Saya suka ngoding dan bereksperimen dengan ide-ide baru. Bagi saya, setiap baris kode adalah cara untuk menghadirkan sesuatu yang bermanfaat dan keren di dunia digital.",
    ctaExplore: "Jelajahi Proyek",
    ctaDownload: "Unduh CV",
    connect: "TERHUBUNG",
    badge1: "JS & TS — Stack Inti Utama",
    badge2: "Fullstack Architecture — End-to-End System",
    badge3: "2+ Tahun — Pengalaman Rekayasa",

    // Marquee
    marqueeItems: [
      "FULLSTACK WEB DEVELOPER",
      "ARSITEKTUR BACKEND TERDISTRIBUSI",
      "SPESIALIS NEXT.JS & TYPESCRIPT",
      "DEVOPS & ORKESTRASI DOCKER",
      "PENCINTA UI MINIMALIS",
    ],

    // About
    aboutEyebrow: "EKSPLORASI",
    aboutHeading: "Tentang Saya",
    aboutProfileLabel: "PROFIL PROFESIONAL",
    aboutName: "JUDA SORITUA MUNTE",
    aboutKnownAs: "Dikenal sebagai Juda",
    aboutFocusLabel: "Fokus Inti",
    aboutFocusVal: "Scalable Web Apps",
    aboutWhoTitle: "Siapa Saya",
    aboutWhoBody:
      "Saya Juda, seorang pengembang web yang gemar mengubah ide mentah menjadi produk digital yang interaktif dan terasa hidup. Mulai dari tampilan 3D di browser, aplikasi komunikasi real-time, hingga game web, saya menikmati setiap proses merancang pengalaman pengguna sekaligus membangun fondasi teknis di baliknya.",
    aboutApproachTitle: "How I Do This",
    aboutApproachBody:
      "Saya memulai setiap proyek dari masalah nyatanya: bikin prototipe cepat, uji langsung di tangan pengguna, lalu rapikan strukturnya hingga ringan, responsif, dan nyaman dipakai di berbagai perangkat. Fokus saya sederhana—kode yang jelas dibaca, performa yang kencang, dan detail visual yang punya karakter.",
    aboutInfoTitle: "Informasi Personal",
    infoFullName: "NAMA LENGKAP",
    infoFullNameVal: "JUDA SORITUA MUNTE",
    infoHometown: "DOMISILI ASAL",
    infoHometownVal: "Riau",
    infoCurrent: "DOMISILI SAAT INI",
    infoCurrentVal: "Medan",
    infoAvailability: "KONTRAK & KETERSEDIAAN",
    infoAvailabilityVal: "Remote / Hybrid On-Site",
    infoAcademic: "ALMAMATER AKADEMIK",
    infoAcademicVal: "University of Medan",
    infoGpa: "INDEKS PRESTASI KUMULATIF",
    infoGpaVal: "4.00 / 4.00",
    aboutCollab: "Inisiasi Kolaborasi",

    // Experience Timeline
    expEyebrow: "JEJAK KARIER",
    expHeading: "Pengalaman Pendidikan & Kerja",
    expIntro:
      "Jejak akademik dan profesional yang membentuk pendekatan rekayasa saya hari ini.",
    timeline: [
      {
        title: "SMA NEGERI 1 MINAS",
        subtitle: "Sekolah Menengah Atas — 2019 – 2021",
        body: "Mempelajari pengembangan web dari front-end hingga back-end secara otodidak dengan bantuan internet dan AI sebagai fondasi keahlian teknis. Menguasai alur pengembangan aplikasi secara mandiri, mulai dari merancang antarmuka pengguna yang responsif hingga membangun logika di sisi server.",
        tags: ["Full-Stack Developer", "Self-Taught"],
      },
      {
        title: "just playing around",
        subtitle: "hanya untuk kesenangan tersendiri",
        body: "Hanya sebagai hiburan semata karena hal ini bukan kemampuan utamaku, jadi hanya sekedar bersenang-senang, membantu teman, dan kejahilan saja.",
        tags: ["Just For Fun", "Helping Friends", "Side Experiments"],
      },
      {
        title: "UNIMED",
        subtitle: "Pendidikan Teknik Mesin - 2022",
        body: "Anehkan? akupun merasa aneh, kenapa bisa belok sejauh itu??!!",
        tags: ["Mechanical Engineering", "Full-Stack Developer", "Plot Twist"],
      },
    ] satisfies TimelineEntry[],

    // Tech Stack
    techEyebrow: "KEAHLIAN & PERANGKAT",
    techHeading: "Tech Stack Saya",
    techCategories: {
      frontend: {
        name: "Frontend Ecosystem",
        desc: "Antarmuka presisi, animasi halus, arsitektur komponen yang rapi.",
      },
      backend: {
        name: "Backend & Runtimes",
        desc: "API cepat, logika server yang dapat diandalkan, arsitektur terukur.",
      },
      db: {
        name: "Basis Data & ORM",
        desc: "Pemodelan data relasional dan NoSQL, query yang dioptimalkan.",
      },
      devops: {
        name: "DevOps & Infrastruktur",
        desc: "Git workflow, API testing, dan orkestrasi deployment.",
      },
    },

    // Selected Works
    projectsEyebrow: "PORTFOLIO",
    projectsHeading: "Karya Terpilih",
    projectsAllLink: "Lihat Seluruh Proyek di GitHub",
    projectsViewMore: "Lihat lebih banyak",
    projectsHide: "Sembunyikan",
    projectsDetail: "Lihat Detail",
    projectsTabProjects: "Proyek",
    projectsTabAwards: "Penghargaan",
    projectsTabExperience: "Pengalaman",
    projectsSubtitle: "Koleksi proyek — proyek yang sudah pernah saya buat.",
    awardsSubtitle: "Sertifikat dan pencapaian yang pernah saya raih.",
    experienceSubtitle: "Pengalaman kerja dan kegiatan yang pernah saya jalani.",
    projectItems: [
      {
        eyebrow: "GITHUB PAGES",
        title: "3D Portofolio",
        desc: "Proyek web portofolio 3D interaktif yang di-deploy langsung di GitHub Pages (ainz04.github.io).",
        url: "https://ainz04.github.io/3D-PORTOFOLIO/",
        repoUrl: "https://github.com/ainz04/3D-PORTOFOLIO",
        livePreview: true,
        tags: ["TypeScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/3D-PORTOFOLIO",
        fallbackImg: "/images/projects/project-1.svg",
      },
      {
        eyebrow: "GITHUB PAGES",
        title: "Operator Chat",
        desc: "OPERATOR CHAT — aplikasi chat web yang berjalan langsung di GitHub Pages.",
        url: "https://ainz04.github.io/OPERATOR-CHAT/",
        repoUrl: "https://github.com/ainz04/OPERATOR-CHAT",
        livePreview: true,
        tags: ["JavaScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/OPERATOR-CHAT",
        fallbackImg: "/images/projects/project-2.svg",
      },
      {
        eyebrow: "GITHUB PAGES",
        title: "Retro RPG Snake",
        desc: "Retro 2D RPG Multiplayer Snake Game inspired by Nokia snake & Guardian Tales.",
        url: "https://ainz04.github.io/retro-rpg-snake/",
        repoUrl: "https://github.com/ainz04/retro-rpg-snake",
        livePreview: true,
        tags: ["JavaScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/retro-rpg-snake",
        fallbackImg: "/images/projects/project-3.svg",
      },
      {
        eyebrow: "GITHUB PAGES",
        title: "Just Chat",
        desc: "Proyek web Just Chat yang di-deploy langsung di GitHub Pages (ainz04.github.io).",
        url: "https://ainz04.github.io/just-chat/",
        repoUrl: "https://github.com/ainz04/just-chat",
        livePreview: true,
        tags: ["JavaScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/just-chat",
        fallbackImg: "/images/projects/project-4.svg",
      },
    ] satisfies ShowcaseItem[],
    awardItems: [
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #01",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-1.jpg",
      },
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #02",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-2.jpg",
      },
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #03",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-3.jpg",
      },
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #04",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-4.jpg",
      },
    ] satisfies ShowcaseItem[],
    activityItems: [
      {
        eyebrow: "KKN 2025",
        title: "Ketua PDD — KKN Desa Nagur",
        desc: "Sebagai ketua PDD pada masa KKN di Desa Nagur 2025.",
        date: "2025",
        img: "/images/experience/exp-1.jpg",
      },
      {
        eyebrow: "KKN 2025",
        title: "Ketua PDD — KKN Desa Nagur",
        desc: "Sebagai ketua PDD pada masa KKN di Desa Nagur 2025.",
        date: "2025",
        img: "/images/experience/exp-2.jpg",
      },
      {
        eyebrow: "KKN 2025",
        title: "Ketua PDD — KKN Desa Nagur",
        desc: "Sebagai ketua PDD pada masa KKN di Desa Nagur 2025.",
        date: "2025",
        img: "/images/experience/exp-3.jpg",
      },
    ] satisfies ShowcaseItem[],

    // Contact & Footer
    contactEyebrow: "HUBUNGI SAYA",
    contactHeading: "Hubungi Saya",
    contactBaseLabel: "BASIS OPERASI",
    contactBaseVal: "Medan, Indonesia",
    contactBaseTag: "WIB (GMT+7)",
    contactResponse: "Estimasi respon cepat: dalam 24 jam kerja",
    contactAvailable: "Tersedia",
    contactValues: {
      github: { label: "GITHUB", value: "ainz04" },
      email: { label: "EMAIL", value: "lordweeb@gmail.com" },
      telegram: { label: "TELEGRAM", value: "t.me/A_JD04" },
      instagram: { label: "INSTAGRAM", value: "@jd_srt_" },
    },
    footerRights: "© 2026 JUDA SORITUA MUNTE. All rights reserved.",
    footerBackTop: "Kembali ke atas",
  },
  en: {
    // Navbar & Preloader
    navHome: "Home",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navContacts: "Contacts",
    wordmark: "PORTFOLIO.",
    loadingTitle: "Juda.dev",
    loadingLabel: "PORTFOLIO LOADING",
    loadingStatus: "SYSTEM INITIALIZING",

    // Hero
    availableBadge: "Available for Work & Contract",
    heroH1: "what's up, saya juda",
    bio: "Hi! I love coding and experimenting with new ideas. For me, every line of code is a way to bring something useful and cool into the digital world.",
    ctaExplore: "Explore Work",
    ctaDownload: "Download CV",
    connect: "CONNECT",
    badge1: "JS & TS — Core Stack",
    badge2: "Fullstack Architecture — End-to-End System",
    badge3: "2+ Years — Engineering Experience",

    // Marquee
    marqueeItems: [
      "FULLSTACK WEB DEVELOPER",
      "DISTRIBUTED BACKEND ARCHITECTURE",
      "NEXT.JS & TYPESCRIPT SPECIALIST",
      "DEVOPS & DOCKER ORCHESTRATION",
      "MINIMALIST UI ENTHUSIAST",
    ],

    // About
    aboutEyebrow: "DISCOVER",
    aboutHeading: "About Me",
    aboutProfileLabel: "PROFESSIONAL PROFILE",
    aboutName: "JUDA SORITUA MUNTE",
    aboutKnownAs: "Known as Juda",
    aboutFocusLabel: "Core Focus",
    aboutFocusVal: "Scalable Web Apps",
    aboutWhoTitle: "Who Am I",
    aboutWhoBody:
      "I'm Juda, a web developer who loves turning raw ideas into interactive digital products that feel alive. From 3D browser experiences and real-time chat apps to web games, I enjoy crafting both the visual feel on screen and the technical foundation behind it.",
    aboutApproachTitle: "How I Do This",
    aboutApproachBody:
      "I start every build by dissecting the real problem: prototype fast, test interactions early, and refine the structure until it feels snappy, responsive, and effortless on any screen. My focus is straightforward—readable code, fast performance, and visual details with real personality.",
    aboutInfoTitle: "Personal Information",
    infoFullName: "FULL NAME",
    infoFullNameVal: "JUDA SORITUA MUNTE",
    infoHometown: "HOMETOWN",
    infoHometownVal: "Riau",
    infoCurrent: "CURRENT LOCATION",
    infoCurrentVal: "Medan",
    infoAvailability: "AVAILABILITY",
    infoAvailabilityVal: "Remote / Hybrid On-Site",
    infoAcademic: "ACADEMIC",
    infoAcademicVal: "University of Medan",
    infoGpa: "GPA",
    infoGpaVal: "4.00 / 4.00",
    aboutCollab: "Start a Collaboration",

    // Experience Timeline
    expEyebrow: "CAREER PATH",
    expHeading: "Education & Work Experience",
    expIntro:
      "The academic and professional path that shaped my engineering approach today.",
    timeline: [
      {
        title: "SMA NEGERI 1 MINAS",
        subtitle: "Senior High School — 2019 – 2021",
        body: "Learned web development from front-end to back-end self-taught with the help of the internet and AI as the foundation of my technical skills. Independently mastered the full application development workflow, from crafting responsive user interfaces to building server-side logic.",
        tags: ["Full-Stack Developer", "Self-Taught"],
      },
      {
        title: "just playing around",
        subtitle: "just for my own amusement",
        body: "Purely for entertainment since this isn't my main skill—just having fun, helping out friends, and messing around with random ideas.",
        tags: ["Just For Fun", "Helping Friends", "Side Experiments"],
      },
      {
        title: "UNIMED",
        subtitle: "Mechanical Engineering Education - 2022",
        body: "Weird, right? Even I find it weird—how did I swerve this far off course??!!",
        tags: ["Mechanical Engineering", "Full-Stack Developer", "Plot Twist"],
      },
    ] satisfies TimelineEntry[],

    // Tech Stack
    techEyebrow: "SKILLS & TOOLS",
    techHeading: "My Tech Stack",
    techCategories: {
      frontend: {
        name: "Frontend Ecosystem",
        desc: "Precise interfaces, smooth animation, clean component architecture.",
      },
      backend: {
        name: "Backend & Runtimes",
        desc: "Fast APIs, reliable server logic, scalable architecture.",
      },
      db: {
        name: "Databases & ORM",
        desc: "Relational and NoSQL data modeling, optimized queries.",
      },
      devops: {
        name: "DevOps & Infrastructure",
        desc: "Git workflows, API testing, and deployment orchestration.",
      },
    },

    // Selected Works
    projectsEyebrow: "PORTFOLIO",
    projectsHeading: "Selected Works",
    projectsAllLink: "View All Projects on GitHub",
    projectsViewMore: "View More",
    projectsHide: "Show Less",
    projectsDetail: "View Details",
    projectsTabProjects: "Projects",
    projectsTabAwards: "Awards",
    projectsTabExperience: "Experience",
    projectsSubtitle: "A collection of projects I've built so far.",
    awardsSubtitle: "Certificates and achievements I've earned.",
    experienceSubtitle: "Work and activities I've been part of.",
    projectItems: [
      {
        eyebrow: "GITHUB PAGES",
        title: "3D Portofolio",
        desc: "Interactive 3D portfolio web project deployed live on GitHub Pages (ainz04.github.io).",
        url: "https://ainz04.github.io/3D-PORTOFOLIO/",
        repoUrl: "https://github.com/ainz04/3D-PORTOFOLIO",
        livePreview: true,
        tags: ["TypeScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/3D-PORTOFOLIO",
        fallbackImg: "/images/projects/project-1.svg",
      },
      {
        eyebrow: "GITHUB PAGES",
        title: "Operator Chat",
        desc: "OPERATOR CHAT — web chat application hosted live on GitHub Pages.",
        url: "https://ainz04.github.io/OPERATOR-CHAT/",
        repoUrl: "https://github.com/ainz04/OPERATOR-CHAT",
        livePreview: true,
        tags: ["JavaScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/OPERATOR-CHAT",
        fallbackImg: "/images/projects/project-2.svg",
      },
      {
        eyebrow: "GITHUB PAGES",
        title: "Retro RPG Snake",
        desc: "Retro 2D RPG Multiplayer Snake Game inspired by Nokia snake & Guardian Tales.",
        url: "https://ainz04.github.io/retro-rpg-snake/",
        repoUrl: "https://github.com/ainz04/retro-rpg-snake",
        livePreview: true,
        tags: ["JavaScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/retro-rpg-snake",
        fallbackImg: "/images/projects/project-3.svg",
      },
      {
        eyebrow: "GITHUB PAGES",
        title: "Just Chat",
        desc: "Just Chat web application deployed live on GitHub Pages (ainz04.github.io).",
        url: "https://ainz04.github.io/just-chat/",
        repoUrl: "https://github.com/ainz04/just-chat",
        livePreview: true,
        tags: ["JavaScript", "GitHub Pages"],
        img: "https://opengraph.githubassets.com/1/ainz04/just-chat",
        fallbackImg: "/images/projects/project-4.svg",
      },
    ] satisfies ShowcaseItem[],
    awardItems: [
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #01",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-1.jpg",
      },
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #02",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-2.jpg",
      },
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #03",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-3.jpg",
      },
      {
        eyebrow: "NO AWARDS YET",
        title: "No Awards Yet #04",
        desc: "No awards yet, just this for now.",
        date: "2026",
        img: "/images/awards/award-4.jpg",
      },
    ] satisfies ShowcaseItem[],
    activityItems: [
      {
        eyebrow: "KKN 2025",
        title: "Head of PDD — KKN Desa Nagur",
        desc: "Served as Head of PDD (Publication, Documentation & Design) during KKN in Desa Nagur 2025.",
        date: "2025",
        img: "/images/experience/exp-1.jpg",
      },
      {
        eyebrow: "KKN 2025",
        title: "Head of PDD — KKN Desa Nagur",
        desc: "Served as Head of PDD (Publication, Documentation & Design) during KKN in Desa Nagur 2025.",
        date: "2025",
        img: "/images/experience/exp-2.jpg",
      },
      {
        eyebrow: "KKN 2025",
        title: "Head of PDD — KKN Desa Nagur",
        desc: "Served as Head of PDD (Publication, Documentation & Design) during KKN in Desa Nagur 2025.",
        date: "2025",
        img: "/images/experience/exp-3.jpg",
      },
    ] satisfies ShowcaseItem[],

    // Contact & Footer
    contactEyebrow: "GET IN TOUCH",
    contactHeading: "Contact Me",
    contactBaseLabel: "BASE OF OPERATIONS",
    contactBaseVal: "Medan, Indonesia",
    contactBaseTag: "WIB (GMT+7)",
    contactResponse: "Fast response estimate: within 24 business hours",
    contactAvailable: "Available",
    contactValues: {
      github: { label: "GITHUB", value: "ainz04" },
      email: { label: "EMAIL", value: "lordweeb@gmail.com" },
      telegram: { label: "TELEGRAM", value: "t.me/A_JD04" },
      instagram: { label: "INSTAGRAM", value: "@jd_srt_" },
    },
    footerRights: "© 2026 JUDA SORITUA MUNTE. All rights reserved.",
    footerBackTop: "Back to top",
  },
} as const;

export type PortfolioCopy = (typeof TRANSLATIONS)[Lang];

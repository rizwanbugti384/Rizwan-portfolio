import { Project, Testimonial, BlogPost } from './types';

export const PERSONAL_INFO = {
  fullName: "Rizwan",
  headline: "Web Developer | Technology Enthusiast | Continuous Learner",
  bioHeadline: "Passionate Frontend Developer from Dera Bugti, Pakistan",
  bioParagraph1: "I am a dedicated web developer focused on building modern, responsive, and highly interactive user-friendly web applications. With main expertise in HTML5, CSS3, JavaScript, and React, I center on creating clean, highly styled, and performant digital experiences.",
  bioParagraph2: "Beyond core frontend development, I have actively expanded my skillset through professional credentials in Project Management, Cybersecurity, Data Analytics, Digital Marketing, Freelancing, and Microsoft Office Applications. I believe in relentless hard work and self-directed continuous learning as the cornerstone of professional excellence.",
  email: "rizwanbugti33@gmail.com",
  phone: "+92 304 858384",
  location: "Quetta, Pakistan",
  whatsapp: "https://wa.me/923048588384",
  github: "https://github.com/rizwanbugti384",
  linkedin: "https://linkedin.com/in/rizwanbugti",
  twitter: "https://x.com/MRizwanbugti",
  instagram: "https://www.instagram.com/rizwanbugti11"
};

export const SKILL_CATEGORIES = [
  {
    title: "Development Core",
    icon: "code",
    skills: [
      { name: "HTML5 & CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React.js Framework", level: 85 },
      { name: "Responsive Web Design", level: 98 },
      { name: "Vite & Tailwind CSS", level: 92 }
    ]
  },
  {
    title: "Technical Expertise & Tools",
    icon: "layers",
    skills: [
      { name: "Data Analytics & AI Tools", level: 85 },
      { name: "Cybersecurity Fundamentals", level: 80 },
      { name: "Microsoft Office (Excel/Word)", level: 90 },
      { name: "Git & Version Control", level: 85 }
    ]
  },
  {
    title: "Project & Business Skills",
    icon: "briefcase",
    skills: [
      { name: "Project Management Fundamentals", level: 88 },
      { name: "Digital Marketing & SEO", level: 82 },
      { name: "Freelancing & Client Delivery", level: 90 },
      { name: "Continuous Learning & Research", level: 100 }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "SynergyTask - Dynamic Team Board",
    description: "An elegant, interactive project management interface boasting smooth drag-and-drop mechanics, nested task items, priority tagging, and comprehensive client-side state logging. Inspired by Project Management methodologies.",
    category: "React Web Apps",
    tags: ["React", "Tailwind CSS", "Motion", "LocalStorage"],
    codeLink: "https://github.com/rizwanbugti384/synergy-task-planner",
    demoLink: "#",
    image: "https://picsum.photos/seed/synergy/600/400"
  },
  {
    id: "proj-2",
    title: "ShopZone - Premium E-Commerce Showcase",
    description: "A fully fluid, modern web storefront with dynamic categorization, interactive shopping cart capabilities, elegant detail slide-overs, and a mobile-optimized checkout panel designed for high user conversions.",
    category: "Frontend UI/UX",
    tags: ["HTML5", "CSS Grid", "JavaScript", "Responsive Design"],
    codeLink: "https://github.com/rizwanbugti384/shopzone-storefront",
    demoLink: "#",
    image: "https://picsum.photos/seed/shop/600/400"
  },
  {
    id: "proj-3",
    title: "Certified Academic Hub Platform",
    description: "An educational resource tracker created as a showcase project for professional certifications. Features responsive layouts, course syllabus sliders, student feedback systems, and dynamic resource lists.",
    category: "Responsive Web Design",
    tags: ["HTML5", "CSS3 Slider", "JavaScript ES6", "Form Validation"],
    codeLink: "https://github.com/rizwanbugti384/RizwanBugti-Introduction",
    demoLink: "https://rizwanbugti384.github.io/RizwanBugti-Introduction/",
    image: "https://picsum.photos/seed/curriculum/600/400"
  },
  {
    id: "proj-4",
    title: "CyberShield Web Intelligence",
    description: "An interactive educational dashboard guiding users through foundational cybersecurity best practices, featuring dynamic security quizzes, encryption simulators, and a mock password strength auditing tool.",
    category: "AI & Tools",
    tags: ["React", "Tailwind CSS", "Lucide Icons", "Web Cryptography"],
    codeLink: "https://github.com/rizwanbugti384/cybershield-guide",
    demoLink: "#",
    image: "https://picsum.photos/seed/cyber/600/400"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Muhammad Ali",
    role: "Project Director",
    company: "Creative IT Initiative",
    rating: 5,
    feedback: "Rizwan displayed exceptional commitment during our professional development tracks. His absolute proficiency in responsive design, React framework integrations, and modern clean layouts sets him on a stellar level.",
    avatar: "https://picsum.photos/seed/ali/150/150"
  },
  {
    id: "test-2",
    name: "John Miller",
    role: "Director of Digital Strategy",
    company: "NorthPeak Agency",
    rating: 5,
    feedback: "We hired Rizwan to construct our company's marketing landing pages. His eye for meticulous spacing, rapid response to edits, and thorough understanding of mobile friendliness was magnificent. He delivered the project ahead of schedule!",
    avatar: "https://picsum.photos/seed/john/150/150"
  },
  {
    id: "test-3",
    name: "Sarah Jenkins",
    role: "Founder & Creative Lead",
    company: "Bloom Botanicals",
    rating: 5,
    feedback: "Our brand's user base jumped 25% after Rizwan overhauled our layout. His clean-code approach and creative design concepts yielded a highly responsive and responsive layout across desktops, tablets, and phones.",
    avatar: "https://picsum.photos/seed/sarah/150/150"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Power of Tailwind CSS v4: The New Era of Styling",
    summary: "Dive deep into the highly anticipated modern features of Tailwind v4, including its blazing fast CSS parser, modern variable themes, native browser features, and streamlined build toolchains.",
    content: "Tailwind CSS v4 introduces a revolutionary paradigm shift in how we build high-performance web applications. By utilizing the newest CSS variables capabilities and a fully optimized custom CSS parser, compilation speeds are multiplied by nearly ten. \n\nIn this blog, we explore the beauty of compiling custom utility properties natively, omitting custom PostCSS processors, and harnessing the new `@theme` directives directly. By utilizing pure, native-first declarations, developers can create sophisticated fluid layouts without bloated utility classes.",
    date: "May 28, 2026",
    readTime: "5 min read",
    category: "Frontend Dev",
    author: "Rizwan",
    image: "https://picsum.photos/seed/tailwind/800/400",
    tags: ["Tailwind", "CSS v4", "Web Trends"]
  },
  {
    id: "blog-2",
    title: "My Creative Journey: Conquering Modern Web & React",
    summary: "An inspiring retrospective detailing my educational trajectory through professional certification tracks, conquering foundational concepts, and building powerful React interfaces.",
    content: "Enrolling in advanced certified developer tracks completely reshaped my perspective on technology. Starting from foundational semantic HTML5 and grid systems, we quickly advanced to complex functional JavaScript and state cycles in modern React.\n\nIn this visual retrospective, I share my daily routines, debugging tips when wrestling with asynchronous updates, and how structural program certifications in Project Management and Cybersecurity help me build smarter, cleaner, and highly secure web products.",
    date: "April 15, 2026",
    readTime: "7 min read",
    category: "Career Journey",
    author: "Rizwan",
    image: "https://picsum.photos/seed/journey/800/400",
    tags: ["Web Dev", "Story", "React"]
  },
  {
    id: "blog-3",
    title: "The Mobile-First Blueprint: Checklist for Bulletproof Fluidity",
    summary: "Discover the critical design principles and practical development tips to guarantee your layout renders beautifully across every single display size.",
    content: "A website that looks beautiful on an ultra-wide screen but breaks on an iPhone SE is an incomplete solution. Developing real fluid projects starts with dynamic constraints rather than simple media queries.\n\nWe outline a reliable blueprint for responsive typography pairing, touch response scales (at least 44px for targets), avoiding fixed bounding widths, using Flexbox/Grid proportions, and testing actual layout transitions.",
    date: "March 10, 2026",
    readTime: "4 min read",
    category: "UI Design",
    author: "Rizwan",
    image: "https://picsum.photos/seed/fluid/800/400",
    tags: ["UX Design", "Responsive Layouts", "CSS Grid"]
  }
];

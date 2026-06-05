import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, Sparkles, GraduationCap, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: PERSONAL_INFO.github, label: 'GitHub', color: 'hover:text-white hover:bg-slate-800' },
    { icon: <Linkedin className="h-5 w-5" />, href: PERSONAL_INFO.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:bg-blue-500/10' },
    { icon: <Twitter className="h-5 w-5" />, href: PERSONAL_INFO.twitter, label: 'X (Twitter)', color: 'hover:text-sky-400 hover:bg-sky-500/10' },
    { icon: <Instagram className="h-5 w-5" />, href: PERSONAL_INFO.instagram, label: 'Instagram', color: 'hover:text-pink-400 hover:bg-pink-500/10' },
  ];

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#0b0f19] to-[#020617]">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-sky-505/5 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy (8 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-sky-500/10 text-sky-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide w-fit border border-sky-500/20"
              id="hero-badge"
            >
              <Sparkles className="h-3 w-3 animate-pulse text-sky-400" />
              <span>Available for New Projects</span>
            </motion.div>

            {/* Main Greeting */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight" id="hero-greeting">
              Hi, I'm <br className="sm:hidden" />
              <span className="gradient-text">{PERSONAL_INFO.fullName}</span>
            </h1>

            {/* Headlines */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 font-sans tracking-tight" id="hero-headline">
              {PERSONAL_INFO.headline}
            </h2>

            {/* Paragraph Bio */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-light" id="hero-intro-text">
              {PERSONAL_INFO.bioParagraph1}
            </p>

            {/* Interactive Quick Stats / Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2" id="hero-quick-stats">
              <div className="flex items-center space-x-3 bg-[#0f172a]/90 p-3 rounded-xl border border-slate-800 hover:border-sky-500/30 transition duration-300">
                <div className="p-2 bg-sky-500/10 text-sky-405 text-sky-400 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="overflow-hidden text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Email Me</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm text-slate-300 font-medium hover:text-sky-400 block truncate">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-[#0f172a]/90 p-3 rounded-xl border border-slate-800 hover:border-sky-500/30 transition duration-300">
                <div className="p-2 bg-sky-500/10 text-sky-405 text-sky-400 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Call / Whatsapp</p>
                  <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-slate-300 font-medium hover:text-sky-400 block">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-[#0f172a]/90 p-3 rounded-xl border border-slate-800 hover:border-sky-500/30 transition duration-300">
                <div className="p-2 bg-sky-500/10 text-sky-405 text-sky-400 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Location</p>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium block">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Large Buttons and Social Tray */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4" id="hero-actions-tray">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-sky-400 hover:bg-sky-500 active:scale-98 text-slate-950 font-bold px-6 py-3 rounded-xl transition duration-300 text-center shadow-lg shadow-sky-450/15 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-view-work"
              >
                <span>View Portfolio Projects</span>
                <Send className="h-4 w-4 text-slate-950" />
              </a>

              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="no-referrer"
                className="w-full sm:w-auto bg-[#0f172a] hover:bg-slate-900 hover:text-sky-400 text-slate-200 border border-slate-800 font-semibold px-6 py-3 rounded-xl transition duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
                id="hero-chat-whatsapp"
              >
                <span>Chat on WhatsApp</span>
              </a>

              {/* Social links */}
              <div className="flex items-center space-x-3 sm:ml-4 pt-2 sm:pt-0" id="hero-social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="no-referrer"
                    aria-label={social.label}
                    className="h-11 w-11 rounded-xl flex items-center justify-center border border-slate-800 text-slate-400 bg-[#0f172a] transition-all duration-300 hover:text-sky-400 hover:bg-slate-900"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Avatar Graphic Side (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.3 }}
              className="relative w-72 h-72 sm:w-85 sm:h-85 lg:w-96 lg:h-96"
              id="hero-avatar-container"
            >
              {/* Outer Glowing Hexagon / Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 via-indigo-505 via-indigo-500 to-sky-450 rounded-2xl rotate-6 opacity-10 blur-xl animate-pulse" />
              <div className="absolute inset-2 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center p-3 sm:p-4 hover:border-sky-500/40 transition-colors duration-500 shadow-2xl">
                {/* Real local generated image inside */}
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950 relative group">
                   <img
                    src="/src/assets/images/instasquare.photoeditor.effect.cutout_202641023822343.png"
                    alt={PERSONAL_INFO.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    id="hero-pic-asset"
                  />
                  {/* Subtle glass overlay banner */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-sm border-t border-slate-800 flex items-center justify-between">
                    <div className="text-left">
                      <h4 className="font-sans font-semibold text-xs text-slate-200">Certified Developer</h4>
                      <p className="font-mono text-[9px] text-sky-400">Frontend Web & Applications</p>
                    </div>
                    <Award className="h-4 w-4 text-sky-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

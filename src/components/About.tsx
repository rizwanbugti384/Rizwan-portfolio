import { motion } from 'motion/react';
import { Award, Shield, Cpu, TrendingUp, Briefcase, FileSpreadsheet, GraduationCap, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function About() {
  const certifications = [
    {
      title: "Certified Web Developer",
      field: "Frontend & Web Development",
      description: "Comprehensive professional software training in HTML5, CSS3, JavaScript ES6+, responsive UI, and React systems.",
      icon: <GraduationCap className="h-5 w-5 text-sky-400" />,
      color: "border-slate-800 bg-[#0f172a] hover:border-sky-500/30 shadow-lg"
    },
    {
      title: "Project Management",
      field: "Fundamentals Certificate",
      description: "Sprint scheduling, project workflows, task delegation, and tracking milestones.",
      icon: <Briefcase className="h-5 w-5 text-blue-400" />,
      color: "border-slate-800 bg-[#0f172a] hover:border-blue-500/30 shadow-lg"
    },
    {
      title: "Cybersecurity",
      field: "Foundations & Security Rules",
      description: "Familiarity with web encryption protocols, securing data transmission, and protecting sensitive storage layers.",
      icon: <Shield className="h-5 w-5 text-indigo-400" />,
      color: "border-slate-800 bg-[#0f172a] hover:border-indigo-500/30 shadow-lg"
    },
    {
      title: "Data Analytics & AI Tools",
      field: "Business Intelligence",
      description: "Data visualization, advanced search, grounding techniques, and applying Gemini/LLMs for workflow optimization.",
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      color: "border-slate-800 bg-[#0f172a] hover:border-purple-500/30 shadow-lg"
    },
    {
      title: "Digital Marketing & SEO",
      field: "Online Sales Growth",
      description: "Search engine visibility, audience analysis, and core conversions strategy for optimized performance.",
      icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
      color: "border-slate-800 bg-[#0f172a] hover:border-amber-500/30 shadow-lg"
    },
    {
      title: "Microsoft Office Applications",
      field: "Productivity Suite",
      description: "Advanced functions inside Word, custom Excel spreadsheet analyses, and elite presentation decks in PowerPoint.",
      icon: <FileSpreadsheet className="h-5 w-5 text-purple-500" />,
      color: "border-slate-800 bg-[#0f172a] hover:border-purple-500/30 shadow-lg"
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase animate-pulse">My Journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Professional Background
          </h2>
          <div className="h-1 w-12 bg-sky-400 mx-auto mt-4 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-content">
          {/* Narrative Bio Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight">
              {PERSONAL_INFO.bioHeadline}
            </h3>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {PERSONAL_INFO.bioParagraph1}
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {PERSONAL_INFO.bioParagraph2}
            </p>

            {/* Quick Education Highlight details */}
            <div className="bg-[#0f172a] p-5 rounded-2xl border border-slate-800/80 space-y-4" id="education-highlight">
              <h4 className="font-semibold text-sm text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-sky-400 animate-pulse" />
                Academic Background
              </h4>
              <div className="border-l-2 border-sky-400/35 pl-4 space-y-3">
                <div>
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-slate-200">Intermediate in ICS</p>
                    <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full font-mono">Present</span>
                  </div>
                  <p className="text-xs text-slate-400">Tameer-e-Nau College, Quetta</p>
                </div>
              </div>
            </div>

            {/* A warm motivational tag */}
            <div className="p-4 bg-sky-500/5 rounded-xl border border-sky-500/10 text-xs text-sky-400 italic">
              "I believe in hard work, consistency, and lifelong learning as the foundational structure of professional growth and creation."
            </div>
          </div>

          {/* Certifications and credentials list (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Award className="h-5 w-5 text-sky-400 animate-pulse" />
                Certified Expertise
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {certifications.length} Credentials
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="certifications-grid">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 block ${cert.color}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-slate-900 rounded-xl">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-100 leading-tight">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {cert.field}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

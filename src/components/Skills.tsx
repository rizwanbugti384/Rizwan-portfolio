import { useState } from 'react';
import { Cpu, Code, Layers, Briefcase, Terminal, Sliders } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-5 w-5 text-sky-400" />;
      case 'layers':
        return <Layers className="h-5 w-5 text-indigo-400" />;
      case 'briefcase':
        return <Briefcase className="h-5 w-5 text-purple-400" />;
      default:
        return <Cpu className="h-5 w-5 text-sky-400" />;
    }
  };

  const getCategoryTheme = (index: number) => {
    switch (index) {
      case 0:
        return {
          glow: 'shadow-sky-500/10 border-sky-400/20 text-sky-400 bg-sky-500/5',
          bar: 'bg-sky-450 bg-sky-400',
          text: 'text-sky-400'
        };
      case 1:
        return {
          glow: 'shadow-indigo-500/10 border-indigo-400/20 text-indigo-400 bg-indigo-500/5',
          bar: 'bg-indigo-400',
          text: 'text-indigo-400'
        };
      case 2:
        return {
          glow: 'shadow-purple-500/10 border-purple-400/20 text-purple-400 bg-purple-500/5',
          bar: 'bg-purple-400',
          text: 'text-purple-400'
        };
      default:
        return {
          glow: 'shadow-sky-500/10 border-sky-400/20 text-sky-400 bg-sky-500/5',
          bar: 'bg-sky-400',
          text: 'text-sky-400'
        };
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase animate-pulse">What I bring</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Core Skill Sets
          </h2>
          <div className="h-1 w-12 bg-sky-400 mx-auto mt-4 rounded" />
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" id="skill-categories-tabs">
          {SKILL_CATEGORIES.map((cat, i) => {
            const active = selectedCategory === i;
            const theme = getCategoryTheme(i);
            return (
              <button
                key={i}
                onClick={() => setSelectedCategory(i)}
                className={`flex items-center space-x-2.5 px-6 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-305 cursor-pointer scale-95 focus:outline-none ${
                  active
                    ? `${theme.glow} border-current ring-1 ring-current`
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected skills renderer */}
        <div className="max-w-3xl mx-auto bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative" id="skills-list-container">
          <div className="absolute top-4 right-6 flex items-center space-x-1 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
            <Sliders className="h-3.5 w-3.5" />
            <span>Interactive</span>
          </div>

          <h3 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8 text-left">
            Expertise Metrics — {SKILL_CATEGORIES[selectedCategory].title}
          </h3>

          <div className="space-y-6">
            {SKILL_CATEGORIES[selectedCategory].skills.map((skill, index) => {
              const theme = getCategoryTheme(selectedCategory);
              return (
                <div key={index} className="space-y-2 group">
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className={`font-mono text-xs sm:text-sm font-semibold ${theme.text}`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Meter Track */}
                  <div className="h-2.5 w-full bg-[#0a0d14] rounded-full overflow-hidden p-0.5 border border-slate-800/50">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${theme.bar}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Terminal className="h-3.5 w-3.5 text-sky-400" />
              Continuous learning: <strong>100%</strong>
            </span>
            <span>Based on Certified Training</span>
          </div>
        </div>
      </div>
    </section>
  );
}

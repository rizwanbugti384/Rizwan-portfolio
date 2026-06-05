import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Folder, X, SquareArrowOutUpRight, Info } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Available categories to filter
  const categories = ['All', 'React Web Apps', 'Frontend UI/UX', 'Responsive Web Design', 'AI & Tools'];

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase animate-pulse">My Creations</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-sky-400 mx-auto mt-4 rounded" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="project-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer focus:outline-none ${
                filter === cat
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-500/10'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          id="project-cards-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="bg-[#0f172a] rounded-2xl border border-slate-800/80 overflow-hidden hover:border-sky-500/30 transition-all duration-350 flex flex-col group h-full shadow-lg"
              >
                {/* Product Image Panel */}
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-[10px] text-sky-400 font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold shadow-md">
                    {project.category}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-sans font-bold text-lg text-slate-100 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light flex-grow">
                    {project.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-slate-800/80 text-slate-300 border border-slate-700/50 font-mono px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Card Actions */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer transition focus:outline-none"
                    >
                      <Info className="h-3.5 w-3.5 text-sky-400" />
                      View Details
                    </button>

                    {project.demoLink && project.demoLink !== "#" && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="no-referrer"
                        className="text-sky-400 hover:text-sky-300 text-xs font-semibold flex items-center gap-1.5 ml-auto transition"
                      >
                        <span className="underline">Live Demo</span>
                        <SquareArrowOutUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}

                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="no-referrer"
                        className={`text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 ${
                          (!project.demoLink || project.demoLink === "#") ? 'ml-auto' : ''
                        }`}
                      >
                        <Github className="h-4 w-4" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal display portal overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#090d16]/80 backdrop-blur-sm"
              />

              {/* Bounding main modal card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl relative z-10 flex flex-col text-left max-h-[90vh]"
                id="project-detail-modal"
              >
                {/* Control closer */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 p-2 text-slate-400 hover:text-white rounded-full border border-slate-805/50 z-20 transition cursor-pointer hover:bg-slate-800 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Banner container */}
                <div className="relative aspect-[16/9] w-full bg-slate-950">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover animate-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] bg-sky-500/20 text-sky-405 text-sky-400 border border-sky-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono font-semibold">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Subinfo container details scrolling panel */}
                <div className="p-6 space-y-5 overflow-y-auto flex-grow">
                  <div>
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">Project Overview</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-800 text-slate-250 text-slate-200 border border-slate-700/40 font-mono px-3 py-1 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights section */}
                  <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-1.5 font-bold">Key Project Deliverables</h4>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      <li>Modern fully-fluid responsive web architectural grids and alignments.</li>
                      <li>Strict semantic coding syntax for accessible rendering.</li>
                      <li>Interactive form handlers with validations and local triggers.</li>
                      <li>Smooth animations utilizing Tailwind systems and React layouts.</li>
                    </ul>
                  </div>

                  {/* Actions Tray */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                    {selectedProject.demoLink && selectedProject.demoLink !== "#" && (
                      <a
                        href={selectedProject.demoLink}
                        target="_blank"
                        rel="no-referrer"
                        className="w-full sm:w-auto bg-sky-400 hover:bg-sky-500 text-slate-950 text-center font-bold px-5 py-2.5 rounded-xl transition duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4 text-slate-950" />
                        <span>Visit Live Site</span>
                      </a>
                    )}
                    {selectedProject.codeLink && (
                      <a
                        href={selectedProject.codeLink}
                        target="_blank"
                        rel="no-referrer"
                        className="w-full sm:w-auto bg-slate-800 hover:bg-slate-755 text-slate-200 text-center font-bold px-5 py-2.5 rounded-xl transition border border-slate-700 flex items-center justify-center gap-2"
                      >
                        <Github className="h-4.5 w-4.5" />
                        <span>Inspect Codebase</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

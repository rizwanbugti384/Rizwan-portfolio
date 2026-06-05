import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll testimonials every 10 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute left-1/5 top-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase animate-pulse">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Client Testimonials
          </h2>
          <div className="h-1 w-12 bg-sky-400 mx-auto mt-4 rounded" />
        </div>

        {/* Carousel container */}
        <div className="max-w-4xl mx-auto relative px-4" id="testimonials-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-[#0f172a] rounded-3xl border border-slate-800/80 p-8 sm:p-12 relative flex flex-col items-center text-center shadow-2xl"
            >
              {/* Giant absolute quote symbol */}
              <Quote className="absolute top-6 left-8 h-12 w-12 text-slate-850 pointer-events-none opacity-20" />
              <Quote className="absolute bottom-6 right-8 h-12 w-12 text-slate-855 pointer-events-none opacity-20 rotate-180" />

              {/* Star Rating Panel */}
              <div className="flex space-x-1 mb-6 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>

              {/* Core Quote Content */}
              <blockquote className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed mb-8 max-w-2xl italic font-sans text-center">
                "{t.feedback}"
              </blockquote>

              {/* Reviewer Meta Panel */}
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full border-2 border-sky-404 border-sky-500/25 bg-slate-950 p-0.5 object-cover"
                />
                <div>
                  <cite className="not-italic text-sm sm:text-base font-bold text-slate-100 block">
                    {t.name}
                  </cite>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5 block">
                    {t.role} @ <strong className="text-sky-404 text-sky-400 font-semibold">{t.company}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-slate-900 border border-slate-800 text-slate-350 hover:text-white rounded-2xl cursor-pointer hover:border-slate-700 transition active:scale-95 focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Pagination indicators Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-sky-400' : 'w-2.5 bg-slate-800 hover:bg-slate-750'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-slate-900 border border-slate-800 text-slate-350 hover:text-white rounded-2xl cursor-pointer hover:border-slate-700 transition active:scale-95 focus:outline-none"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Verification Quote Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-[#0f172a] border border-slate-800 px-4 py-2 rounded-full text-[11px] text-slate-400 font-mono">
            <MessageSquare className="h-4 w-4 text-sky-400" />
            <span>Verifiable Client Feedback & Training Records</span>
          </div>
        </div>
      </div>
    </section>
  );
}

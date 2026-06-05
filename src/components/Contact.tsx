import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { ContactMessage } from '../types';

interface ContactProps {
  onMessageSubmit: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
}

export default function Contact({ onMessageSubmit }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format.';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please supply a subject line.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message content.';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database network latency
    setTimeout(() => {
      onMessageSubmit(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success notification after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute left-10 top-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase animate-pulse">Get in touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Let's Collaborate
          </h2>
          <div className="h-1 w-12 bg-sky-400 mx-auto mt-4 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-wrapper">
          {/* Card Info Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-150 leading-snug">
                Have an Innovative Idea? <br />
                Let's Build It Together!
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-3 font-light leading-relaxed">
                Whether you need a fully polished frontend interface, an interactive React application, or standard business solutions, my lines are always open. Reach out, let's establish connections!
              </p>
            </div>

            {/* Direct Contact Handles */}
            <div className="space-y-4" id="contact-info-block">
              {/* Email */}
              <div className="flex items-center space-x-4 bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-sky-500/25 transition">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Global Email</h4>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-semibold text-slate-200 hover:text-sky-400 block mt-1.5 break-all">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Whatsapp */}
              <div className="flex items-center space-x-4 bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-sky-500/25 transition">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">WhatsApp / Calls</h4>
                  <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="no-referrer" className="text-sm font-semibold text-slate-200 hover:text-sky-400 block mt-1.5">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-sky-500/25 transition">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Home Location</h4>
                  <address className="not-italic text-sm font-semibold text-slate-200 mt-1.5 block">
                    {PERSONAL_INFO.location}
                  </address>
                </div>
              </div>
            </div>

            {/* Availability details card */}
            <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-850/80 flex items-center space-x-3 text-xs text-slate-400" id="hours-badge">
              <Clock className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
              <span>Standard Response Time: <strong>Within 4 hours</strong></span>
            </div>
          </div>

          {/* Contact Interactive Form Column (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f172a] rounded-3xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl relative">
              <h3 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6 text-left">
                Direct Communication Form
              </h3>

              {isSuccess && (
                <div className="mb-6 bg-sky-500/10 border border-sky-500/25 p-4 rounded-xl text-left flex items-start space-x-3 text-xs sm:text-sm text-sky-400 animate-fadeIn" id="success-message">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 animate-bounce" />
                  <div>
                    <strong className="font-bold block mb-0.5">Thank you, Message Received!</strong>
                    <span>Your message has been captured. I will get back to you promptly! You can verify this in the Inbox panel in the header!</span>
                  </div>
                </div>
              )}

              <form onSubmit={submitForm} className="space-y-4 text-left" id="contact-inner-form">
                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-medium text-slate-350">Your Name</label>
                    <input
                      id="form-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Ali Khan"
                      className={`w-full bg-[#060b13] border rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                        errors.name ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 flex items-center gap-1.5 pl-1">
                        <AlertCircle className="h-3 w-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-medium text-slate-350">Your Email</label>
                    <input
                      id="form-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g. user@example.com"
                      className={`w-full bg-[#060b13] border rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                        errors.email ? 'border-red-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 flex items-center gap-1.5 pl-1">
                        <AlertCircle className="h-3 w-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="form-subject" className="text-xs font-medium text-slate-350">Subject</label>
                  <input
                    id="form-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="e.g. Website Overhaul and Project Proposal"
                    className={`w-full bg-[#060b13] border rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                      errors.subject ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1.5 pl-1">
                      <AlertCircle className="h-3 w-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message text content */}
                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-xs font-medium text-slate-350">Message</label>
                  <textarea
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe your design goals, required pages, and timelines..."
                    className={`w-full bg-[#060b13] border rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-sky-400 resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-800'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1.5 pl-1">
                      <AlertCircle className="h-3 w-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-400 hover:bg-sky-500 disabled:bg-slate-900 disabled:text-slate-500 text-slate-950 font-bold py-3.5 rounded-xl transition duration-300 shadow-md shadow-sky-500/10 flex items-center justify-center gap-2 cursor-pointer focus:outline-none scale-98 active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="h-4.5 w-4.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Secure Message</span>
                      <Send className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

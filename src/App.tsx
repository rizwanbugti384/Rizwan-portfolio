import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, ChevronUp, Cpu, Award } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AdminInbox from './components/AdminInbox';
import { ContactMessage } from './types';
import { PERSONAL_INFO } from './data';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auth and Firebase operational state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Monitor Auth sessions to set Admin mode
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
      const emailMatch = firebaseUser && firebaseUser.email === "boss588384@gmail.com";
      setIsAdmin(!!emailMatch);
    });
    return () => unsubscribe();
  }, []);

  // Sync messages either from local storage or cloud depending on mode
  useEffect(() => {
    if (isAdmin) {
      loadBackendMessages();
    } else {
      // Standard visitor / tester locale logging
      const saved = localStorage.getItem('rizwan_portfolio_messages');
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading saved messages:', e);
        }
      } else {
        // Pre-seed 1 welcome message so they can see how it works instantly the first time!
        const initialSeed: ContactMessage[] = [
          {
            id: 'seed-welcome',
            name: 'Sarah Peterson (Digital Recruiter)',
            email: 'sarah.recruits@example.com',
            subject: 'Stunning Work - Project Collaboration Inquiry',
            message: 'Hello Rizwan!\n\nI was browsing your interactive developer portfolio and was highly impressed by your certifications in Project Management, Cybersecurity, and your Web Development credentials as a Certified Developer.\n\nYour layout matches all of our design criteria: pristine response speeds, high-contrast grid layouts, and meticulous spacing. We have a React project upcoming and would love to collaborate. Looking forward to talking!\n\nCheers,\nSarah',
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        ];
        setMessages(initialSeed);
        localStorage.setItem('rizwan_portfolio_messages', JSON.stringify(initialSeed));
      }
    }
  }, [isAdmin]);

  // Load list of inquiries securely from Firebase Firestore using query enforcer ordering
  const loadBackendMessages = async () => {
    if (!auth.currentUser || auth.currentUser.email !== "boss588384@gmail.com") return;
    setIsSyncing(true);
    const messagesPath = 'messages';
    try {
      const q = query(collection(db, messagesPath), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: ContactMessage[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetched.push({
          id: docSnap.id,
          name: data.name || '',
          email: data.email || '',
          subject: data.subject || '',
          message: data.message || '',
          date: data.date || '',
        });
      });
      setMessages(fetched);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, messagesPath);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSignInAdmin = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Developer sign-in failed:", error);
      if (error && (error.code === 'auth/popup-blocked' || error.message?.includes('popup-blocked') || error.message?.includes('popup_blocked'))) {
        setAuthError('popup-blocked');
      } else if (error && (error.code === 'auth/cancelled-popup-request' || error.message?.includes('cancelled-popup-request'))) {
        setAuthError('cancelled-popup');
      } else {
        setAuthError(error.message || String(error));
      }
    }
  };

  const handleSignOutAdmin = async () => {
    try {
      setAuthError(null);
      await signOut(auth);
      setMessages([]); // clean cached emails
    } catch (error) {
      console.error("Developer sign-out failed:", error);
    }
  };

  // Submission handler transmits data to cloud Firestore and local storage log for demonstration
  const handleMessageSubmit = async (newMsg: Omit<ContactMessage, 'id' | 'date'>) => {
    const formattedDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // 1. Log locally so visitor sees verification instantly
    const localId = `local-${Date.now()}`;
    const localMsg: ContactMessage = {
      ...newMsg,
      id: localId,
      date: formattedDate
    };

    if (!isAdmin) {
      const updatedLocal = [localMsg, ...messages];
      setMessages(updatedLocal);
      localStorage.setItem('rizwan_portfolio_messages', JSON.stringify(updatedLocal));
    }

    // 2. Log online inside Firestore with rigorous Server-time schema checks (Zero-Trust)
    const messagesPath = 'messages';
    try {
      await addDoc(collection(db, messagesPath), {
        name: newMsg.name,
        email: newMsg.email,
        subject: newMsg.subject,
        message: newMsg.message,
        date: formattedDate,
        createdAt: serverTimestamp() // server-side timestamp validation
      });
      console.log('Frictionless delivery to Firestore established.');
      
      // If signed in as admin, trigger real-time refresh
      if (isAdmin) {
        loadBackendMessages();
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, messagesPath);
    }
  };

  // Securely deletes documentation from Firestore (under admin restrictions) or local storage
  const handleDeleteMessage = async (id: string) => {
    if (isAdmin) {
      const messagesPath = `messages/${id}`;
      try {
        await deleteDoc(doc(db, 'messages', id));
        loadBackendMessages();
      } catch (e) {
        handleFirestoreError(e, OperationType.DELETE, messagesPath);
      }
    } else {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('rizwan_portfolio_messages', JSON.stringify(updated));
    }
  };

  const handleClearAllMessages = async () => {
    if (isAdmin) {
      const messagesPath = 'messages';
      try {
        for (const msg of messages) {
          await deleteDoc(doc(db, 'messages', msg.id));
        }
        loadBackendMessages();
      } catch (e) {
        handleFirestoreError(e, OperationType.DELETE, messagesPath);
      }
    } else {
      setMessages([]);
      localStorage.removeItem('rizwan_portfolio_messages');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans" id="app-root">
      {/* Dynamic Navigation Header */}
      <Header
        onOpenInbox={() => setIsInboxOpen(true)}
        messageCount={messages.length}
      />

      {/* Main sections block */}
      <main className="flex-grow">
        {/* Home Banner */}
        <Hero />

        {/* Professional About */}
        <About />

        {/* Core Skills */}
        <Skills />

        {/* Portfolio Gallery */}
        <Projects />

        {/* Trust testimonials */}
        <Testimonials />

        {/* Technical Blogs */}
        <Blog />

        {/* Easy Contact */}
        <Contact onMessageSubmit={handleMessageSubmit} />
      </main>

      {/* Modular Side drawer Admin Inbox logs */}
      <AdminInbox
        messages={messages}
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        onDeleteMessage={handleDeleteMessage}
        onClearAll={handleClearAllMessages}
        currentUser={currentUser}
        isAdmin={isAdmin}
        isSyncing={isSyncing}
        onSignIn={handleSignInAdmin}
        onSignOut={handleSignOutAdmin}
        onRefresh={loadBackendMessages}
        authError={authError}
        onClearAuthError={() => setAuthError(null)}
      />

      {/* Footer Branding section */}
      <footer className="bg-[#090d16] border-t border-slate-805/85 py-12" id="portfolio-main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
            {/* Left section info */}
            <div className="md:col-span-2 space-y-4">
              <span className="font-sans font-bold tracking-tight text-xl text-white">
                Rizwan<span className="text-sky-400">.dev</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
                Certified frontend web developer from Dera Bugti, Pakistan. Specializing in modern React web applications, bulletproof mobile-friendly responsive designs, and professional digital strategies.
              </p>
              <div className="flex items-center space-x-3 pt-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="no-referrer"
                  className="h-9 w-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                  title="GitHub Profiles"
                >
                  <Github className="h-4.5 w-4.5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="no-referrer"
                  className="h-9 w-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 transition"
                  title="LinkedIn Profiles"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="no-referrer"
                  className="h-9 w-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-slate-700 transition"
                  title="X (Twitter) Profiles"
                >
                  <Twitter className="h-4.5 w-4.5" />
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="no-referrer"
                  className="h-9 w-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-slate-700 transition"
                  title="Instagram Profiles"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Middle links: Navigation */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-slate-350 uppercase tracking-widest pl-1">Quick Links</h4>
              <nav className="flex flex-col space-y-2 text-xs">
                <a href="#home" className="text-slate-400 hover:text-sky-400 transition text-left pl-1">Home Page</a>
                <a href="#about" className="text-slate-400 hover:text-sky-400 transition text-left pl-1">Background Journey</a>
                <a href="#skills" className="text-slate-400 hover:text-sky-400 transition text-left pl-1">Expertise & Skills</a>
                <a href="#projects" className="text-slate-400 hover:text-sky-400 transition text-left pl-1">Portfolio Work</a>
              </nav>
            </div>

            {/* Right section: Contact */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-slate-350 uppercase tracking-widest pl-1">Get In Touch</h4>
              <div className="space-y-2 text-xs text-slate-400 pl-1">
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-sky-400 break-all">{PERSONAL_INFO.email}</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
                  <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">{PERSONAL_INFO.phone}</a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Subfooter base copy */}
          <div className="pt-8 border-t border-slate-805/45 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
            <p>© {new Date().getFullYear()} Rizwan Ullah Bugti. All rights reserved.</p>
            <div className="flex items-center space-x-2">
              <Cpu className="h-3.5 w-3.5 text-sky-400" />
              <span>Built with React + Tailwind CSS</span>
              <Award className="h-3.5 w-3.5 text-sky-400" />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-sky-400 hover:bg-sky-500 outline-none text-slate-950 rounded-full shadow-lg shadow-sky-500/15 cursor-pointer transition-all duration-300 transform select-none"
          id="btn-scroll-top"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 text-slate-950" />
        </button>
      )}
    </div>
  );
}


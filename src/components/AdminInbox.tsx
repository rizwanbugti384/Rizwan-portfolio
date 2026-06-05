import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Search, MailOpen, Mail, Calendar, Sparkles, Inbox, RefreshCw, LogIn, LogOut, ShieldCheck, Database, AlertTriangle, ExternalLink } from 'lucide-react';
import { ContactMessage } from '../types';

interface AdminInboxProps {
  messages: ContactMessage[];
  isOpen: boolean;
  onClose: () => void;
  onDeleteMessage: (id: string) => void;
  onClearAll: () => void;
  currentUser: any;
  isAdmin: boolean;
  isSyncing: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onRefresh: () => void;
  authError: string | null;
  onClearAuthError: () => void;
}

export default function AdminInbox({
  messages,
  isOpen,
  onClose,
  onDeleteMessage,
  onClearAll,
  currentUser,
  isAdmin,
  isSyncing,
  onSignIn,
  onSignOut,
  onRefresh,
  authError,
  onClearAuthError
}: AdminInboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090d16]/80 backdrop-blur-sm"
          />

          {/* Drawer Panel content (from right) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-[#0f172a] border-l border-slate-800/80 w-full max-w-lg md:max-w-xl h-full shadow-2xl relative z-10 flex flex-col text-left"
            id="admin-inbox-panel"
          >
            {/* Header section card */}
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-1.5 text-left">
                    Creative Inbox
                    {isAdmin ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono animate-pulse">
                        LIVE CLOUD Mode
                      </span>
                    ) : (
                      <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded font-mono">
                        TESTER Mode
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-light text-left">
                    {isAdmin ? (
                      <span>Direct form submissions pulled from <strong>Firebase Firestore</strong></span>
                    ) : (
                      <span>Direct form logs saved in <strong>localStorage</strong>.</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Close handle */}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Developer Auth Control Board */}
            <div className="px-6 py-4 bg-[#0a0f1d] border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              {currentUser ? (
                <div className="flex flex-col text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-200 font-semibold mb-1">
                    <ShieldCheck className={`h-4 w-4 ${isAdmin ? "text-emerald-400" : "text-amber-500"}`} />
                    <span>{isAdmin ? "Admin Account Connected" : "Visitor Authenticated"}</span>
                  </div>
                  <span className="font-mono text-[10px] truncate max-w-[200px] md:max-w-xs">{currentUser.email}</span>
                </div>
              ) : (
                <div className="flex flex-col text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-350 font-medium mb-1">
                    <Database className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Database: <strong>Local Sandbox</strong></span>
                  </div>
                  <span>Rizwan? Sign in to stream live inquiries.</span>
                </div>
              )}

              <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                {currentUser ? (
                  <>
                    {isAdmin && (
                      <button
                        onClick={onRefresh}
                        disabled={isSyncing}
                        className="bg-slate-900 border border-slate-800 text-sky-400 hover:text-sky-305 text-xs font-bold px-2.5 py-1.5 rounded-lg transition hover:border-slate-700 flex items-center gap-1.5 disabled:opacity-40 select-none cursor-pointer"
                      >
                        <RefreshCw className={`h-3 w-3 ${isSyncing ? "animate-spin" : ""}`} />
                        <span>Sync</span>
                      </button>
                    )}
                    <button
                      onClick={onSignOut}
                      className="bg-red-500/10 border border-red-550/20 text-red-400 hover:bg-red-505/20 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition select-none cursor-pointer"
                    >
                      <LogOut className="h-3 w-3 inline mr-1" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onSignIn}
                    className="bg-sky-400 hover:bg-sky-500 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 hover:shadow-lg hover:shadow-sky-550/15 select-none cursor-pointer"
                  >
                    <LogIn className="h-3 w-3" />
                    <span>Developer Sign-In</span>
                  </button>
                )}
              </div>
            </div>

            {/* Popup Warning for Blocked / Cancelled Popups in sandbox iframe preview */}
            {authError && (
              <div className="mx-6 mt-4 p-4 bg-amber-500/10 border border-amber-550/20 rounded-xl space-y-3" id="auth-iframe-alert">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-amber-500/10 text-amber-400 rounded-lg mt-0.5 shrink-0">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1">
                      Google Sign-In Preview Restriction
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      {authError === 'popup-blocked' || authError === 'cancelled-popup' ? (
                        <span>
                          The sign-in popup was blocked or closed. Because this app is running in a **sandboxed iframe**, browsers restrict background cookies and block authentication popups.
                        </span>
                      ) : (
                        <span>
                          Auth popup error: <code className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded font-mono text-[10px] text-red-300">{authError}</code>
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-light">
                      Click below to open this application in a separate standalone tab where Google Authentication popups and live database features execute flawlessly.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <a
                    href={window.location.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-md cursor-pointer select-none"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Open Standalone Tab</span>
                  </a>
                  <button
                    onClick={onClearAuthError}
                    className="text-[10px] text-slate-400 hover:text-white px-2 py-1 hover:bg-slate-800 rounded transition cursor-pointer select-none"
                  >
                    Dismiss Warning
                  </button>
                </div>
              </div>
            )}

            {/* Message Details Overlay View state inside drawer */}
            {selectedMessage ? (
              <div className="flex-grow flex flex-col h-full bg-slate-950/40" id="inbox-message-detail">
                {/* Back row */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-sky-400 hover:text-sky-300 text-xs font-semibold flex items-center gap-1 focus:outline-none cursor-pointer"
                  >
                    ← Back to inbox list
                  </button>

                  <button
                    onClick={() => {
                      onDeleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="text-red-400 hover:text-red-350 p-2 rounded-lg hover:bg-red-500/5 transition cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Main full read-block body review */}
                <div className="p-6 space-y-6 overflow-y-auto flex-grow text-left">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Subject Line</span>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {selectedMessage.subject}
                    </h4>
                  </div>

                  {/* Sender Details card */}
                  <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Sender:</span>
                      <time className="text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {selectedMessage.date}
                      </time>
                    </div>
                    <div className="text-sm">
                      <strong className="text-slate-200 block font-semibold">{selectedMessage.name}</strong>
                      <a href={`mailto:${selectedMessage.email}`} className="text-sky-400 hover:underline text-xs block mt-0.5 break-all">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                     <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Message Body</span>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap p-4 bg-[#0a0d14] rounded-xl border border-slate-800">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Standard message list view
              <div className="flex-grow flex flex-col h-full overflow-hidden">
                {/* Search query input */}
                <div className="p-4 border-b border-slate-800 bg-[#0b0f19]">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search messages by sender, subject, text..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                </div>

                {/* Message elements container */}
                <div className="flex-grow overflow-y-auto p-4 space-y-3" id="inbox-messages-list">
                  {filteredMessages.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3" id="empty-inbox-message">
                      <Mail className="h-10 w-10 text-slate-700 animate-pulse" />
                      <div>
                        <h4 className="font-semibold text-sm text-slate-400">Your Inbox is quiet.</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm font-light">
                          Submit a message in the portfolio's contact form below to test! New entries land directly here.
                        </p>
                      </div>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className="p-4 bg-slate-950 hover:bg-slate-900/60 rounded-2xl border border-slate-800/80 hover:border-sky-500/20 transition duration-200 cursor-pointer text-left space-y-1.5 relative group"
                      >
                        <div className="flex justify-between items-start">
                          <strong className="text-xs font-bold text-slate-200 block truncate max-w-[150px]">
                            {msg.name}
                          </strong>
                          <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
                            {msg.date.split(',')[0]}
                          </span>
                        </div>

                        <h4 className="text-xs font-semibold text-sky-400 line-clamp-1">
                          {msg.subject}
                        </h4>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-light">
                          {msg.message}
                        </p>

                        <div className="flex items-center space-x-1.5 pt-1 text-[9px] font-mono text-slate-550">
                          <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                            {msg.email}
                          </span>
                        </div>

                        {/* Hover delete handle */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteMessage(msg.id);
                          }}
                          className="absolute bottom-3 right-3 text-slate-500 hover:text-red-400 p-1.5 rounded opacity-0 group-hover:opacity-100 transition focus:outline-none"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Subfooter trigger handles */}
                {messages.length > 0 && (
                  <div className="p-4 border-t border-slate-800 bg-slate-950/30 flex items-center justify-between text-xs text-slate-400">
                    <span>Total Logs: <strong>{messages.length}</strong></span>
                    <button
                      onClick={onClearAll}
                      className="text-red-400 hover:text-red-350 underline font-semibold cursor-pointer focus:outline-none"
                    >
                      Clear database logs
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

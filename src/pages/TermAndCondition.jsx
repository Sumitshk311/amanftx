import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, CreditCard, MessageCircle, Clock, 
  Video, AlertCircle, FileText, CheckCircle2, 
  UserCheck, Zap, Scissors, Ban, Handshake, ChevronRight
} from 'lucide-react';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: "payment", title: "1. Payment", icon: <CreditCard size={24} />, content: "A 50% advance payment is mandatory to initiate the project. The remaining 50% is payable once 50% of the work is completed. Work may be paused in case of payment delays." },
    { id: "project", title: "2. Project Type", icon: <Zap size={24} />, content: "We work exclusively on long-term projects. One-time or short-term projects are not accepted unless mutually agreed upon in advance." },
    { id: "demo", title: "3. Demo Policy", icon: <Video size={24} />, content: "Free demo edits are not available. A paid demo edit is offered at $12, with 50% advance payment. Demo charges are non-refundable." },
    { id: "files", title: "4. Project Files", icon: <FileText size={24} />, content: "Only the final edited videos will be delivered. Project files are not shared. Screen recordings or previews may be provided for transparency if required." },
    { id: "revisions", title: "5. Revisions", icon: <Scissors size={24} />, content: "Two revisions are included per video. Any additional revisions will be charged at $3 per change." },
    { id: "comm", title: "6. Communication", icon: <MessageCircle size={24} />, content: "All work-related communication will be conducted exclusively via WhatsApp to ensure clarity and timely responses." },
    { id: "limits", title: "7. Monthly Limits", icon: <Clock size={24} />, content: (
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 bg-purple-500/5 p-3 rounded-xl border border-purple-500/10">
            <CheckCircle2 size={16} className="text-purple-500" />
            <span className="text-sm">Up to 25 shorts (max 2 mins)</span>
          </div>
          <div className="flex items-center gap-3 bg-purple-500/5 p-3 rounded-xl border border-purple-500/10">
            <CheckCircle2 size={16} className="text-purple-500" />
            <span className="text-sm">Up to 6 long-form (max 10 mins)</span>
          </div>
        </div>
      ) 
    },
    { id: "responsibility", title: "8. Responsibility", icon: <UserCheck size={24} />, content: "Clients must provide clear instructions and assets on time. Delays from the client side result in extended timelines." },
    { id: "approval", title: "9. Approval", icon: <ShieldCheck size={24} />, content: "Once a video is approved, the agency is not responsible for further changes requested after the final sign-off." },
    { id: "creative", title: "10. Creative Style", icon: <Zap size={24} />, content: "Editing style is based on creative judgment. Personal taste differences are not valid grounds for refunds." },
    { id: "performance", title: "11. Performance", icon: <AlertCircle size={24} />, content: "We do not guarantee views or engagement. Responsibility is limited to high-quality content creation only." },
    { id: "termination", title: "12. Termination", icon: <Ban size={24} />, content: "We reserve the right to terminate service for payment delays or unprofessional behavior. Payments are non-refundable." },
    { id: "agreement", title: "13. Agreement", icon: <Handshake size={24} />, content: "Starting the project or making an advance payment acknowledges agreement to all terms listed above." }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-purple-500 selection:text-white pb-20">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Sticky Header & Navigation */}
        <aside className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter mb-6">
              THE <span className="text-purple-600">RULES.</span>
            </h1>
            <p className="text-gray-500 uppercase tracking-[0.5em] text-[10px] font-black mb-12">
              FTX Media Agency / Legal Guidelines
            </p>

            {/* Quick Link Navigation */}
            <nav className="hidden lg:block space-y-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                >
                  <div className="w-6 h-[1px] bg-gray-800 group-hover:w-10 group-hover:bg-purple-600 transition-all" />
                  {s.title}
                </button>
              ))}
            </nav>
          </motion.div>
        </aside>

        {/* Right Side: Terms Grid */}
        <div className="lg:w-2/3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <motion.div 
                id={section.id}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Number Background Decoration */}
                <span className="absolute -right-4 -top-4 text-9xl font-black italic text-white/[0.02] group-hover:text-purple-600/[0.05] transition-colors">
                  {index + 1}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 group-hover:border-purple-500/50 transition-all text-purple-500">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-black uppercase italic tracking-tight mb-4 group-hover:text-purple-400 transition-colors">
                    {section.title}
                  </h2>
                  <div className="text-gray-400 leading-relaxed text-sm font-medium">
                    {section.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Compliance Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 p-10 rounded-[3rem] bg-gradient-to-br from-purple-600 to-blue-700 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="relative z-10">
              <Handshake className="mx-auto mb-4 text-white" size={40} />
              <h3 className="text-2xl font-black uppercase italic italic mb-2">Ready to Collaborate?</h3>
              <p className="text-white/70 text-xs uppercase tracking-widest font-bold">Advance Payment = Agreement Confirmed</p>
            </div>
          </motion.div>

          <footer className="mt-12 text-center">
            <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-black italic">
              © {new Date().getFullYear()} FTX Media. All Rights Reserved. Designed by Sumit Soni.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, EyeOff, Database, Share2, 
  ShieldCheck, HardDrive, ShieldAlert, 
  Fingerprint, Zap, ChevronLeft, Globe
} from 'lucide-react';

const PrivacyPolicy = () => {
  const policies = [
    {
      id: "collection",
      title: "1. Data Collection",
      icon: <Database size={24} />,
      content: "We collect only necessary information such as name, email, and social media handles to provide our editing services efficiently."
    },
    {
      id: "security",
      title: "2. Footage Security",
      icon: <Lock size={24} />,
      content: "Your raw footage and project assets are stored on secure, encrypted drives. Access is restricted to our core editing team only."
    },
    {
      id: "sharing",
      title: "3. No Third-Party Sharing",
      icon: <Share2 size={24} />,
      content: "We never sell or share your personal data or project files with third-party advertisers or external agencies. Your privacy is paramount."
    },
    {
      id: "usage",
      title: "4. Content Usage",
      icon: <EyeOff size={24} />,
      content: "We only showcase your edited videos in our portfolio with your explicit permission. Private projects remain 100% confidential."
    },
    {
      id: "retention",
      title: "5. Data Retention",
      icon: <HardDrive size={24} />,
      content: "Project files are archived for 30 days after delivery. After this period, files may be permanently deleted to ensure data privacy."
    },
    {
      id: "rights",
      title: "6. Your Rights",
      icon: <ShieldAlert size={24} />,
      content: "You have the right to request the deletion of your data or project history from our local servers at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-purple-500 selection:text-white pb-20 font-sans">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Sticky Header & Navigation */}
        <aside className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.3em] mb-8"
            >
              <ChevronLeft size={14} /> Back to Base
            </button>

            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter mb-6">
              PRIVACY <span className="text-purple-600">VAULT.</span>
            </h1>
            
            <p className="text-gray-500 uppercase tracking-[0.5em] text-[10px] font-black mb-12">
              FTX Media / Secure Data Protocol
            </p>

            {/* Quick Link Navigation */}
            <nav className="hidden lg:block space-y-2">
              {policies.map((p) => (
                <button
                  key={p.id}
                  onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                >
                  <div className="w-6 h-[1px] bg-gray-800 group-hover:w-10 group-hover:bg-purple-600 transition-all" />
                  {p.title}
                </button>
              ))}
            </nav>
          </motion.div>
        </aside>

        {/* Right Side: Policy Grid */}
        <div className="lg:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((policy, index) => (
              <motion.div 
                id={policy.id}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Number Background Decoration */}
                <span className="absolute -right-4 -top-4 text-9xl font-black italic text-white/[0.02] group-hover:text-purple-600/[0.05] transition-colors">
                  0{index + 1}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 group-hover:border-purple-500/50 transition-all text-purple-500">
                    {policy.icon}
                  </div>
                  <h2 className="text-xl font-black uppercase italic tracking-tight mb-4 group-hover:text-purple-400 transition-colors">
                    {policy.title}
                  </h2>
                  <div className="text-gray-400 leading-relaxed text-sm font-medium">
                    {policy.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secure Handshake Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-purple-700 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="relative z-10 flex flex-col items-center">
              <Fingerprint className="mb-4 text-white animate-pulse" size={40} />
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tight">Your Assets are Secure</h3>
              <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Encrypted Storage • Limited Access • NDA Compliant</p>
            </div>
          </motion.div>

          <footer className="mt-12 text-center">
            <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-black italic">
              © {new Date().getFullYear()} FTX Media. Stay Secure. Stay Creative.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
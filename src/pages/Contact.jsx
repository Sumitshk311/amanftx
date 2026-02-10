import React from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, ArrowRight, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden bg-[#020205]">
      
      {/* Background Orbs - Background mein halka rang dene ke liye */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-purple-500 text-[10px] font-black uppercase tracking-[0.5em]"
          >
            <Globe size={12} className="animate-spin-slow" /> Based in India • Working Worldwide
          </motion.div> */}
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none"
          >
            Let's <span className="text-purple-600">Work.</span>
          </motion.h2>
          
          <p className="text-gray-500 max-w-md mx-auto text-sm font-medium leading-relaxed">
            Have a project in mind? I’m currently accepting new commissions for premium video editing.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Instagram Card */}
          <motion.a
            href="https://www.instagram.com/amanftx07"
            target="_blank"
            whileHover={{ y: -10 }}
            className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center text-center transition-all hover:border-pink-500/30 hover:bg-pink-500/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 border border-white/10 group-hover:border-pink-500/50 transition-colors">
              <Instagram className="text-gray-400 group-hover:text-pink-500 transition-colors" size={24} />
            </div>
            <h3 className="text-white font-black italic uppercase tracking-tighter mb-2">Instagram</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">@amanftx07</p>
            <ArrowRight className="text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" size={18} />
          </motion.a>

          {/* Email Card */}
          <motion.a
            href="ftxmedia8@gmail.com"
            whileHover={{ y: -10 }}
            className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center text-center transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 border border-white/10 group-hover:border-blue-500/50 transition-colors">
              <Mail className="text-gray-400 group-hover:text-blue-500 transition-colors" size={24} />
            </div>
            <h3 className="text-white font-black italic uppercase tracking-tighter mb-2">Email Me</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Click to send mail</p>
            <ArrowRight className="text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" size={18} />
          </motion.a>

          {/* WhatsApp / Hire Me Card */}
          <motion.a
            href="/hire-me"
            whileHover={{ y: -10 }}
            className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center text-center transition-all hover:border-purple-500/30 hover:bg-purple-500/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 border border-white/10 group-hover:border-purple-500/50 transition-colors">
              <MessageCircle className="text-gray-400 group-hover:text-purple-500 transition-colors" size={24} />
            </div>
            <h3 className="text-white font-black italic uppercase tracking-tighter mb-2">Hire Me</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Start a Project</p>
            <ArrowRight className="text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" size={18} />
          </motion.a>

        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-[9px] text-gray-700 uppercase tracking-[0.6em] font-black italic">
            Typical response time: Under 12 hours
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
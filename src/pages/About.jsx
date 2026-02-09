import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

const AboutMe = () => {
  const skills = [
    { name: "Pr", color: "text-blue-500", fullName: "Premiere Pro" },
    { name: "Ae", color: "text-purple-500", fullName: "After Effects" },
    { name: "Cc", color: "text-white", fullName: "CapCut Pro" },
  ];

  return (
    <section className="relative min-h-screen bg-[#020205] flex items-center pt-20 pb-20 overflow-hidden font-sans">
      
      {/* Background Glows (Minimal) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* LEFT: Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 p-2 bg-gradient-to-b from-white/10 to-transparent">
                <img
                  src={logo}
                  alt="Aman"
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
            
            {/* Minimal Badge */}
            <div className="absolute -bottom-2 -right-2 bg-white text-black px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-tighter shadow-xl">
              07 Years Exp.
            </div>
          </motion.div>

          {/* RIGHT: Content Section */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="flex items-center justify-center md:justify-start gap-2 text-purple-500 text-[10px] font-black uppercase tracking-[0.4em]">
                <Sparkles size={12} /> Founder of FTX MEDIA
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                Scaling <br />
                <span className="text-purple-600">7-Figure Brands.</span>
              </h2>
            </div>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
              I’m <span className="text-white">Aman</span>, a veteran editor with <span className="text-white">7 years of experience</span> helping brands dominate through high-engagement edits. 
              Currently running <span className="text-purple-500 font-bold italic">FTX MEDIA</span> to scale new brands like yours.
            </p>

            <p className="text-gray-500 text-sm italic max-w-md mx-auto md:mx-0">
              "I only partner with those who value creativity and premium quality over cost. If you're looking for a masterpiece vibe, let's create something awesome."
            </p>

            {/* Simple Skills Row */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 py-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start group">
                  <span className={`text-xl font-black ${skill.color}`}>{skill.name}</span>
                  <span className="text-[8px] uppercase tracking-widest text-gray-600 group-hover:text-gray-400 transition-colors">
                    {skill.fullName}
                  </span>
                </div>
              ))}
            </div>

            {/* Simple Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button 
                onClick={() => window.location.href = '/hire-me'}
                className="group flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all"
              >
                Let's Collab <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="flex gap-4">
                <a href="https://instagram.com/sumitsonishk311" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="mailto:your@email.com" className="text-gray-500 hover:text-white transition-colors"><Mail size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
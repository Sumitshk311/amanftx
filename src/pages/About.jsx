import React from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, ArrowUpRight, Zap, Target } from "lucide-react";
import logo from "../assets/logo.png";

const AboutMe = () => {
  const skills = [
    { name: "Premiere Pro", short: "Pr", color: "text-blue-500", glow: "shadow-blue-500/20" },
    { name: "After Effects", short: "Ae", color: "text-purple-500", glow: "shadow-purple-500/20" },
    { name: "CapCut Pro", short: "Cc", color: "text-white", glow: "shadow-white/10" },
  ];

  return (
    <section className="relative min-h-screen bg-[#020205] pt-[8rem] pb-24 overflow-hidden selection:bg-purple-500/30">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          
          {/* LEFT: IMAGE & FLOATING BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

            {/* Profile Image Container */}
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-[4rem] p-[2px] bg-gradient-to-br from-purple-500/50 via-transparent to-blue-500/50">
              <div className="w-full h-full rounded-[4rem] overflow-hidden border-[6px] border-[#020205]">
                <img
                  src={logo}
                  alt="AmanFTX Profile"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>

            {/* EXP BADGE (Wapis Pehle Jaisa) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-xl text-white px-8 py-4 rounded-[2rem] font-black italic border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 uppercase text-xs tracking-widest"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
              4+ Years Experience
            </motion.div>
          </motion.div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">
                  The Creative Mind
                </h2>
                <h1 className="text-6xl md:text-8xl font-black italic text-white leading-[0.85] tracking-tighter uppercase">
                  About <br />
                  <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Me
                  </span>
                </h1>
              </div>

              <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                I’m a <span className="text-white">Creative Video Editor</span> who 
                doesn't just cut clips—I build worlds. From high-octane 
                <span className="text-purple-400 font-bold"> Anime Edits</span> to 
                engaging <span className="text-blue-400 font-bold">Short-form Content</span>, 
                I focus on storytelling that stops the scroll.
              </p>

              {/* SKILLS CAPSULES */}
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 shadow-xl transition-all`}
                  >
                    <span className={`${skill.color} font-black text-xl italic`}>{skill.short}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{skill.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* SOCIALS */}
              <div className="flex items-center gap-6 pt-4">
                {[
                  { icon: <Instagram />, href: "https://instagram.com/sumitsonishk311", color: "hover:text-pink-500" },
                  { icon: <Mail />, href: "mailto:your@email.com", color: "hover:text-blue-500" },
                  { icon: <MessageCircle />, href: "/hire-me", color: "hover:text-green-500" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM CTA: "The Mission" */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-[4rem] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/5 p-12 md:p-20 text-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase mb-8 tracking-tighter">
              Ready to create <br /> a <span className="text-purple-600">Masterpiece?</span>
            </h2>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/hire-me"
              className="inline-flex items-center gap-4 px-14 py-5 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl hover:bg-purple-500 hover:text-white"
            >
              Hire Me <ArrowUpRight size={20} />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutMe;
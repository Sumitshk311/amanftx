import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

// Skill Logos
import pr from "../assets/premiumpro.png";
import ae from "../assets/afftereffect.png";
import cc from "../assets/capcut.png";
import dv from "../assets/dv.png";

const AboutMe = () => {
  const skills = [
    { name: "Premiere Pro", img: pr },
    { name: "After Effects", img: ae },
    { name: "CapCut Pro", img: cc },
    { name: "DaVinci Resolve", img: dv },
  ];

  return (
    <section className="relative min-h-screen bg-[#020205] flex items-center pt-20 pb-20 overflow-hidden font-sans">

      {/* Premium Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-14 md:gap-28">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/20 p-2 bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
              <img
                src={logo}
                alt="Aman"
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-wide shadow-xl">
             4+  Years Exp.
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 space-y-6 text-center md:text-left">

            <span className="flex items-center justify-center md:justify-start gap-2 text-purple-500 text-[10px] font-black uppercase tracking-[0.35em]">
              <Sparkles size={12} /> Founder of FTX MEDIA
            </span>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              Scaling <br />
              <span className="text-purple-600 italic">7-Figure Brands</span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
              I’m <span className="text-white font-semibold">Aman</span>, a Video Editor with{" "}
              <span className="text-white font-semibold">4+ years of experience</span> helping brands scale through
              high-engaging premium edits. Now running a 7-figure agency{" "}
              <span className="text-purple-500 font-bold italic">FTX MEDIA</span> focused on premium brands that value creativity over cost.
            </p>

            <p className="text-gray-500 text-sm italic max-w-md">
              “If you want premium vibe, cinematic edits and authority branding — let’s build something legendary.”
            </p>

            {/* PREMIUM SKILLS LOGOS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
              {skills.map((skill, i) => (
                <div key={i} className="group flex flex-col items-center gap-2">
                  <img 
                    src={skill.img} 
                    alt={skill.name}
                    className="w-12 h-12 object-contain scale-90 group-hover:scale-110 transition-all duration-300"
                  />
                  <p className="text-[10px] text-gray-500 group-hover:text-white transition">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">

              <button
                onClick={() => (window.location.href = "/hire-me")}
                className="group flex items-center gap-2 px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-purple-600 hover:text-white transition-all shadow-xl"
              >
                Let’s Collab
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="flex gap-5">
                <a href="https://instagram.com/amanftx07" className="text-gray-500 hover:text-pink-500 transition">
                  <Instagram size={22} />
                </a>
                <a href="ftxmedia8@gmail.com" className="text-gray-500 hover:text-purple-500 transition">
                  <Mail size={22} />
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

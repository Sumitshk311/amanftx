import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, ArrowUpRight, Sparkles } from "lucide-react";

import logo from "../assets/logo.png";
import pr from "../assets/premiumpro.png";
import ae from "../assets/afftereffect.png";
import cc from "../assets/capcut.png";
import dv from "../assets/dv.png";

const AboutMe = () => {

  const skills = [
    { img: pr, name: "Premiere Pro" },
    { img: ae, name: "After Effects" },
    { img: cc, name: "CapCut Pro" },
    { img: dv, name: "DaVinci Resolve" },
  ];

  return (
    <section className="relative min-h-screen bg-[#020205] flex items-center pt-20 pb-20 overflow-hidden font-sans">

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 p-2 bg-gradient-to-b from-white/10">
              <img src={logo} className="w-full h-full object-cover rounded-full grayscale-0 hover:grayscale-0 transition-all duration-700" />
            </div>

            <div className="absolute -bottom-2 -right-2 bg-white text-black px-4 py-2 rounded-full font-bold text-[10px] shadow-xl">
              4+ Years Exp.
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 space-y-6 text-center md:text-left">

            <span className="flex items-center justify-center md:justify-start gap-2 text-purple-500 text-[10px] font-black uppercase tracking-[0.35em]">
                          <Sparkles size={12} /> Founder of FTX MEDIA
                        </span>

            <h2 className="text-3xl md:text-7xl font-black text-white italic uppercase">
              Scaling <br />
              <span className="text-purple-600">7-Figure Brands.</span>
            </h2>

            <p className="text-gray-400 max-w-lg">
              I’m <b className="text-white">Aman</b>, a Video Editor with 4+ years of experience.  
              I help brands scale through premium edits.
            </p>

            {/* 🔥 SKILLS LOGOS */}
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

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <button
                onClick={() => window.location.href = "/hire-me"}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold uppercase text-[10px] hover:bg-purple-600 hover:text-white transition"
              >
                Let's Collab <ArrowUpRight size={14} />
              </button>

              <div className="flex gap-4">
                <a href="https://instagram.com/amanftx07" className="text-gray-500 hover:text-pink-500 transition-colors">
                  <Instagram />
                </a>
                <a href="ftxmedia8@gmail.com" className="text-gray-500 hover:text-purple-500 transition-colors">
                  <Mail />
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

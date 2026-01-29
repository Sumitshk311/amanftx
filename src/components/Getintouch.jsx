import React from "react";
import { Mail, Instagram, Twitter, Youtube, Play, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Link use karein agar routing set hai
import signatureImg from "../assets/signature.png"; 

const ContactFooter = () => {
  return (
    <section className="relative py-24 bg-[#020205] overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 1. Header Section */}
      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-xl md:text-3xl font-black tracking-[0.4em] uppercase"
        >
          — GET IN TOUCH —
        </motion.h2>
        <p className="text-purple-400/60 text-xs italic mt-3 tracking-widest">
          Let's Create Something Awesome!
        </p>
      </div>

      {/* 2. Main Contact Bar */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="relative group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

          <div className="flex flex-col md:flex-row items-stretch justify-center bg-white/[0.01] backdrop-blur-sm">
            <a
              href="mailto:your@email.com"
              className="flex-1 flex items-center justify-center gap-4 py-10 hover:bg-white/[0.03] transition-all duration-500 group/item border-b md:border-b-0 md:border-r border-white/5"
            >
              <div className="p-3 bg-purple-500/10 rounded-full group-hover/item:bg-purple-500/20 transition-all">
                <Mail className="text-purple-500" size={26} />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Email Me
              </span>
            </a>

            <a
              href="https://instagram.com/yourprofile"
              className="flex-1 flex items-center justify-center gap-4 py-10 hover:bg-white/[0.03] transition-all duration-500 group/item"
            >
              <div className="p-3 bg-pink-500/10 rounded-full group-hover/item:bg-pink-500/20 transition-all">
                <Instagram className="text-pink-500" size={26} />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Instagram
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Social Media Icons */}
      <div className="mt-20 flex justify-center gap-10 relative z-10">
        {[Twitter, Youtube, Play, Send].map((Icon, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, color: "#A855F7" }}
            className="text-white/30 cursor-pointer transition-all"
          >
            <Icon size={22} />
          </motion.div>
        ))}
      </div>

      {/* 4. SIGNATURE & COPYRIGHT SECTION */}
      <div className="mt-24 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          className="text-white text-[10px] uppercase tracking-[0.6em] mb-4 font-light"
        >
          Designed & Developed By
        </motion.p>

        {/* Signature Box */}
        <a
          href="https://instagram.com/sumitsoni_shk311"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex flex-col justify-center items-center mb-10 cursor-pointer"
        >
          <motion.img
            src={signatureImg}
            alt="Sumit Soni Signature"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-56 md:w-72 h-auto transition-all duration-700"
            style={{
              filter: "brightness(0) invert(1)",
              WebkitFilter: "brightness(0) invert(1)",
            }}
          />
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl -z-10 group-hover:bg-purple-500/40 transition-all"></div>

          <h3 className="text-white italic text-[12px] md:text-[14px] font-medium mt-2 tracking-[0.15em] drop-shadow-lg group-hover:text-purple-400 transition">
            Sumit Soni
          </h3>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-2"></div>
        </a>

        {/* NEW LEGAL SECTION - Yahan add kiya hai */}
        <div className="mt-16 mb-8 flex justify-center items-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-500">
           <a href="/term" className="text-white text-[11px] uppercase tracking-[0.3em] hover:text-purple-400 transition-colors">
             Terms & Conditions
           </a>
           <div className="w-1 h-1 bg-white rounded-full"></div>
           <a href="/privacy" className="text-white text-[11px] uppercase tracking-[0.3em] hover:text-purple-400 transition-colors">
             Privacy Policy
           </a>
        </div>

        {/* Copyright Section */}
        <div className="pb-10">
          <p className="text-white/50 text-[9px] uppercase tracking-[0.4em] font-medium">
            © 2026 AmanFtx. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, ChevronRight, ShieldCheck, Sparkles, Zap, Star } from "lucide-react";

const HireMe = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [agree, setAgree] = useState(false); // ✅ TERMS STATE

  // QUESTIONS
  const questions = [
    { 
      id: "profession", 
      title: "Identity", 
      subtitle: "What do you do?", 
      options: ["Content Creator","YouTuber","Coach / Consultant","Business Owner","Agency","Doctor","Real Estate","Other"] 
    },
    { id: "platform", title: "Dominance", subtitle: "Your primary platform?", options: ["Instagram Reels","YouTube Shorts","YouTube Long Videos","Ads (Meta / Google)","Multiple Platforms"] },
    { id: "videoType", title: "Requirement", subtitle: "What type of video editing do you need?", options: ["Reels / Shorts","YouTube Long-form","Podcast Editing","Ads / Promo Videos","Mixed Content"] },
    { id: "style", title: "Visual DNA", subtitle: "Editing style you prefer?", options: ["Fast-paced / Viral","Cinematic","Clean / Minimal","Heavy Motion Graphics","Not sure"] },
    { id: "quantity", title: "Frequency", subtitle: "How many videos do you need?", options: ["1–2 (One-time)","5–10","15–30","Monthly ongoing"] },
    { id: "payment", title: "Structure", subtitle: "Payment preference?", options: ["One-time payment","Monthly retainer"] },
    { id: "budget", title: "Investment", subtitle: "Estimated budget?", options: ["$35 – $60","$60 – $180","$180 – $360","$360+"] },
    { id: "start", title: "Timeline", subtitle: "When do you want to start?", options: ["Immediately","Within 7 days","This month"] },
    { id: "priority", title: "Focus", subtitle: "What matters more to you?", options: ["Premium quality","Balanced quality + budget","Lowest quality"] },
    { id: "ready", title: "Commitment", subtitle: "Are you ready to proceed if pricing & samples fit?", options: ["Yes","Maybe","Just exploring"] },
  ];

  const handleSelect = (option) => {
    setData((prev) => ({ ...prev, [questions[step].id]: option }));
    setStep(step + 1);
  };

  const sendWhatsApp = () => {
    if (!agree) return;

    const msg = `🔥 *PREMIUM CLIENT APPLICATION* 

👤 Profession: ${data.profession}
📱 Platform: ${data.platform}
🎬 Video Type: ${data.videoType}
🎨 Style: ${data.style}
📦 Quantity: ${data.quantity}
💰 Budget: ${data.budget}
⏳ Start: ${data.start}
✅ Ready: ${data.ready}

Let's discuss onboarding.`;

    window.open(`https://wa.me/7376098107?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#020205] text-white flex items-center justify-center px-6 relative overflow-hidden font-sans">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      {/* Navbar Progress */}
      <div className="fixed top-24 left-8 right-8 flex justify-between items-center max-w-7xl mx-auto z-[200]">
        <button onClick={() => navigate("/")} className="group flex items-center gap-3 text-white/40 hover:text-white transition-all bg-black/30 backdrop-blur-md py-2 px-4 rounded-full border border-white/5">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all">
            <ArrowLeft size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Home</span>
        </button>

        <div className="flex gap-2 bg-black/30 backdrop-blur-md py-4 px-5 rounded-full border border-white/5">
          {questions.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ width: i === step ? 30 : 6, backgroundColor: i <= step ? "#9333ea" : "#ffffff20" }}
              className="h-1 rounded-full transition-all" 
            />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl w-full z-10 pt-40 pb-20">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex flex-col md:flex-row gap-14 items-center">

              {/* LEFT */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start text-purple-500">
                  <Zap size={14} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">Phase {step + 1}</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                  {questions[step].title}
                </h2>
                <p className="text-gray-500 font-medium text-lg uppercase tracking-widest italic">
                  {questions[step].subtitle}
                </p>
              </div>

              {/* OPTIONS */}
              <div className="flex-1 w-full grid gap-3">
                {questions[step].options.map((op, idx) => (
                  <motion.button
                    key={op}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleSelect(op)}
                    className="group relative flex justify-between items-center px-8 py-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-purple-500/60 hover:bg-white/[0.07] transition-all text-left overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 w-1 h-full bg-purple-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    <span className="font-bold text-lg tracking-tight group-hover:translate-x-2 transition-transform">
                      {op}
                    </span>
                    <ChevronRight size={18} className="text-gray-600 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (

            // ✅ FINAL SCREEN (UNCHANGED UI + TERMS)
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="relative bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 text-center shadow-[0_60px_150px_rgba(0,0,0,0.8)]">

              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-50px] left-[-50px] opacity-10">
                <Star size={200} className="text-purple-500" />
              </motion.div>

              <div className="relative z-10">
                <div className="w-24 h-24 bg-purple-600 rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.4)] mb-8">
                  <ShieldCheck size={48} className="text-white" />
                </div>

                <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
                  Profile <span className="text-purple-500">Verified</span>
                </h2>

                <p className="text-gray-400 mt-6 uppercase tracking-[0.4em] text-[10px] font-bold">
                  Your vision meets my expertise.
                </p>

                {/* TERMS CHECKBOX */}
                <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                  />
                  <span>
                    I agree to{" "}
                    <a href="/terms" className="text-purple-500 underline hover:text-white">Terms & Conditions</a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-purple-500 underline hover:text-white">Privacy Policy</a>
                  </span>
                </div>

                {/* BUTTON */}
                <div className="mt-12 flex flex-col items-center gap-6">
                  <button
                    onClick={sendWhatsApp}
                    disabled={!agree}
                    className={`group w-full max-w-md py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs transition-all shadow-xl
                    ${agree ? "bg-white text-black hover:bg-purple-600 hover:text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
                  >
                    <MessageCircle className="inline mr-3" size={20} />
                    Let’s Chat
                  </button>

                  <button onClick={() => { setStep(0); setAgree(false); }}
                    className="text-gray-600 text-[9px] uppercase font-black tracking-widest hover:text-white transition">
                    Re-edit Application
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Branding */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10">
          Aman FTX • Archives
        </p>
      </div>

    </section>
  );
};

export default HireMe;

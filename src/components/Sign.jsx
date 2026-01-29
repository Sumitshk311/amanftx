import { motion } from "framer-motion";

const SignatureSection = () => {
  return (
    <section className="py-24 bg-[#020205] relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      
      {/* Background Glow Effect */}
      <div className="absolute w-[500px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full opacity-60"></div>

      <div className="relative z-10 text-center">
        
        {/* Designer Badge */}
        <motion.div 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 0.5, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5 }}
          className="mb-4"
        >
          <span className="text-white text-[10px] uppercase font-light tracking-[0.5em]">
            Designed & Developed By
          </span>
        </motion.div>

        {/* The Main Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative inline-block group"
        >
          <h2 className="signature-alex text-7xl md:text-9xl text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:text-purple-400 transition-colors duration-1000">
            Sumit Soni
          </h2>
          
          {/* Animated Stroke Underline */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "110%" }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            className="absolute -bottom-2 -left-[5%] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />
        </motion.div>

        {/* Professional Title Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div className="h-[1px] w-8 bg-purple-500/50"></div>
          <p className="text-white/60 text-xs tracking-[0.3em] font-medium uppercase italic">
            Official Web Designer
          </p>
          <div className="h-[1px] w-8 bg-purple-500/50"></div>
        </motion.div>

        {/* Extra Modern Detail (Year/Location) */}
        <div className="mt-16 opacity-20 hover:opacity-100 transition-opacity duration-700">
            <p className="text-[9px] text-white tracking-[0.8em] uppercase">
                Est. MMXXVI • Digital Creator
            </p>
        </div>
      </div>

      {/* Side "Original Work" Badge (As seen in premium portfolios) */}
      <div className="absolute right-10 bottom-10 opacity-[0.03] rotate-12 pointer-events-none hidden md:block">
        <div className="w-40 h-40 border-2 border-dashed border-white rounded-full flex items-center justify-center">
          <p className="text-[8px] text-center font-black uppercase leading-tight">
            Original <br/> Portfolio <br/> Architecture <br/> BY SUMIT
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
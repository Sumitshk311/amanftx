import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Me", href: "/aboutme" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[200]">
      {/* NAVBAR BAR */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-white text-2xl font-black italic tracking-tighter"
          >
            Aman
            <span className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
              FTX
            </span>{" "}
            Edits
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex gap-8 text-[13px] uppercase tracking-widest font-semibold text-white/70">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className="cursor-pointer hover:text-purple-500 transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 transition-all group-hover:w-full"></span>
                </span>
              ))}
            </nav>

            <button
              onClick={() => navigate("/hire-me")}
              className="bg-purple-600 hover:bg-purple-500 px-7 py-2.5 rounded-full
              text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
            >
              Hire Me
            </button>
          </div>

          {/* MOBILE MENU BUTTON (FIXED VISIBILITY) */}
          <button
            className="md:hidden text-white z-[210] mix-blend-difference"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-2xl transition-all duration-500 md:hidden z-[190]
        ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <nav
          className="flex flex-col p-8 pt-32 gap-8 h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              onClick={() => handleNavigation(link.href)}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`text-2xl font-black text-white flex items-center justify-between cursor-pointer
              transition-all duration-500
              ${open ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <span className="italic uppercase hover:text-purple-500">
                {link.name}
              </span>
              <ChevronRight className="text-purple-500" size={28} />
            </div>
          ))}

          <button
            onClick={() => handleNavigation("/hire-me")}
            className="mt-10 w-full bg-gradient-to-r from-purple-600 to-indigo-600
            py-5 rounded-2xl text-white font-black uppercase tracking-widest"
          >
            Hire Me Now
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

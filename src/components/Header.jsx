import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mainLinks = [
  { name: "Works", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
];

const secondaryLinks = [
  { name: "Contact", href: "#contact" },
  { name: "Get free Consultation", href: "https://wa.me/916359440360?text=Hi%20OfficienHub,%20I'd%20like%20to%20discuss%20a%20project.", external: true },
  { name: "Blog", href: "#blog" },
];

const MenuIcon = ({ isOpen }) => {
  return (
    <div className="flex flex-col gap-1.5 items-end justify-center w-6 h-5 cursor-pointer relative z-50">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-[2px] bg-text-primary rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, width: "0px" } : { opacity: 1, width: "18px" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="block h-[2px] bg-text-primary rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8, width: "24px" } : { rotate: 0, y: 0, width: "12px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-[2px] bg-text-primary rounded-full origin-center"
      />
    </div>
  );
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when overlay is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = (e, href, isExternal = false) => {
    if (isExternal) return;
    e.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg/95 backdrop-blur-xl border-b border-white/[0.06] py-4"
            : "bg-transparent py-6"
        } flex items-center`}
      >
        <div className="max-width-container w-full mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 group cursor-pointer relative z-50"
          >
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
              <div className="bg-accent rounded-[2px] transition-transform duration-300 group-hover:scale-90" />
              <div className="bg-accent rounded-[2px] transition-transform duration-300 group-hover:scale-90" />
              <div className="bg-accent rounded-[2px] transition-transform duration-300 group-hover:scale-90" />
              <div className="bg-accent rounded-[2px] transition-transform duration-300 group-hover:scale-90" />
            </div>
            <span className="font-space text-lg font-bold tracking-tight text-text-primary">
              Officien<span className="text-accent">Hub</span>
            </span>
          </a>

          {/* Staggered Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-primary focus:outline-none z-50 cursor-pointer relative p-2"
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </header>

      {/* Centered Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-bg/98 z-40 flex flex-col justify-center items-center backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center max-w-md w-full px-6 text-center">
              
              {/* Main Large Links */}
              <div className="flex flex-col gap-6 mb-12">
                {mainLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-space text-5xl sm:text-6xl font-bold tracking-tight text-text-secondary hover:text-text-primary transition-colors cursor-pointer block"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Secondary Smaller Links */}
              <div className="flex flex-col gap-4 mb-12">
                {secondaryLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[16px] sm:text-lg text-text-secondary hover:text-text-primary transition-colors cursor-pointer block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="font-sans text-[16px] sm:text-lg text-text-secondary hover:text-text-primary transition-colors cursor-pointer block"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>



            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

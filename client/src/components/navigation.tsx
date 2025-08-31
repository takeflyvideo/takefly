import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-40 p-4 transition-all duration-300 ${
          isScrolled ? "glass-effect" : ""
        }`}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-gradient font-serif cursor-pointer"
            onClick={() => scrollToSection("home")}
            whileHover={{ scale: 1.05 }}
            data-testid="logo"
          >
            TakeFly
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-portfolio"
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-videos"
            >
              Vídeos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contato
            </button>
          </div>
          
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 z-30 glass-effect p-4 md:hidden"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors text-left"
              data-testid="mobile-nav-home"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-foreground hover:text-primary transition-colors text-left"
              data-testid="mobile-nav-portfolio"
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-foreground hover:text-primary transition-colors text-left"
              data-testid="mobile-nav-videos"
            >
              Vídeos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors text-left"
              data-testid="mobile-nav-contact"
            >
              Contato
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

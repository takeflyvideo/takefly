import { motion } from "framer-motion";
import { Instagram, Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const socialLinks = [
  {
    href: "https://wa.me/5511920566022",
    icon: SiWhatsapp,
    label: "WhatsApp"
  },
  {
    href: "https://instagram.com/takeflyvideo",
    icon: Instagram,
    label: "Instagram"
  },
  {
    href: "mailto:takeflyvideo@gmail.com",
    icon: Mail,
    label: "Email"
  },
  {
    href: "tel:11920566022",
    icon: Phone,
    label: "Telefone"
  }
];

export default function Footer() {
  return (
    <footer className="bg-muted py-12 px-4" data-testid="footer">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gradient mb-4 font-serif"
          data-testid="footer-logo"
        >
          TakeFly
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-8"
          data-testid="footer-tagline"
        >
          Capturando momentos únicos do alto dos céus
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6 mb-8"
          data-testid="footer-social"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors hover-scale"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              data-testid={`footer-link-${link.label.toLowerCase()}`}
            >
              <link.icon size={24} />
            </a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="border-t border-border pt-8"
        >
          <p className="text-muted-foreground text-sm" data-testid="footer-copyright">
            © 2024 TakeFly. Todos os direitos reservados. | Rio de Janeiro, RJ
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

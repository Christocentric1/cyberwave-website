import { Link } from "react-router-dom";
import { Shield, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-black relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-20" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Cyberwave Security</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Proactive EDR and Network Defence for Modern Enterprises
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/edr" className="hover:text-primary transition-colors">
                  EDR Solutions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Network Security
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Threat Intelligence
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@cyberwavesecurity.co.uk" className="hover:text-primary transition-colors">
                  info@cyberwavesecurity.co.uk
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+44 (0) 7307101571</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cyberwave Security Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

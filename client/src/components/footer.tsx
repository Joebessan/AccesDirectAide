import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">AccesDirectAide</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Votre guichet unique pour trouver les aides disponibles, 
              réaliser vos démarches et prendre rendez-vous avec des professionnels.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover-elevate transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover-elevate transition-colors"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover-elevate transition-colors"
                data-testid="link-twitter"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/aides" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-aides">
                  Trouver des aides
                </Link>
              </li>
              <li>
                <Link href="/demarches" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-demarches">
                  Démarches administratives
                </Link>
              </li>
              <li>
                <Link href="/professionnels" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-professionnels-footer">
                  Annuaire professionnels
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-mentions">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-confidentialite">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-cgu">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/accessibilite" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-accessibilite">
                  Accessibilité
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@accesdirectaide.fr" className="hover:text-foreground transition-colors" data-testid="link-email">
                  contact@accesdirectaide.fr
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+33123456789" className="hover:text-foreground transition-colors" data-testid="link-phone">
                  01 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Alsace (67/68)<br />
                  France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AccesDirectAide. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-destructive" /> en Alsace
          </p>
        </div>
      </div>
    </footer>
  );
}

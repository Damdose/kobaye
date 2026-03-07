import Link from 'next/link';
import FreehandIcon from '@/components/FreehandIcon';
const CONTACT_PHONE = '+33 7 60 55 40 00';
const CONTACT_PHONE_LINK = 'tel:+33760554000';

const SERVICE_LINKS = [
  { href: '/services/audit-gratuit', label: 'Audit Gratuit' },
  { href: '/services/optimisation-fiche-google', label: 'Optimisation Fiche Google' },
  { href: '/services/boost-avis-experience', label: 'Boost Avis Expérience' },
  { href: '/services/google-ads-local', label: 'Google Ads Local' },
];

const NAV_LINKS = [
  { href: '/services', label: 'Nos services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/glossaire', label: 'Glossaire' },
  { href: '/contact', label: 'Contact' },
  { href: '/rendez-vous', label: 'Prendre rendez-vous' },
];

const LEGAL_LINKS = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { href: '/cookies', label: 'Cookies' },
];

export default function Footer() {
  return (
    <footer className="border-t border-warm-800 bg-warm-900 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo-white.svg" alt="Siva" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Agence SEO locale Google Maps. On propulse votre business dans le top de Google Maps.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <FreehandIcon name="network" size={18} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <FreehandIcon name="camera" size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Services</p>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Navigation</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a href={CONTACT_PHONE_LINK} className="text-sm text-white/60 transition-colors hover:text-white">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a href="mailto:contact@siva.local" className="text-sm text-white/60 transition-colors hover:text-white">
                  contact@siva.local
                </a>
              </li>
              <li>
                <Link href="/rendez-vous" className="text-sm text-white/60 transition-colors hover:text-white">
                  Prendre rendez-vous
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Entreprise</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Présence nationale */}
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <p className="text-sm text-white/50">Présents dans toute la France</p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 sm:mt-10 sm:pt-6">
          <p className="text-center text-[11px] text-white/30 sm:text-xs">
            &copy; {new Date().getFullYear()} Siva. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

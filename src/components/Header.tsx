'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, CaretDown } from '@phosphor-icons/react';
import FreehandIcon, { type FreehandIconName } from '@/components/FreehandIcon';

const FRENCH_MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const RESOURCE_ITEMS: { href: string; label: string; description: string; icon: FreehandIconName }[] = [
  { href: '/blog', label: 'Blog', description: 'Guides, études de cas & conseils réputation', icon: 'book' },
  { href: '/faq', label: 'FAQ', description: 'Réponses à vos questions fréquentes', icon: 'chat' },
  { href: '/glossaire', label: 'Glossaire', description: 'Les termes clés de la preuve sociale', icon: 'notebook' },
];

const NAV_LINKS = [
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/ambassadeur', label: 'Devenir testeur' },
  { href: '/asso', label: 'Assos' },
  { href: '/services', label: 'Tarifs' },
];

const NAV_LINKS_AFTER = [
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentMonth = useMemo(() => FRENCH_MONTHS[new Date().getMonth()], []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setResourcesOpen(false);
    setMobileResourcesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-100/70 bg-warm-bg/85 backdrop-blur-xl">
      {!bannerDismissed && (
        <div className="relative bg-warm-900 text-white">
          <Link
            href="/services/boost-avis-experience"
            className="flex items-center justify-center gap-1.5 px-10 py-2 text-center text-[11px] font-medium transition-colors hover:bg-warm-800 sm:gap-3 sm:px-8 sm:text-xs"
          >
            <span className="hidden items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-warm-900 sm:inline-flex">
              Programme pionnier
            </span>
            <span>
              <span className="sm:hidden">Places limitées en <strong>{FRENCH_MONTHS[new Date().getMonth()]}</strong> — Lancez votre opération →</span>
              <span className="hidden sm:inline">Programme pionnier — Plus que <strong>quelques places en {FRENCH_MONTHS[new Date().getMonth()]}</strong> pour lancer votre première opération</span>
            </span>
            <span className="hidden sm:inline">→</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBannerDismissed(true);
            }}
            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
            aria-label="Fermer"
          >
            <X weight="bold" className="h-3 w-3" />
          </button>
        </div>
      )}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Kobaye" className="h-10" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              {link.label}
            </Link>
          ))}

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              Ressources
              <CaretDown
                weight="bold"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {resourcesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-warm-200 bg-white p-2 shadow-elevated">
                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-warm-200 bg-white" />
                {RESOURCE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-start gap-3.5 rounded-xl px-3.5 py-3 transition-colors hover:bg-warm-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warm-100 text-warm-600 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                      <FreehandIcon name={item.icon} size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-warm-900">{item.label}</p>
                      <p className="mt-0.5 text-xs text-warm-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:items-stretch">
          <Link
            href="/connexion"
            className="btn-secondary hidden !border !border-warm-200 !py-[0.85rem] !px-5 !text-sm !font-medium lg:inline-flex"
          >
            Connexion
          </Link>
          <Link href="/rendez-vous" className="hidden btn-primary sm:inline-flex" style={{ fontSize: '0.875rem', padding: '0.2rem 0.2rem 0.2rem 1.25rem', gap: '0.5rem' }}>
            Lancer une opération
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-warm-200 bg-white md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-warm-100 bg-warm-bg px-4 pb-6 pt-3 sm:px-6 sm:pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-warm-700 transition-colors hover:bg-warm-100"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile resources accordion */}
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-warm-700 transition-colors hover:bg-warm-100"
            >
              Ressources
              <CaretDown
                weight="bold"
                className={`h-4 w-4 text-warm-400 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {mobileResourcesOpen && (
              <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-warm-200 pl-3">
                {RESOURCE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-warm-100"
                  >
                    <FreehandIcon name={item.icon} size={16} className="text-warm-500" />
                    <div>
                      <p className="text-sm font-medium text-warm-800">{item.label}</p>
                      <p className="text-[11px] text-warm-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {NAV_LINKS_AFTER.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-warm-700 transition-colors hover:bg-warm-100"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/rendez-vous"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-3 w-fit" style={{ fontSize: '0.875rem' }}
            >
              Lancer une opération
            </Link>
            <Link
              href="/connexion"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary mt-2 w-fit !text-sm"
            >
              Connexion
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

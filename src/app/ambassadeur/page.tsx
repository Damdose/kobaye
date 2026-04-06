'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CaretDown,
  Gift,
  MapPin,
  Star,
  UsersThree,
  CalendarCheck,
  ForkKnife,
  Trophy,
} from '@phosphor-icons/react';
import FreehandIcon, { type FreehandIconName } from '@/components/FreehandIcon';

const CLIENT_LOGOS = [
  { name: 'Brand 05', logo: '/logos/brand-logo-05.svg' },
  { name: 'Brand 09', logo: '/logos/brand-logo-09.svg' },
  { name: 'Brand 06', logo: '/logos/brand-logo-06.svg' },
  { name: 'Invarion', logo: '/logos/invarion.svg' },
  { name: 'Baincroft', logo: '/logos/baincroft.svg' },
  { name: 'Vector', logo: '/logos/vector-1.svg' },
  { name: 'Givonni', logo: '/logos/givonni.svg' },
  { name: 'Morance', logo: '/logos/morance.svg' },
  { name: 'Eisner Sterling', logo: '/logos/eisnersterling.svg' },
  { name: 'Marcopierre', logo: '/logos/marcopierre.svg' },
  { name: 'Hermosa', logo: '/logos/hermosa.svg' },
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Sticker({
  children,
  className = '',
  rotate = 0,
  float = true,
  floatDuration = 3,
  floatStyle = 'float',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  float?: boolean;
  floatDuration?: number;
  floatStyle?: 'float' | 'bob' | 'sway' | 'pulse';
}) {
  const floatAnimations = {
    float: { y: [0, -14, 0], x: [0, 6, 0] },
    bob: { y: [0, -8, 2, -8, 0], x: [0, -3, 0, 3, 0] },
    sway: { y: [0, -4, 0], x: [0, 10, 0, -10, 0], rotate: [rotate - 5, rotate + 5, rotate - 5] },
    pulse: { y: [0, -10, 0], scale: [1, 1.08, 1] },
  };

  const floatTransitions: Record<string, Record<string, unknown>> = {
    float: {
      y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      x: { duration: floatDuration * 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
    },
    bob: {
      y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      x: { duration: floatDuration * 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
    },
    sway: {
      y: { duration: floatDuration * 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      x: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      rotate: { duration: floatDuration * 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
    },
    pulse: {
      y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      scale: { duration: floatDuration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
    },
  };

  return (
    <motion.span
      className={`inline-block cursor-default select-none drop-shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: rotate - 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate,
        ...(float ? floatAnimations[floatStyle] : {}),
      }}
      transition={{
        opacity: { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 },
        scale: { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 },
        rotate: { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 },
        ...(float ? floatTransitions[floatStyle] : {}),
      }}
      whileHover={{ scale: 1.3, rotate: rotate + 10 }}
    >
      {children}
    </motion.span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-warm-200/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 py-4 sm:py-6 text-left"
      >
        <span className="text-sm sm:text-[17px] font-medium text-warm-900">{q}</span>
        <CaretDown
          weight="bold"
          className={`h-5 w-5 shrink-0 text-warm-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 sm:pb-6 text-body-sm leading-relaxed text-warm-500">{a}</p>
      </motion.div>
    </div>
  );
}

const STEPS = [
  {
    num: '1',
    icon: 'unlock' as const satisfies FreehandIconName,
    title: 'Crée ton profil',
    description:
      'Inscris-toi gratuitement en 3 minutes. Renseigne tes centres d\'intérêt pour recevoir les bonnes opportunités.',
  },
  {
    num: '2',
    icon: 'store' as const satisfies FreehandIconName,
    title: 'Postule aux expériences',
    description:
      'Parcours les opérations disponibles : formations en ligne, apps, produits physiques, coaching... Candidate à celles qui t\'intéressent.',
  },
  {
    num: '3',
    icon: 'coins' as const satisfies FreehandIconName,
    title: 'Teste et donne ton avis',
    description:
      'Accède au produit gratuitement, utilise-le, et partage ton retour honnête. Si tu as aimé, laisse un avis public. Sinon, un retour privé constructif.',
  },
];

const BENEFITS = [
  {
    icon: 'store' as const satisfies FreehandIconName,
    title: 'Accès gratuit à des produits premium',
    description:
      'Formations en ligne (50€ à 2000€), apps, SaaS, produits physiques, séances de coaching... Tu ne payes rien.',
  },
  {
    icon: 'sparkle' as const satisfies FreehandIconName,
    title: 'Découvre avant tout le monde',
    description:
      'Teste de nouvelles apps et SaaS avant tout le monde. Sois parmi les premiers à découvrir des produits innovants.',
  },
  {
    icon: 'coins' as const satisfies FreehandIconName,
    title: 'Missions variées',
    description:
      'Marketing digital, développement perso, beauté, tech, food, coaching, services digitaux... La variété augmente chaque semaine.',
  },
  {
    icon: 'shield' as const satisfies FreehandIconName,
    title: 'Zéro contrainte',
    description:
      'Pas de quota, pas d\'engagement. Tu participes quand tu veux, au rythme qui te convient. La seule contrepartie : ton temps et ton honnêteté.',
  },
  {
    icon: 'team' as const satisfies FreehandIconName,
    title: 'Construis ta réputation',
    description:
      'Plus tu testes, plus ton profil monte en grade. Les meilleurs testeurs accèdent aux opérations premium en priorité.',
  },
  {
    icon: 'crown' as const satisfies FreehandIconName,
    title: 'Badges & statut',
    description:
      'Débloque des badges, construis ton historique et ta réputation de testeur reconnu sur la plateforme.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Claire D.',
    role: 'Testeuse active',
    company: 'Paris',
    avatar: '/logos/sorbonne.png',
    text: 'J\'ai testé une formation à 497€ gratuitement. J\'ai juste donné mon avis honnête. Je recommande à 100%.',
    rating: 5,
  },
  {
    name: 'Karim B.',
    role: 'Testeur régulier',
    company: 'Lyon',
    avatar: '/logos/sciences-po.png',
    text: 'J\'adore découvrir des nouveaux produits avant tout le monde. Et en plus c\'est gratuit. Le concept est génial.',
    rating: 5,
  },
  {
    name: 'Émilie R.',
    role: 'Testeuse depuis 3 mois',
    company: 'Bordeaux',
    avatar: '/logos/dauphine.png',
    text: 'Le feedback structuré m\'a même aidée à mieux analyser les produits que j\'utilise au quotidien. C\'est formateur.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'C\'est vraiment gratuit ?',
    a: 'Oui. L\'inscription est gratuite. Les produits et services que tu testes sont offerts par les marques. Tu ne payes rien. Les marques nous paient pour organiser les opérations de test.',
  },
  {
    q: 'Je suis obligé de mettre un avis positif ?',
    a: 'Non. Jamais. Si tu aimes, tu es invité à laisser un avis public. Si tu n\'aimes pas, tu fais un retour privé constructif. Aucune pression, aucune note imposée.',
  },
  {
    q: 'Combien de temps ça prend ?',
    a: 'Chaque opération précise la durée estimée du test. En général entre 30 minutes et quelques jours selon le produit. Tu choisis les missions qui t\'intéressent.',
  },
  {
    q: 'Quels types de produits je peux tester ?',
    a: 'Formations en ligne, apps, SaaS, produits physiques, coaching, services digitaux... La variété augmente chaque semaine avec de nouvelles opérations.',
  },
  {
    q: 'Comment je suis sélectionné ?',
    a: 'Ton profil est matché avec les critères de chaque opération. Plus ton profil est complet et ta réputation élevée, plus tu as accès aux meilleures expériences.',
  },
  {
    q: 'Combien de temps avant les premières missions ?',
    a: 'Inscription en 3 minutes, profil validé sous 48h. Les premières opportunités arrivent généralement dans la semaine. Nouvelles expériences chaque semaine.',
  },
];

export default function AmbassadeurPage() {

  return (
    <main>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24 pt-10 sm:pt-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-dot-grid absolute inset-0" />
          <div className="hero-glow" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-5 py-2.5 text-sm font-semibold shadow-soft">
                  <Gift weight="fill" className="h-4 w-4 text-accent-dark" />
                  Rejoins la communauté · 100% gratuit
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Teste des produits gratuitement. <span className="serif-accent serif-accent-animated">Donne ton avis.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Inscris-toi gratuitement et accède à des formations, apps, produits et services offerts par des marques qui veulent ton retour honnête.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/rendez-vous" className="btn-primary">
                    Rejoindre la communauté gratuitement
                  </Link>
                  <a href="#concept" className="btn-secondary">
                    Comment ça marche
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              <Sticker className="absolute -left-6 top-[8%] z-40 text-5xl xl:text-6xl" rotate={-12} floatDuration={3.2} floatStyle="float">🍔</Sticker>
              <Sticker className="absolute left-[10%] bottom-[2%] z-40 text-5xl xl:text-6xl" rotate={15} floatDuration={3.6} floatStyle="bob">⭐</Sticker>
              <Sticker className="absolute right-[-12px] top-[42%] z-40 text-5xl xl:text-6xl" rotate={-8} floatDuration={3} floatStyle="sway">💰</Sticker>

              <motion.div
                className="absolute right-0 top-0 z-10 w-[310px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-[12px] font-medium text-[#202124]">Google Maps</span>
                  <span className="ml-auto rounded-full bg-[#e8f0fe] px-2 py-0.5 text-[10px] font-semibold text-[#1a73e8]">Invitation</span>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ea4335]">
                      <ForkKnife weight="fill" className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#202124]">Restaurant partenaire</p>
                      <p className="text-[11px] text-[#70757a]">Restaurant · Paris 6e</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#f8f9fa] p-3">
                    <p className="text-[12px] text-[#3c4043]">Menu dégustation offert pour 4 personnes</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-[12px] font-medium text-[#202124]">4.7</span>
                      <div className="flex gap-px">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} weight="fill" className={`h-3 w-3 ${i < 4 ? 'text-[#FBBC04]' : 'text-[#FBBC04]/50'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#70757a]">(234)</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[12px] text-[#70757a]">
                    <CalendarCheck weight="fill" className="h-3.5 w-3.5 text-[#137333]" />
                    <span className="font-medium text-[#137333]">Disponible</span>
                    <span>·</span>
                    <span>Samedi 15 mars</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 z-20 w-[265px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center justify-between border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="text-[11px] font-medium text-[#202124]">Votre activité</span>
                  </div>
                  <span className="rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[10px] font-semibold text-[#137333]">Actif</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fe]">
                      <MapPin weight="fill" className="h-4 w-4 text-[#1a73e8]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#202124]">12 expériences</p>
                      <p className="text-[10px] text-[#70757a]">réalisées ce mois</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef7e0]">
                      <Star weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#202124]">48 avis Google</p>
                      <p className="text-[10px] text-[#70757a]">publiés ce mois</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e6f4ea]">
                      <UsersThree weight="fill" className="h-4 w-4 text-[#137333]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#202124]">Niveau Gold</p>
                      <p className="text-[10px] text-[#70757a]">testeur reconnu</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-4 bottom-12 z-30 flex items-center gap-2 rounded-full border border-[#e8eaed] bg-white px-3.5 py-2 shadow-card"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBBC04]/20">
                  <Trophy weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#70757a]">Statut</p>
                  <p className="text-[13px] font-bold text-[#FBBC04]">VIP</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. Logo défilant ── */}
      <section className="overflow-hidden border-y border-warm-200 bg-white py-4 sm:py-6">
        <div className="logos-marquee flex items-center gap-12 sm:gap-16">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
            <div key={i} className="flex h-6 w-20 shrink-0 items-center justify-center sm:h-7 sm:w-28">
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Comment ça marche ── */}
      <section id="concept" className="relative overflow-hidden bg-warm-900 px-4 sm:px-6 py-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center !text-accent before:!bg-accent/40">Comment ça marche</p>
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              Comment ça <span className="serif-accent text-accent">fonctionne ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-white/50">
              Inscris-toi, teste, donne ton avis. Le programme est concu pour etre simple des le premier jour.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="relative flex h-full flex-col items-start gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:bg-white/[0.06]">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 ring-1 ring-accent/10 text-accent">
                    <FreehandIcon name={step.icon} size={44} />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">Étape {step.num}</p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2.5 text-body-sm sm:text-base leading-relaxed text-white/50">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Avantages ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Pourquoi rejoindre</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que tu y gagnes. <span className="serif-accent">Concretement.</span>
            </h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col items-start gap-4 rounded-xl border border-warm-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-2xl sm:p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                    <FreehandIcon name={benefit.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-warm-900">{benefit.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-warm-500">{benefit.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Social proof – Témoignages ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Retours d&apos;expérience</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ils ont rejoint le <span className="serif-accent">programme.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-warm-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:rounded-3xl sm:p-7">
                  <div>
                    <div className="mb-4 flex h-10 w-28 items-center sm:h-12 sm:w-32">
                      <img
                        src={t.avatar}
                        alt={t.company}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <p className="text-[15px] leading-relaxed text-warm-600">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-warm-100 pt-5">
                    <div>
                      <p className="text-sm font-semibold text-warm-900">{t.name}</p>
                      <p className="text-xs text-warm-500">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h2 className="text-heading-xl text-warm-900">
              Questions <span className="serif-accent">fréquentes</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white px-4 sm:px-6 shadow-soft sm:rounded-3xl md:px-8">
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="rounded-t-[1.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 sm:rounded-t-[2.5rem] text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Prêt à tester des produits <span className="serif-accent text-accent">gratuitement</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Rejoins la communauté et accède à des expériences exclusives. Inscription gratuite en 3 minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Rejoindre la communauté
              </Link>
              <Link
                href="/contact"
                className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

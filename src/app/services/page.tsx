'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  CaretDown,
  Star,
} from '@phosphor-icons/react';
import FreehandIcon from '@/components/FreehandIcon';

const SERVICES = [
  {
    id: 'lancement',
    icon: 'chart-bar' as const,
    tag: 'Lancement',
    title: '50 testeurs',
    headline: 'Lancez une dynamique d\'avis et renforcez votre crédibilité.',
    description:
      'Idéal pour démarrer. 50 testeurs qualifiés testent votre produit ou service et partagent leur retour honnête. 29€ par testeur.',
    price: '1 450€',
    priceSuffix: '· 29€/testeur',
    features: [
      '50 testeurs qualifiés',
      'Avis authentiques et positifs',
      'Feedback structuré de chaque testeur',
      'Dashboard de suivi en temps réel',
      'Avis publiés sur Google, Trustpilot ou marketplace',
      'Mention de transparence sur chaque avis',
    ],
    stats: [
      { value: '50', label: 'Testeurs qualifiés' },
      { value: '29€', label: 'Par testeur' },
      { value: '7-14j', label: 'Premiers avis' },
    ],
    cta: 'Choisir ce programme',
    ctaHref: '/rendez-vous',
    detailHref: '/rendez-vous',
    highlighted: false,
    badge: null,
    accentColor: 'bg-positive/10 text-positive',
    accentBorder: 'border-positive/20',
  },
  {
    id: 'growth',
    icon: 'check-badge' as const,
    tag: 'Recommandé',
    title: '100 testeurs',
    headline: 'Accélération de la social proof et stabilisation de votre note.',
    description:
      'Le pack le plus populaire. 100 testeurs avec matching avancé, rapport consolidé et support prioritaire. 24,5€ par testeur.',
    price: '2 450€',
    priceSuffix: '· 24,5€/testeur',
    features: [
      '100 testeurs qualifiés',
      'Avis authentiques et positifs',
      'Matching avancé des profils testeurs',
      'Rapport consolidé des retours',
      'Support prioritaire',
      'Suivi des avis publiés en temps réel',
    ],
    stats: [
      { value: '100', label: 'Testeurs qualifiés' },
      { value: '24,5€', label: 'Par testeur' },
      { value: '7-14j', label: 'Premiers avis' },
    ],
    cta: 'Choisir ce programme',
    ctaHref: '/rendez-vous',
    detailHref: '/rendez-vous',
    highlighted: true,
    badge: 'Populaire',
    accentColor: 'bg-accent/10 text-accent-dark',
    accentBorder: 'border-accent/20',
  },
  {
    id: 'scale',
    icon: 'megaphone' as const,
    tag: 'Volume',
    title: '200 testeurs',
    headline: 'Effet volume fort : domination et crédibilité maximale.',
    description:
      '200 testeurs avec accompagnement stratégique dédié, relance automatique et account manager personnel. À partir de 22€ par testeur.',
    price: '4 650€',
    priceSuffix: '· 100×24,5€ + 100×22€',
    features: [
      '200 testeurs qualifiés',
      'Avis authentiques et positifs',
      'Accompagnement stratégique dédié',
      'Relance testeurs automatique',
      'Account manager personnel',
      'Reporting avancé et recommandations',
    ],
    stats: [
      { value: '200', label: 'Testeurs qualifiés' },
      { value: '~23€', label: 'Par testeur' },
      { value: 'Dédié', label: 'Account manager' },
    ],
    cta: 'Choisir ce programme',
    ctaHref: '/rendez-vous',
    detailHref: '/rendez-vous',
    highlighted: false,
    badge: 'Meilleur rapport',
    accentColor: 'bg-warm-100 text-warm-700',
    accentBorder: 'border-warm-200',
  },
];

const VALUE_PROPS = [
  {
    icon: 'target' as const,
    title: 'Plus de crédibilité',
    description:
      'Des avis authentiques de vrais utilisateurs. Chaque avis mentionne la transparence du programme. C\'est légal, éthique, et puissant.',
  },
  {
    icon: 'trend-up' as const,
    title: 'Plus de visibilité',
    description:
      'Plus d\'avis = meilleur référencement, meilleur taux de clic, meilleur taux de conversion. Google récompense les entreprises avec des avis récents et réguliers.',
  },
  {
    icon: 'users' as const,
    title: 'Plus de clients',
    description:
      'Chaque avis positif est un vendeur silencieux qui travaille 24h/24. Vous passez devant vos concurrents dans les comparaisons.',
  },
  {
    icon: 'shield' as const,
    title: 'Transparent & légal',
    description:
      'Conforme aux règles Google, Trustpilot et au droit français. Le même mécanisme que les programmes Amazon Vine.',
  },
  {
    icon: 'chat' as const,
    title: 'Feedback produit actionnable',
    description:
      'Les retours privés des testeurs insatisfaits sont structurés et exploitables. Améliorez votre offre grâce à de vrais retours terrain.',
  },
  {
    icon: 'lightning' as const,
    title: 'Résultats rapides',
    description:
      'Les premiers avis sont publiés sous 7 à 14 jours. Sans engagement, satisfait ou re-testé.',
  },
];

const JOURNEY_STEPS = [
  {
    num: '01',
    icon: 'pencil' as const,
    title: 'Créez votre opération',
    description: 'Définissez ce que vous offrez aux testeurs et le profil idéal de vos testeurs.',
    service: 'Configuration',
    href: '#growth',
  },
  {
    num: '02',
    icon: 'users' as const,
    title: 'On active les testeurs',
    description: 'Notre plateforme matche votre offre avec des testeurs qualifiés de notre communauté.',
    service: 'Matching',
    href: '#growth',
  },
  {
    num: '03',
    icon: 'check-badge' as const,
    title: 'Ils testent pour de vrai',
    description: 'Les testeurs utilisent réellement votre produit ou service. Pas de simulation.',
    service: 'Expérience',
    href: '#growth',
  },
  {
    num: '04',
    icon: 'star' as const,
    title: 'Les avis tombent',
    description: 'Les satisfaits laissent un avis public. Les insatisfaits font un retour privé constructif.',
    service: 'Résultats',
    href: '#growth',
  },
];

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

const TESTIMONIALS_SERVICES = [
  {
    name: 'Sophie M.',
    role: 'Fondatrice de formation en ligne',
    company: 'Paris',
    avatar: '👩🏻',
    text: 'En 2 semaines, on est passé de 4 à 27 avis Google. Notre taux de conversion a augmenté de 35%. On regrette de ne pas l\'avoir fait plus tôt.',
    rating: 5,
  },
  {
    name: 'Thomas R.',
    role: 'CEO de SaaS',
    company: 'Lyon',
    avatar: '👨🏽',
    text: 'Le concept est brillant. Nos testeurs ont vraiment utilisé l\'app et les retours privés nous ont permis de corriger 3 bugs critiques avant le lancement.',
    rating: 5,
  },
  {
    name: 'Nadia K.',
    role: 'Coach en développement personnel',
    company: 'Bordeaux',
    avatar: '👩🏾',
    text: 'Zéro avis en ligne pendant 6 mois, personne ne me faisait confiance. Après une opération Scale, 42 avis authentiques et mon agenda est plein.',
    rating: 5,
  },
];

const FAQ_ITEMS_SERVICES = [
  {
    q: 'Combien de temps faut-il pour voir les premiers avis ?',
    a: 'En moyenne, les premiers avis sont publiés sous 7 à 14 jours après le lancement de l\'opération. Le rythme dépend du nombre de testeurs activés et du type de produit/service.',
  },
  {
    q: 'Est-ce que les avis sont de vrais avis ?',
    a: 'Oui. Les testeurs utilisent réellement votre produit. Leur retour est libre et honnête. Nous ne demandons jamais de note minimale. Chaque avis mentionne que le test a été réalisé via notre programme — transparence totale.',
  },
  {
    q: 'Est-ce légal ?',
    a: 'Oui. Notre modèle repose sur la transparence : chaque avis identifie le cadre du test. C\'est le même principe que les programmes Amazon Vine. Conforme aux règles Google, Trustpilot, et au droit français de la consommation.',
  },
  {
    q: 'Et si les testeurs laissent des avis négatifs ?',
    a: 'Les testeurs insatisfaits sont orientés vers un feedback privé constructif sur notre plateforme. Ils ne sont pas empêchés de publier un avis, mais le design du parcours canalise naturellement les retours négatifs en privé.',
  },
  {
    q: 'Y a-t-il un engagement de durée ?',
    a: 'Non. Chaque opération est un achat ponctuel, sans abonnement ni engagement. Vous lancez une opération quand vous en avez besoin. Satisfait ou re-testé.',
  },
  {
    q: 'Comment sont sélectionnés les testeurs ?',
    a: 'Chaque testeur a un profil vérifié sur la plateforme. Vous pouvez définir des critères (localisation, centres d\'intérêt, profil socio-démo) pour cibler les bons profils.',
  },
];

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
        <span className="text-sm sm:text-[17px] font-semibold text-warm-900">{q}</span>
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

export default function ServicesPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pb-6 sm:pb-8 pt-10 sm:pt-16 md:pt-20">
        <Sticker className="absolute left-[4%] top-[12%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl hidden sm:inline-block" rotate={-12} floatDuration={3.2} floatStyle="float">💬</Sticker>
        <Sticker className="absolute right-[5%] top-[8%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl hidden sm:inline-block" rotate={8} floatDuration={2.8} floatStyle="pulse">⭐</Sticker>
        <Sticker className="absolute right-[8%] bottom-[10%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl hidden sm:inline-block" rotate={-8} floatDuration={3} floatStyle="sway">📈</Sticker>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Choisissez votre opération</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Des avis authentiques, un système{' '}
              <span className="serif-accent">transparent.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              3 packs adaptés à vos besoins. Sans engagement, résultats sous 14 jours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Logo défilant ── */}
      <section className="overflow-hidden border-y border-warm-200 bg-white py-4 sm:py-6">
        <div className="logos-marquee flex items-center gap-12 sm:gap-16">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
            <div key={i} className="flex h-7 w-24 shrink-0 items-center justify-center sm:h-9 sm:w-32">
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
      <section className="bg-warm-50 px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <p className="section-label mb-4 justify-center">Comment ça marche</p>
            <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">
              Un parcours en <span className="serif-accent">4 étapes</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-sm text-warm-500">
              Chaque offre s&apos;intègre dans une stratégie cohérente pour maximiser votre visibilité locale.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <a
                  href={step.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-warm-200 bg-white p-6 sm:p-7 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm-100 text-sm font-bold text-warm-500">
                      {step.num}
                    </span>
                    <div className="h-px flex-1 bg-warm-200/60" />
                    <FreehandIcon name={step.icon} size={20} className="text-warm-400" />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-warm-500">
                    {step.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark group-hover:gap-2.5 transition-all">
                    {step.service}
                    <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Pricing – Détail des offres ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <p className="section-label mb-4 justify-center">Pricing</p>
            <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">
              Nos <span className="serif-accent">offres</span> en détail
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-sm text-warm-500">
              Transparence totale sur ce qu&apos;on fait, combien ça coûte, et les résultats que vous pouvez attendre.
            </p>
          </Reveal>

          <div className="space-y-8 sm:space-y-12">
            {SERVICES.map((service) => (
              <Reveal key={service.id} delay={0.05}>
                <div
                  id={service.id}
                  className={`scroll-mt-28 relative overflow-hidden rounded-2xl sm:rounded-[2rem] transition-all ${
                    service.highlighted
                      ? 'border-2 border-accent/30 bg-white shadow-[0_8px_60px_rgba(240,199,94,0.12)]'
                      : 'border border-warm-200 bg-white shadow-soft'
                  }`}
                >
                  {service.highlighted && (
                    <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-b from-accent/[0.04] to-transparent pointer-events-none" />
                  )}

                  <div className="relative grid lg:grid-cols-5">
                    <div className="lg:col-span-3 p-6 sm:p-9">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700">
                          <FreehandIcon name={service.icon} size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                          {service.tag}
                        </span>
                        {service.badge && (
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                              service.highlighted
                                ? 'bg-accent text-warm-900 shadow-lg shadow-accent/25'
                                : 'border border-warm-200 bg-warm-50 text-warm-500'
                            }`}
                          >
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-warm-900">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-lg sm:text-xl font-light text-warm-600">
                        {service.headline}
                      </p>

                      <p className="mt-4 text-[15px] leading-relaxed text-warm-500">
                        {service.description}
                      </p>

                      <div className="mt-6">
                        {service.price === 'Sur devis' ? (
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-warm-900">
                            Sur devis
                          </span>
                        ) : service.price === 'Gratuit' ? (
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-positive">
                            Gratuit
                          </span>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-warm-900">
                              {service.price}
                            </span>
                            {service.priceSuffix && (
                              <span className="text-sm font-medium text-warm-500">
                                {service.priceSuffix}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-6">
                        {service.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="block text-lg font-bold text-warm-900">
                              {stat.value}
                            </span>
                            <span className="text-xs text-warm-400">{stat.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                          href={service.ctaHref}
                          className="btn-primary"
                        >
                          {service.cta}
                        </Link>
                        <Link
                          href={service.detailHref}
                          className="btn-secondary gap-1.5"
                        >
                          En savoir plus
                          <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-warm-200/60 p-6 sm:p-9 flex flex-col justify-center">
                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                        Ce qu&apos;on fait
                      </p>
                      <ul className="space-y-3.5">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-[14px] sm:text-[15px] text-warm-700"
                          >
                            <CheckCircle
                              weight="fill"
                              className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-dark"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4b. Comparatif rapide ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">
              Quelle offre est faite pour <span className="serif-accent">vous</span> ?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-sm text-warm-500">
              Un aperçu rapide pour choisir l&apos;offre adaptée à votre situation.
            </p>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-warm-200 bg-white shadow-soft">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-warm-200/60">
                    <th className="p-5 text-xs font-bold uppercase tracking-[0.15em] text-warm-400">
                      &nbsp;
                    </th>
                    {SERVICES.map((s) => (
                      <th
                        key={s.id}
                        className={`p-5 text-center text-xs font-bold uppercase tracking-[0.1em] ${
                          s.highlighted ? 'text-accent-dark bg-accent/[0.04]' : 'text-warm-500'
                        }`}
                      >
                        {s.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-200/40">
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Prix</td>
                    <td className="p-5 text-center font-semibold text-warm-900">1 450€</td>
                    <td className="p-5 text-center font-semibold text-warm-900 bg-accent/[0.04]">2 450€</td>
                    <td className="p-5 text-center font-semibold text-warm-900">4 650€</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Testeurs</td>
                    <td className="p-5 text-center text-warm-500">50</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">100</td>
                    <td className="p-5 text-center text-warm-500">200</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Prix / testeur</td>
                    <td className="p-5 text-center text-warm-500">29€</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">24,5€</td>
                    <td className="p-5 text-center text-warm-500">~23€</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Matching avancé</td>
                    <td className="p-5 text-center text-warm-500">—</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">Oui</td>
                    <td className="p-5 text-center text-warm-500">Oui</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Account manager dédié</td>
                    <td className="p-5 text-center text-warm-500">—</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">—</td>
                    <td className="p-5 text-center text-warm-500">Oui</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Idéal si…</td>
                    <td className="p-5 text-center text-warm-500">Vous voulez tester le concept</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">Vous voulez accélérer votre preuve sociale</td>
                    <td className="p-5 text-center text-warm-500">Vous voulez un impact maximal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Avantages – Pourquoi Siva ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 max-w-3xl">
            <p className="section-label mb-4">Avantages</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que nos clients obtiennent <span className="serif-accent">concrètement</span>
            </h2>
            <p className="mt-4 text-body-sm sm:text-body-lg text-warm-500">
              Des résultats mesurables pour votre réputation et votre croissance.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((prop, i) => (
              <Reveal key={prop.title} delay={i * 0.06}>
                <div className="card-hover group relative h-full">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700">
                    <FreehandIcon name={prop.icon} size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900">{prop.title}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-500">
                    {prop.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Social proof ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ils nous font confiance</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que nos clients <span className="serif-accent">en disent.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS_SERVICES.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="card-hover flex h-full flex-col justify-between bg-white p-6">
                  <div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <p className="text-[15px] leading-relaxed text-warm-600">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-warm-100 pt-5">
                    <span className="text-2xl">{t.avatar}</span>
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
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h2 className="text-heading-xl text-warm-900">
              Questions <span className="serif-accent">fréquentes</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white px-4 sm:px-6 shadow-soft md:px-8">
              {FAQ_ITEMS_SERVICES.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Vos concurrents ont plus d&apos;avis que vous. <span className="serif-accent text-accent">Pas parce qu&apos;ils sont meilleurs.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Parce qu&apos;ils ont un système. Sans engagement. Résultats sous 14 jours. Satisfait ou re-testé.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Lancer ma première opération
              </Link>
              <Link
                href="/contact"
                className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                Planifier un appel de 15 min
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

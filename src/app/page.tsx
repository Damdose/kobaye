'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  RiStarFill,
  RiStarLine,
  RiSearchLine,

  RiTimeLine,
  RiCheckboxCircleFill,
  RiSparklingFill,
  RiArrowRightLine,
} from 'react-icons/ri';
import FreehandIcon from '@/components/FreehandIcon';
import PlaceSearchInput from '@/components/audit/PlaceSearchInput';
import { PlaceResult } from '@/lib/types';


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


const VALUE_PROPS = [
  {
    icon: 'check-badge' as const,
    stat: 'Avis',
    statLabel: 'authentiques',
    title: 'Plus de crédibilité',
    description:
      'Des avis authentiques de vrais utilisateurs. Chaque avis mentionne la transparence du programme. C\'est légal, éthique, et puissant.',
  },
  {
    icon: 'chart-line' as const,
    stat: 'SEO',
    statLabel: 'boosté',
    title: 'Plus de visibilité',
    description:
      'Plus d\'avis = meilleur référencement local, meilleur taux de clic, meilleur taux de conversion. Google récompense les entreprises avec des avis récents et réguliers.',
  },
  {
    icon: 'sparkle' as const,
    stat: '24/7',
    statLabel: 'actif',
    title: 'Plus de clients',
    description:
      'Chaque avis positif est un vendeur silencieux qui travaille 24h/24. Vous passez devant vos concurrents dans les comparaisons.',
  },
  {
    icon: 'notebook' as const,
    stat: 'Feedback',
    statLabel: 'structuré',
    title: 'Du feedback produit actionnable',
    description:
      'Les retours privés des testeurs insatisfaits sont structurés et exploitables. Vous améliorez votre offre grâce à des vrais retours terrain.',
  },
  {
    icon: 'shield' as const,
    stat: '100%',
    statLabel: 'conforme',
    title: 'Transparent et légal',
    description:
      'Chaque avis identifie le cadre du test. C\'est le même principe que les programmes Amazon Vine. Conforme aux règles Google, Trustpilot et au droit français.',
  },
  {
    icon: 'chart-pie' as const,
    stat: 'Temps',
    statLabel: 'réel',
    title: 'Suivez tout depuis votre dashboard',
    description:
      'Vous suivez en temps réel les feedbacks, les avis publiés et vos scores. Tout est centralisé dans votre espace business.',
  },
];


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROCESS_STEPS = [
  {
    id: '1',
    icon: 'pencil' as const,
    title: 'Créez votre opération',
    description:
      'Définissez ce que vous offrez aux testeurs (accès gratuit, échantillon, séance découverte…) et le profil idéal de vos testeurs.',
  },
  {
    id: '2',
    icon: 'crosshair' as const,
    title: 'On active les testeurs',
    description:
      'Notre plateforme matche votre offre avec des testeurs qualifiés de notre communauté. Ils s\'inscrivent volontairement.',
  },
  {
    id: '3',
    icon: 'chart-line' as const,
    title: 'Les avis tombent',
    description:
      'Les testeurs satisfaits laissent un avis public authentique (Google, Trustpilot, marketplace…). Les insatisfaits vous envoient un feedback privé constructif.',
  },
];

const PRICING_PLANS = [
  {
    icon: 'search' as const,
    tag: 'Lancement',
    title: '50 testeurs',
    price: 1450,
    unitPrice: '29€',
    promise: 'Idéal pour lancer une dynamique d\'avis et renforcer votre crédibilité.',
    features: [
      '50 testeurs qualifiés',
      'Avis authentiques et positifs',
      'Feedback structuré de chaque testeur',
      'Dashboard de suivi en temps réel',
    ],
    cta: 'Choisir ce programme',
    ctaHref: '/rendez-vous',
    highlighted: false,
    badge: null,
  },
  {
    icon: 'sparkle' as const,
    tag: 'Recommandé',
    title: '100 testeurs',
    price: 2450,
    unitPrice: '24,5€',
    promise: 'Accélération de la social proof et stabilisation de votre note.',
    features: [
      '100 testeurs qualifiés',
      'Avis authentiques et positifs',
      'Matching avancé des profils testeurs',
      'Rapport consolidé des retours',
      'Support prioritaire',
    ],
    cta: 'Choisir ce programme',
    ctaHref: '/rendez-vous',
    highlighted: true,
    badge: 'Populaire',
  },
  {
    icon: 'crown' as const,
    tag: 'Volume',
    title: '200 testeurs',
    price: 4650,
    unitPrice: '22€',
    priceDetail: '100 × 24,5€ + 100 × 22€',
    promise: 'Effet volume fort : domination locale et crédibilité maximale.',
    features: [
      '200 testeurs qualifiés',
      'Avis authentiques et positifs',
      'Accompagnement stratégique dédié',
      'Relance testeurs automatique',
      'Account manager personnel',
    ],
    cta: 'Choisir ce programme',
    ctaHref: '/rendez-vous',
    highlighted: false,
    badge: 'Meilleur rapport',
  },
];

const TESTIMONIALS_ROW1 = [
  {
    name: 'Marie L.',
    role: 'Fondatrice e-commerce',
    city: 'Paris',
    emoji: '👩‍💼',
    text: 'En 2 semaines, on est passé de 4 à 27 avis Google. Notre taux de conversion a augmenté de 35%. On regrette de ne pas l\'avoir fait plus tôt.',
    rating: 5,
  },
  {
    name: 'Thomas B.',
    role: 'Infopreneur',
    city: 'Lyon',
    emoji: '👨‍💻',
    text: 'Ma formation avait 3 avis en 6 mois. Avec une seule opération, j\'en ai eu 15 de plus en 10 jours. Et des vrais retours constructifs en bonus. Le concept est génial.',
    rating: 5,
  },
  {
    name: 'Sophie R.',
    role: 'Coach business',
    city: 'Bordeaux',
    emoji: '👩‍🏫',
    text: 'Le feedback structuré des testeurs m\'a permis d\'améliorer mon offre. Et les avis publics ont fait décoller mes conversions. Double bénéfice.',
    rating: 5,
  },
  {
    name: 'Julien D.',
    role: 'Fondateur SaaS',
    city: 'Marseille',
    emoji: '🧑‍💼',
    text: 'On avait zéro avis sur le store. Le programme nous a permis d\'en accumuler 20+ en quelques semaines. Les testeurs étaient sérieux et les retours honnêtes.',
    rating: 5,
  },
];

const TESTIMONIALS_ROW2 = [
  {
    name: 'David K.',
    role: 'Gérant agence digitale',
    city: 'Toulouse',
    emoji: '👨‍🔧',
    text: 'Marché saturé, difficile de se démarquer. Les avis générés par le programme nous ont donné un avantage clair face à la concurrence. Nos prospects nous citent les avis avant même le premier call.',
    rating: 5,
  },
  {
    name: 'Camille M.',
    role: 'Créatrice de formation',
    city: 'Nantes',
    emoji: '👩‍🎨',
    text: 'Je n\'arrivais pas à obtenir d\'avis malgré des centaines d\'élèves satisfaits. Avec cette plateforme, j\'ai enfin de la preuve sociale visible. Les ventes ont suivi.',
    rating: 5,
  },
  {
    name: 'Lucas P.',
    role: 'Fondateur e-commerce',
    city: 'Strasbourg',
    emoji: '👨‍💼',
    text: 'Les testeurs ont vraiment utilisé nos produits. Les avis sont détaillés, authentiques, et nos fiches produits sont maintenant crédibles. Le meilleur investissement qu\'on ait fait.',
    rating: 5,
  },
  {
    name: 'Antoine L.',
    role: 'Consultant',
    city: 'Paris',
    emoji: '🧔‍♂️',
    text: 'En tant qu\'indépendant, avoir des avis crédibles change tout. La plateforme m\'a permis de passer de 0 à 12 avis Google en 3 semaines. Mes demandes de devis ont triplé.',
    rating: 5,
  },
];


const FAQ_ITEMS = [
  {
    q: 'Est-ce que les avis sont de vrais avis ?',
    a: 'Oui. Les testeurs utilisent réellement votre produit. Leur retour est libre et honnête. Nous ne demandons jamais de note minimale. Chaque avis mentionne que le test a été réalisé via notre programme — transparence totale.',
  },
  {
    q: 'Est-ce légal ?',
    a: 'Oui. Notre modèle repose sur la transparence : chaque avis identifie le cadre du test. C\'est le même principe que les programmes Amazon Vine. Conforme aux règles Google et au droit français de la consommation.',
  },
  {
    q: 'Et si les testeurs laissent des avis négatifs ?',
    a: 'Les testeurs insatisfaits sont orientés vers un feedback privé constructif sur notre plateforme. Ils ne sont pas empêchés de publier un avis, mais le design du parcours canalise naturellement les retours négatifs en privé.',
  },
  {
    q: 'Comment sont sélectionnés les testeurs ?',
    a: 'Chaque testeur a un profil vérifié sur la plateforme. Vous pouvez définir des critères (localisation, centres d\'intérêt, profil socio-démo) pour cibler les bons profils.',
  },
  {
    q: 'Combien de temps faut-il pour voir les premiers avis ?',
    a: 'En moyenne, les premiers avis sont publiés sous 7 à 14 jours après le lancement de l\'opération.',
  },
  {
    q: 'Quel est le prix d\'une opération ?',
    a: 'Le pack Découverte (10 testeurs) est à 290€. Le pack Growth (25 testeurs) est à 590€. Le pack Scale (50 testeurs) est à 990€. Des opérations sur-mesure sont également disponibles pour les gros volumes.',
  },
  {
    q: 'Y a-t-il un engagement de durée ?',
    a: 'Aucun engagement. Chaque opération est indépendante. Vous pouvez lancer une seule opération pour tester, puis décider de continuer si les résultats vous conviennent.',
  },
  {
    q: 'C\'est adapté pour mon activité ?',
    a: 'Absolument. Notre plateforme fonctionne pour les formations en ligne, SaaS, e-commerce, coachs, freelances, agences, et tout business qui a besoin de preuve sociale. Si vous avez un produit ou service à tester, on peut vous aider.',
  },
];


type RevealVariant = 'fade-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'blur-in' | 'rotate-in';

const REVEAL_VARIANTS: Record<RevealVariant, { hidden: Record<string, number | string>; visible: Record<string, number | string> }> = {
  'fade-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.82, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  'rotate-in': {
    hidden: { opacity: 0, y: 60, rotate: -2 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
};

function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up' as RevealVariant,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const v = REVEAL_VARIANTS[variant];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avant le montage client, on rend le contenu visible directement (pas d'opacity:0)
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={v.hidden}
      whileInView={v.visible}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
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
      className={`sticker-float ${className}`}
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-3 py-4 text-left sm:gap-4 sm:py-6"
      >
        <span className="text-sm font-medium text-warm-800 transition-colors group-hover:text-warm-900 sm:text-lg">
          {question}
        </span>
        <FreehandIcon
          name="arrow-right"
          size={16}
          className={`shrink-0 text-warm-400 transition-transform duration-300 ${open ? '-rotate-90' : 'rotate-90'}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-sm leading-relaxed text-warm-600 sm:pb-6 sm:text-base">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  function handlePlaceSelect(place: PlaceResult) {
    const params = new URLSearchParams({
      place_id: place.placeId,
      name: place.name,
      address: place.address,
      lat: String(place.lat),
      lng: String(place.lng),
      type: place.primaryType,
      type_name: place.primaryTypeDisplayName,
    });
    router.push(`/audit/configure?${params.toString()}`);
  }

  return (
      <main>
        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 md:pb-24 md:pt-20">
          <motion.div style={{ y: heroY }} className="pointer-events-none absolute inset-0 -z-10">
            <div className="hero-grain-gradient" />
            <div className="hero-dot-grid absolute inset-0" />
            <div className="hero-glow" />
          </motion.div>

          <Sticker className="absolute left-[6%] top-[12%] text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" rotate={-12} floatDuration={3.2} floatStyle="float">🗺️</Sticker>
          <Sticker className="absolute right-[8%] top-[8%] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" rotate={8} floatDuration={2.8} floatStyle="pulse">⭐</Sticker>
          <Sticker className="absolute bottom-[18%] left-[4%] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" rotate={15} floatDuration={3.6} floatStyle="bob">🔥</Sticker>
          <Sticker className="absolute bottom-[22%] right-[5%] text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" rotate={-8} floatDuration={3} floatStyle="sway">📈</Sticker>

          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 text-xs font-semibold shadow-soft sm:mb-6 sm:px-5 sm:py-2.5 sm:text-sm">
                  <FreehandIcon name="sparkle" size={14} className="text-accent-dark" />
                  La plateforme qui transforme vos clients en ambassadeurs
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl font-light text-warm-900 sm:text-display md:text-display-lg lg:text-display-xl">
                  Obtenez des avis positifs authentiques grâce à de vraies{' '}
                  <span className="serif-accent serif-accent-animated">expériences clients.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mx-auto mt-4 max-w-2xl text-body-sm text-warm-600 sm:mt-6 sm:text-body-lg">
                  Nous envoyons de vrais utilisateurs tester votre produit. Les satisfaits laissent un avis public. Les autres vous font un retour privé pour améliorer votre offre.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:items-stretch sm:gap-4">
                  <a href="/rendez-vous" className="btn-primary btn-hero">
                    Lancer ma première opération
                  </a>
                  <a
                    href="#methode"
                    className="btn-secondary btn-hero"
                  >
                    Voir comment ça marche
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 shadow-soft sm:mt-8 sm:gap-3 sm:px-5 sm:py-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.3 132.3" className="h-5 w-auto shrink-0 sm:h-6">
                    <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"/>
                    <path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3L10.8 16.5z"/>
                    <path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"/>
                    <path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"/>
                    <path fill="#34a853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"/>
                  </svg>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <RiStarFill key={i} className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-warm-600 sm:text-sm">
                    <strong className="text-warm-900">Programme pionnier</strong> · Places limitées
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ LOGOS MARQUEE ═══════════════════════ */}
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


        {/* ═══════════════════════ RESULTATS / SHOWCASE ═══════════════════════ */}
        <section id="resultats" className="px-4 pb-10 pt-14 sm:px-6 sm:pb-14 md:pt-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-10 text-center sm:mb-16" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">Résultats concrets</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Des avis authentiques qui font la différence
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-4 sm:text-body-lg">
                Pas des promesses — des résultats. Voici ce que nos clients obtiennent avec une seule opération.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">

              {/* ── Card 1 : Google Business Profile — pixel-perfect mockup ── */}
              <Reveal delay={0} variant="rotate-in">
                <div className="group relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]" style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
                  {/* macOS window chrome */}
                  <div className="flex items-center gap-2 bg-[#dee1e6] px-3 py-2">
                    <div className="flex gap-[6px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#ed6a5e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                      <span className="h-[10px] w-[10px] rounded-full bg-[#f5bf4f] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                      <span className="h-[10px] w-[10px] rounded-full bg-[#61c554] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                    </div>
                    <div className="flex flex-1 items-center gap-1 rounded-md bg-white px-2.5 py-[3px] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.06)]">
                      <svg className="h-[10px] w-[10px] text-[#5f6368]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="6"/><path d="M5.5 8.5l2 2 3-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[10px] text-[#5f6368] truncate">google.com/maps/place/CopyMaster+Academy</span>
                    </div>
                  </div>

                  {/* Google profile card */}
                  <div className="bg-white">
                    {/* Cover area with Google Maps pin icon */}
                    <div className="relative bg-gradient-to-r from-[#4285F4]/5 via-[#4285F4]/[0.02] to-transparent px-4 pt-4 pb-3">
                      <div className="flex items-start gap-3">
                        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop&crop=center" alt="CopyMaster" className="h-12 w-12 shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-gray-200" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[14px] font-medium text-[#202124]">CopyMaster Academy</h4>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="text-[13px] font-medium text-[#202124]">4.8</span>
                            <div className="flex gap-[1px]">{Array.from({ length: 5 }).map((_, k) => <RiStarFill key={k} className="h-[14px] w-[14px] text-[#FBBC04]" />)}</div>
                            <span className="text-[12px] text-[#70757a]">(47)</span>
                          </div>
                          <p className="mt-0.5 text-[12px] text-[#70757a]">Formation en ligne</p>
                        </div>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="mx-4 h-px bg-[#e8eaed]" />

                    {/* Reviews */}
                    <div className="px-4 py-3">
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#202124]">Avis</span>
                        <span className="text-[11px] font-medium text-[#1a73e8]">Tout voir</span>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', time: 'Il y a 2 jours', text: 'Formation excellente, hyper complète. J\'ai appris plus en 2 semaines qu\'en 6 mois tout seul. Le formateur est top.', stars: 5 },
                          { name: 'Lucas P.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', time: 'Il y a 5 jours', text: 'Contenu de qualité, formateur pédagogue. Je recommande sans hésiter pour se former au copywriting.', stars: 5 },
                          { name: 'Julie D.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', time: 'Il y a 1 sem.', text: 'Très bon rapport qualité/prix. Les exercices pratiques sont top et le support est réactif.', stars: 4 },
                        ].map((review) => (
                          <div key={review.name}>
                            <div className="flex items-center gap-2">
                              <img src={review.avatar} alt={review.name} className="h-7 w-7 rounded-full object-cover" />
                              <div className="flex-1">
                                <span className="text-[11px] font-medium text-[#202124]">{review.name}</span>
                                <span className="ml-1.5 text-[10px] text-[#70757a]">{review.time}</span>
                              </div>
                            </div>
                            <div className="mt-1 flex gap-[1px]">{Array.from({ length: 5 }).map((_, k) => <RiStarFill key={k} className={`h-[11px] w-[11px] ${k < review.stars ? 'text-[#FBBC04]' : 'text-[#dadce0]'}`} />)}</div>
                            <p className="mt-0.5 text-[11px] leading-[1.5] text-[#4d5156] line-clamp-2">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Result badge */}
                  <div className="border-t border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#5f6368]"><RiTimeLine className="h-3 w-3" />Résultat en 2 semaines</div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] px-2.5 py-0.5 text-[11px] font-medium text-[#1e8e3e]"><RiCheckboxCircleFill className="h-3 w-3" />+23 avis</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* ── Card 2 : Trustpilot — pixel-perfect mockup ── */}
              <Reveal delay={0.12} variant="rotate-in" className="hidden md:block">
                <div className="group relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                  {/* macOS window chrome */}
                  <div className="flex items-center gap-2 bg-[#dee1e6] px-3 py-2">
                    <div className="flex gap-[6px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#ed6a5e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                      <span className="h-[10px] w-[10px] rounded-full bg-[#f5bf4f] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                      <span className="h-[10px] w-[10px] rounded-full bg-[#61c554] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                    </div>
                    <div className="flex flex-1 items-center gap-1 rounded-md bg-white px-2.5 py-[3px] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.06)]">
                      <svg className="h-[10px] w-[10px] text-[#5f6368]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="6"/><path d="M5.5 8.5l2 2 3-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[10px] text-[#5f6368] truncate">trustpilot.com/review/freelanceflow.io</span>
                    </div>
                  </div>

                  {/* Trustpilot dark header */}
                  <div className="bg-[#191d21] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 126 31" className="h-[18px] w-auto" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.141 11.826H18.63L15.07.538l-3.563 11.288H0l9.317 6.772-3.562 11.288L15.07 23.11l9.316 6.776-3.562-11.288 9.317-6.772z" fill="#00B67A"/>
                        <path d="M21.583 21.286l-1.637-5.04-4.876 3.55 6.513 1.49z" fill="#005128"/>
                        <text x="36" y="23" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="20" fill="white" letterSpacing="-0.3">Trustpilot</text>
                      </svg>
                    </div>
                  </div>

                  <div className="bg-white">
                    {/* Company score — Trustpilot style */}
                    <div className="px-4 py-3 border-b border-[#e6e6e6]">
                      <div className="flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center" alt="FreelanceFlow" className="h-10 w-10 rounded-lg object-cover ring-1 ring-gray-200" />
                        <div className="flex-1">
                          <h4 className="text-[14px] font-bold text-[#1a1a1a]">FreelanceFlow</h4>
                          <p className="text-[11px] text-[#6b6b6b]">freelanceflow.io</p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex gap-[2px]">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <div key={k} className={`flex h-[22px] w-[22px] items-center justify-center ${k < 4 ? 'bg-[#00B67A]' : 'bg-[#73CF11]'}`}>
                              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="white"><path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z"/></svg>
                            </div>
                          ))}
                        </div>
                        <span className="text-[12px] text-[#6b6b6b]">TrustScore <strong className="text-[#1a1a1a]">4.7</strong></span>
                        <span className="text-[11px] text-[#6b6b6b]">|</span>
                        <span className="text-[12px] font-medium text-[#00B67A]">34 avis</span>
                      </div>
                    </div>

                    {/* Reviews — Trustpilot style */}
                    <div className="divide-y divide-[#e6e6e6]">
                      {[
                        { name: 'Marc T.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', country: 'FR', date: 'Il y a 3 jours', title: 'Outil incontournable', text: 'Facturation, suivi client, relances automatiques... tout est fluide et bien pensé. Un gain de temps énorme.', stars: 5 },
                        { name: 'Emma R.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face', country: 'FR', date: 'Il y a 1 sem.', title: 'Interface intuitive', text: 'Support réactif. J\'ai gagné 2h par semaine sur ma gestion. L\'app mobile est vraiment bien faite aussi.', stars: 5 },
                        { name: 'Karim B.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', country: 'FR', date: 'Il y a 1 sem.', title: 'Bon produit', text: 'Quelques features manquantes mais l\'essentiel est là. Rapport qualité/prix excellent.', stars: 4 },
                      ].map((review) => (
                        <div key={review.name} className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <img src={review.avatar} alt={review.name} className="h-7 w-7 rounded-full object-cover" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-semibold text-[#1a1a1a]">{review.name}</span>
                                <span className="text-[10px] text-[#6b6b6b]">{review.country}</span>
                              </div>
                            </div>
                            <span className="ml-auto text-[10px] text-[#6b6b6b]">{review.date}</span>
                          </div>
                          <div className="mt-1.5 flex gap-[2px]">{Array.from({ length: 5 }).map((_, k) => (
                            <div key={k} className={`flex h-[16px] w-[16px] items-center justify-center ${k < review.stars ? 'bg-[#00B67A]' : 'bg-[#dcdce6]'}`}>
                              <svg viewBox="0 0 24 24" className="h-[9px] w-[9px]" fill="white"><path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z"/></svg>
                            </div>
                          ))}</div>
                          <p className="mt-1 text-[12px] font-semibold text-[#1a1a1a]">{review.title}</p>
                          <p className="mt-0.5 text-[11px] leading-[1.5] text-[#4a4a4a] line-clamp-2">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result badge */}
                  <div className="border-t border-[#e6e6e6] bg-[#f7f7f7] px-4 py-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6b6b6b]"><RiTimeLine className="h-3 w-3" />Résultat en 3 semaines</div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] px-2.5 py-0.5 text-[11px] font-medium text-[#1e8e3e]"><RiCheckboxCircleFill className="h-3 w-3" />+18 avis</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* ── Card 3 : Capterra — pixel-perfect mockup ── */}
              <Reveal delay={0.24} variant="rotate-in" className="hidden md:block">
                <div className="group relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                  {/* macOS window chrome */}
                  <div className="flex items-center gap-2 bg-[#dee1e6] px-3 py-2">
                    <div className="flex gap-[6px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#ed6a5e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                      <span className="h-[10px] w-[10px] rounded-full bg-[#f5bf4f] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                      <span className="h-[10px] w-[10px] rounded-full bg-[#61c554] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
                    </div>
                    <div className="flex flex-1 items-center gap-1 rounded-md bg-white px-2.5 py-[3px] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.06)]">
                      <svg className="h-[10px] w-[10px] text-[#5f6368]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="6"/><path d="M5.5 8.5l2 2 3-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[10px] text-[#5f6368] truncate">capterra.fr/software/scale-academy</span>
                    </div>
                  </div>

                  <div className="bg-white">
                    {/* Capterra header with blue bar */}
                    <div className="bg-[#044d80] px-4 py-2">
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0L2.4 5.4v13.2L12 24l9.6-5.4V5.4L12 0z" fill="#FF9D28"/>
                          <path d="M12 0v24l9.6-5.4V5.4L12 0z" fill="#68C5ED"/>
                          <path d="M12 0L2.4 5.4 12 12l9.6-6.6L12 0z" fill="white" fillOpacity="0.3"/>
                          <path d="M12 12l-9.6 6.6L12 24V12z" fill="#E54747"/>
                        </svg>
                        <span className="text-[13px] font-bold text-white tracking-tight">capterra</span>
                      </div>
                    </div>

                    {/* Product header */}
                    <div className="px-4 py-3 border-b border-[#e8e8e8]">
                      <div className="flex items-start gap-3">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=60&h=60&fit=crop&crop=center" alt="Scale Academy" className="h-11 w-11 rounded-lg object-cover shadow-sm ring-1 ring-gray-200" />
                        <div className="flex-1">
                          <h4 className="text-[14px] font-bold text-[#1a1a1a]">Scale Academy</h4>
                          <p className="text-[11px] text-[#6b6b6b]">Coaching business &middot; Formation</p>
                        </div>
                      </div>

                      {/* Overall rating + breakdown */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="text-center">
                          <span className="text-[28px] font-bold leading-none text-[#044D80]">4.9</span>
                          <div className="mt-0.5 flex gap-[2px] justify-center">{Array.from({ length: 5 }).map((_, k) => <RiStarFill key={k} className="h-[12px] w-[12px] text-[#FF9D28]" />)}</div>
                          <p className="mt-0.5 text-[9px] text-[#6b6b6b]">27 avis</p>
                        </div>
                        <div className="h-12 w-px bg-[#e8e8e8]" />
                        <div className="flex-1 space-y-[3px]">
                          {[
                            { label: '5', pct: 85, count: 23 },
                            { label: '4', pct: 11, count: 3 },
                            { label: '3', pct: 4, count: 1 },
                            { label: '2', pct: 0, count: 0 },
                            { label: '1', pct: 0, count: 0 },
                          ].map((bar) => (
                            <div key={bar.label} className="flex items-center gap-1">
                              <span className="w-2 text-right text-[9px] font-medium text-[#6b6b6b]">{bar.label}</span>
                              <RiStarFill className="h-[8px] w-[8px] text-[#FF9D28]" />
                              <div className="h-[6px] flex-1 rounded-full bg-[#f0f0f0]">
                                <div className="h-full rounded-full bg-[#FF9D28] transition-all" style={{ width: `${bar.pct}%` }} />
                              </div>
                              <span className="w-3 text-right text-[8px] text-[#6b6b6b]">{bar.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reviews — Capterra style */}
                    <div className="divide-y divide-[#e8e8e8]">
                      {[
                        { name: 'Pierre L.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face', role: 'CEO · Startup', text: 'Accompagnement exceptionnel. Conseils actionnables et résultats concrets dès le premier mois.', stars: 5, pros: 'Qualité du contenu', cons: 'RAS' },
                        { name: 'Nina F.', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&crop=face', role: 'Freelance', text: 'J\'ai doublé mon CA en 3 mois grâce à leur méthode. Ultra structuré et actionnable.', stars: 5, pros: 'Méthodologie', cons: 'Rythme intense' },
                        { name: 'Rémi C.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face', role: 'Consultant', text: 'Programme dense et bien structuré. Idéal pour cadrer son activité de consulting.', stars: 4, pros: 'Rapport qualité/prix', cons: 'Peu d\'exercices' },
                      ].map((review) => (
                        <div key={review.name} className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <img src={review.avatar} alt={review.name} className="h-7 w-7 rounded-full object-cover" />
                            <div className="flex-1">
                              <span className="text-[11px] font-semibold text-[#1a1a1a]">{review.name}</span>
                              <span className="ml-1 text-[10px] text-[#6b6b6b]">{review.role}</span>
                            </div>
                            <div className="flex gap-[1px]">{Array.from({ length: 5 }).map((_, k) => <RiStarFill key={k} className={`h-[12px] w-[12px] ${k < review.stars ? 'text-[#FF9D28]' : 'text-[#e0e0e0]'}`} />)}</div>
                          </div>
                          <p className="mt-1 text-[11px] leading-[1.5] text-[#4a4a4a] line-clamp-2">{review.text}</p>
                          <div className="mt-1 flex gap-3">
                            <span className="flex items-center gap-0.5 text-[9px] text-[#2e7d32]"><span className="font-bold">+</span> {review.pros}</span>
                            <span className="flex items-center gap-0.5 text-[9px] text-[#c62828]"><span className="font-bold">-</span> {review.cons}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result badge */}
                  <div className="border-t border-[#e8e8e8] bg-[#f7f7f7] px-4 py-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6b6b6b]"><RiTimeLine className="h-3 w-3" />Résultat en 10 jours</div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] px-2.5 py-0.5 text-[11px] font-medium text-[#1e8e3e]"><RiCheckboxCircleFill className="h-3 w-3" />+27 avis</span>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ═══════════════════════ PRICING ═══════════════════════ */}
        <section id="services" className="px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8 text-center sm:mb-10" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">Nos offres</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Choisissez votre programme
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-5 sm:text-body-lg">
                Des programmes clairs pour générer des avis authentiques et positifs. Sans engagement, sans surprise.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:items-center">
              {PRICING_PLANS.map((plan, i) => (
                <Reveal key={plan.title} delay={i * 0.14} variant="scale-up">
                  <div className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 sm:rounded-[2rem] ${plan.highlighted ? 'border-2 border-accent/30 bg-white shadow-[0_8px_60px_rgba(240,199,94,0.12)] lg:scale-105 lg:z-10' : 'border border-warm-200 bg-white shadow-soft hover:shadow-card'}`}>
                    {plan.highlighted && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.04] to-transparent sm:rounded-[2rem]" />
                    )}

                    {plan.badge && (
                      <div className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] sm:right-6 sm:top-6 sm:px-4 sm:py-1.5 sm:text-[10px] ${plan.highlighted ? 'bg-accent text-warm-900 shadow-lg shadow-accent/25' : 'border border-warm-200 bg-warm-50 text-warm-500'}`}>
                        {plan.badge}
                      </div>
                    )}

                    <div className="relative p-5 pb-4 sm:p-9 sm:pb-7">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-warm-100 sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl">
                        <FreehandIcon name={plan.icon} size={22} className="text-warm-900" />
                      </div>
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:mb-2.5 sm:text-[10px]">
                        {plan.tag}
                      </span>
                      <h3 className="text-xl font-medium tracking-tight text-warm-900 sm:text-2xl">{plan.title}</h3>

                      <div className="mt-4 sm:mt-6">
                        <span className="mb-1 block text-[11px] font-medium text-warm-400 sm:text-xs">
                          {plan.unitPrice} / testeur
                        </span>
                        <div className="flex items-baseline gap-1.5 sm:gap-2">
                          <span className="serif-accent text-[2.5rem] leading-none tracking-tight text-warm-900 sm:text-[3.25rem]">
                            {plan.price.toLocaleString('fr-FR')}€
                          </span>
                          <span className="text-xs font-medium text-warm-500 sm:text-sm">HT</span>
                        </div>
                        {'priceDetail' in plan && plan.priceDetail && (
                          <p className="mt-1.5 text-[11px] text-warm-400 sm:text-xs">{plan.priceDetail}</p>
                        )}
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-warm-600 sm:mt-4 sm:text-[15px]">
                        {plan.promise}
                      </p>
                    </div>

                    <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-9 sm:pb-9">
                      <div className="mb-5 h-px bg-warm-200/60 sm:mb-7" />
                      <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:mb-5 sm:text-[10px]">
                        Ce qui est inclus
                      </p>
                      <ul className="flex-1 space-y-3 sm:space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-xs text-warm-500 sm:gap-3 sm:text-[13px]">
                            <RiCheckboxCircleFill className="mt-0.5 h-4 w-4 shrink-0 text-black sm:h-[18px] sm:w-[18px]" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={plan.ctaHref}
                        className="mt-6 self-start sm:mt-9 btn-primary"
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PROCESS ═══════════════════════ */}
        <section id="methode" className="relative overflow-hidden bg-warm-900 px-4 py-14 sm:px-6 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            <Reveal className="mb-4 text-center" variant="scale-up">
              <p className="section-label mb-3 justify-center !text-accent sm:mb-4 before:!bg-accent/40">Un système simple</p>
              <h2 className="text-balance text-heading-mobile font-light text-white sm:text-heading-xl md:text-display">
                Comment ça <span className="serif-accent">marche.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-white/50 sm:mt-4 sm:text-body-lg">
                Un système simple pour générer des avis positifs — sans tricher.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-6 md:grid-cols-3">
              {/* ── Étape 1 : Calendly booking widget ── */}
              <Reveal delay={0.1} variant="slide-left">
                <div className="group relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-[260px] w-full max-w-[260px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_50px_rgba(0,107,255,0.15)] sm:mb-6 md:mx-0" style={{ border: '1px solid #e8e8e8' }}>
                    {/* Calendly-style event info header */}
                    <div className="border-b px-4 pb-2.5 pt-3" style={{ borderColor: '#e5e5e5' }}>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                          <span className="text-[9px] font-bold text-gray-500">S</span>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500">Sandro T.</p>
                          <p className="text-[12px] font-bold text-gray-900">Créer une opération</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[9px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 4.5V8L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          15 min
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8" cy="8" r="2" fill="currentColor" />
                          </svg>
                          Google Meet
                        </span>
                      </div>
                    </div>

                    {/* Calendar section */}
                    <div className="px-4 pb-2 pt-2.5">
                      <p className="mb-2 text-[11px] font-bold text-gray-900">Sélectionnez une date</p>

                      {/* Month navigation */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-gray-300">&lsaquo;</span>
                        <span className="text-[10px] font-semibold text-gray-800">Mars 2026</span>
                        <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white" style={{ backgroundColor: '#0069ff' }}>&rsaquo;</span>
                      </div>

                      {/* Day headers - like real Calendly: MON TUE WED... */}
                      <div className="mb-1 grid grid-cols-7 gap-0 text-center">
                        {['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map((d, idx) => (
                          <span key={idx} className="text-[7px] font-semibold uppercase tracking-wide text-gray-400">{d}</span>
                        ))}
                      </div>

                      {/* Calendar grid - March 2026 starts on Sunday, so offset = 6 */}
                      <div className="grid grid-cols-7 gap-y-0.5 text-center text-[9px]">
                        {/* Empty cells for offset (Sun start = 6 empty cells before day 1) */}
                        {Array.from({ length: 6 }, (_, idx) => (
                          <span key={`empty-${idx}`} className="flex h-[22px] w-full items-center justify-center" />
                        ))}
                        {Array.from({ length: 22 }, (_, idx) => {
                          const day = idx + 1;
                          const isToday = day === 7;
                          const isSelected = day === 9;
                          const isPast = day < 7;
                          const isUnavailable = day === 1 || day === 8 || day === 15 || day === 22 || day === 29;
                          const isAvailable = !isPast && !isToday && !isSelected && !isUnavailable;
                          return (
                            <span
                              key={idx}
                              className={`relative mx-auto flex h-[22px] w-[22px] items-center justify-center rounded-full text-[9px] ${
                                isSelected
                                  ? 'font-bold text-white'
                                  : isToday
                                  ? 'font-bold'
                                  : isAvailable
                                  ? 'font-medium'
                                  : isPast
                                  ? 'text-gray-300'
                                  : 'text-gray-300'
                              }`}
                              style={
                                isSelected
                                  ? { backgroundColor: '#0069ff' }
                                  : isToday
                                  ? { border: '1.5px solid #0069ff', color: '#1a3154' }
                                  : isAvailable
                                  ? { backgroundColor: 'rgba(0,105,255,0.08)', color: '#0069ff' }
                                  : undefined
                              }
                            >
                              {day}
                              {isToday && (
                                <span className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full" style={{ backgroundColor: '#0069ff' }} />
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">Étape 1</p>
                  <h3 className="text-base font-medium text-white sm:text-lg">Créez votre opération</h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0 md:max-w-[240px]">
                    Définissez ce que vous offrez aux testeurs (accès gratuit, échantillon, séance découverte…) et le profil idéal de vos testeurs.
                  </p>
                  <RiArrowRightLine className="absolute -right-3 top-20 hidden h-4 w-4 text-white/20 md:block" />
                </div>
              </Reveal>

              {/* ── Étape 2 : Audit dashboard ── */}
              <Reveal delay={0.2} variant="scale-up">
                <div className="group relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-[260px] w-full max-w-[260px] flex-col overflow-hidden rounded-xl border border-warm-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-[0_12px_50px_rgba(240,199,94,0.12)] sm:mb-6 md:mx-0">
                    <div className="flex items-center gap-2 border-b border-warm-100 px-3 py-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      <span className="text-[10px] font-medium text-warm-400">Matching testeurs</span>
                    </div>
                    <div className="p-3">
                      <div className="mx-auto mb-2.5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-300 bg-emerald-50">
                        <div className="text-center">
                          <span className="block text-xl font-bold text-emerald-600">25</span>
                          <span className="block text-[7px] font-semibold uppercase tracking-wider text-emerald-400">testeurs</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'Profils compatibles', value: 78, color: 'bg-emerald-400' },
                          { label: 'Testeurs disponibles', value: 65, color: 'bg-blue-400' },
                          { label: 'Score de matching', value: 82, color: 'bg-emerald-500' },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div className="mb-0.5 flex items-center justify-between text-[9px]">
                              <span className="text-warm-500">{metric.label}</span>
                              <span className="font-semibold text-warm-700">{metric.value}%</span>
                            </div>
                            <div className="h-1 rounded-full bg-warm-100">
                              <div
                                className={`h-full rounded-full ${metric.color}`}
                                style={{ width: `${metric.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1">
                        <RiSparklingFill className="h-2.5 w-2.5 text-emerald-500" />
                        <span className="text-[9px] font-medium text-emerald-600">25 testeurs activés pour vous</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">Étape 2</p>
                  <h3 className="text-base font-medium text-white sm:text-lg">On active les testeurs</h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0 md:max-w-[240px]">
                    Notre plateforme matche votre offre avec des testeurs qualifiés de notre communauté. Ils s&apos;inscrivent volontairement.
                  </p>
                  <RiArrowRightLine className="absolute -right-3 top-20 hidden h-4 w-4 text-white/20 md:block" />
                </div>
              </Reveal>

              {/* ── Étape 3 : Google Maps boost ── */}
              <Reveal delay={0.3} variant="slide-right">
                <div className="group relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-[260px] w-full max-w-[260px] flex-col overflow-hidden rounded-xl border border-warm-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-[0_12px_50px_rgba(240,199,94,0.12)] sm:mb-6 md:mx-0">
                    <div className="flex items-center gap-2 border-b border-warm-100 px-3 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.3 132.3" className="h-4 w-auto shrink-0">
                        <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"/>
                        <path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3L10.8 16.5z"/>
                        <path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"/>
                        <path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"/>
                        <path fill="#34a853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"/>
                      </svg>
                      <span className="text-[10px] font-medium text-warm-400">Avis publiés</span>
                    </div>
                    <div className="px-3 pt-2 pb-1">
                      <div className="mb-2 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1.5">
                        <RiSearchLine className="h-2.5 w-2.5 text-warm-400" />
                        <span className="text-[9px] text-warm-500">avis récents · votre marque</span>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {[
                          { rank: '1', name: 'Avis testeur · Sarah M.', highlight: true, rating: 5, reviews: 1, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop&crop=center' },
                          { rank: '2', name: 'Avis testeur · Lucas P.', highlight: true, rating: 4.8, reviews: 1, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop&crop=center' },
                          { rank: '3', name: 'Avis testeur · Julie D.', highlight: true, rating: 5, reviews: 1, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&crop=center' },
                        ].map((item) => (
                          <div
                            key={item.rank}
                            className={`flex gap-2 py-2 ${item.highlight ? 'rounded-lg bg-emerald-50/80 px-1.5 -mx-1.5' : ''}`}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className={`h-6 w-6 shrink-0 rounded-full object-cover ring-[1.5px] ${item.highlight ? 'ring-emerald-400' : 'ring-gray-200'}`}
                            />
                            <div className="min-w-0 flex-1">
                              <p className={`truncate text-[10px] font-semibold leading-tight ${item.highlight ? 'text-emerald-600' : 'text-gray-800'}`}>
                                {item.name}
                              </p>
                              <div className="mt-0.5 flex items-center gap-0.5">
                                <span className="text-[8px] font-medium text-gray-600">{item.rating}</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, k) =>
                                    k < Math.floor(item.rating)
                                      ? <RiStarFill key={k} className="h-[6px] w-[6px] text-[#FBBC05]" />
                                      : <RiStarLine key={k} className="h-[6px] w-[6px] text-gray-200" />
                                  )}
                                </div>
                                <span className="text-[7px] text-gray-400">({item.reviews})</span>
                              </div>
                            </div>
                            {item.highlight && (
                              <span className="mt-0.5 shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-bold text-emerald-600">
                                ↑ +10
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-1.5 mb-1.5 flex items-center justify-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1">
                        <RiCheckboxCircleFill className="h-2.5 w-2.5 text-emerald-500" />
                        <span className="text-[9px] font-medium text-emerald-600">+3 avis publiés aujourd&apos;hui</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">Étape 3</p>
                  <h3 className="text-base font-medium text-white sm:text-lg">Les avis tombent</h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0 md:max-w-[240px]">
                    Les testeurs satisfaits laissent un avis public authentique. Les insatisfaits vous envoient un feedback privé constructif via la plateforme.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="mt-8 flex justify-center gap-4 sm:mt-10" variant="scale-up">
              <a href="/rendez-vous" className="btn-outline-light">
                Lancer mon opération
              </a>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ VALUE PROPS ═══════════════════════ */}
        <section className="bg-warm-100 px-4 py-14 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-4 text-center sm:mb-6" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">Les bénéfices</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Ce que nos clients obtiennent <span className="serif-accent">concrètement.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mb-10 text-center sm:mb-16" variant="blur-in">
              <p className="mx-auto max-w-2xl text-body-sm text-warm-500 sm:text-body-lg">
                Plus d&apos;avis authentiques, plus de crédibilité, plus de clients. Et du feedback actionnable en bonus.
              </p>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {VALUE_PROPS.map((prop, i) => (
                <Reveal key={prop.title} delay={i * 0.08} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
                  <div className="group relative flex h-full flex-col items-start gap-4 rounded-xl border border-warm-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:gap-5 sm:rounded-2xl sm:p-7">
                    <div className="relative h-[60px] w-[60px] rounded-[10px] bg-gradient-to-b from-[#d0d0d0] via-[#b8b8b8] to-[#a0a0a0] p-[5px] shadow-[0_2px_8px_rgba(100,100,100,0.18),0_4px_14px_rgba(100,100,100,0.12)] transition-all duration-300 group-hover:shadow-[0_4px_16px_rgba(100,100,100,0.24),0_6px_22px_rgba(100,100,100,0.14)] sm:h-[70px] sm:w-[70px] sm:rounded-[12px] sm:p-[6px]">
                      <div className="flex h-full w-full items-center justify-center rounded-[6px] border border-white/60 bg-gradient-to-b from-white from-30% via-[#f4f4f4] via-65% to-[#e2e2e2] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95)] sm:rounded-[7px]">
                        <FreehandIcon name={prop.icon} size={34} className="text-[#1d1d1f]" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-warm-400 transition-colors duration-300 group-hover:text-accent-dark sm:text-xs">
                      {prop.stat} {prop.statLabel}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-warm-900 sm:text-xl">{prop.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-warm-500 sm:mt-2 sm:text-body-sm">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-14 text-center">
              <Link
                href="/resultats"
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-warm-500 transition-colors hover:text-accent-dark"
              >
                Voir les résultats de nos clients
                <RiArrowRightLine className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ BLOG ═══════════════════════ */}
        <section className="px-4 py-14 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8 text-center sm:mb-10" variant="scale-up">
              <p className="section-label mb-3 justify-center sm:mb-4">Ressources</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Nos conseils pour votre <span className="serif-accent">preuve sociale</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-4 sm:text-body-lg">
                Des stratégies concrètes pour obtenir plus d&apos;avis et renforcer votre crédibilité en ligne.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  tag: 'Preuve sociale',
                  title: 'Pourquoi 87% des consommateurs lisent les avis avant d\'acheter',
                  excerpt: 'Découvrez pourquoi la preuve sociale est devenue le premier levier de conversion — et comment en tirer parti.',
                  readTime: '5 min',
                  image: '/blog/blog-optimiser-fiche-google.png',
                },
                {
                  tag: 'Stratégie',
                  title: 'Comment obtenir des avis authentiques sans tricher',
                  excerpt: 'Les faux avis sont illégaux et repérables. Voici la méthode éthique pour générer de la preuve sociale à grande échelle.',
                  readTime: '4 min',
                  image: '/blog/blog-avis-google-strategie.png',
                },
                {
                  tag: 'Croissance',
                  title: 'Le cold start : comment résoudre le problème des 0 avis au lancement',
                  excerpt: 'Zéro avis au démarrage = zéro crédibilité. Voici comment les entreprises malignes résolvent ce problème.',
                  readTime: '6 min',
                  image: '/blog/blog-erreurs-fiche-google.png',
                },
              ].map((article, i) => (
                <Reveal key={article.title} delay={i * 0.12} variant="rotate-in">
                  <Link href="/blog" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card sm:rounded-3xl">
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-warm-100 via-warm-200/60 to-accent-light/30 flex items-center justify-center sm:h-48">
                      <FreehandIcon name="notebook" size={48} className="text-warm-300 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-7">
                      <span className="mb-3 inline-block w-fit rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-semibold text-accent-dark sm:mb-4 sm:px-3 sm:py-1 sm:text-xs">
                        {article.tag}
                      </span>
                      <h3 className="text-lg font-medium text-warm-900 group-hover:text-accent-dark transition-colors sm:text-xl">
                        {article.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-warm-600 sm:mt-3 sm:text-sm">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-warm-100 pt-4 sm:mt-6 sm:pt-5">
                        <span className="text-[11px] text-warm-500 sm:text-xs">{article.readTime} de lecture</span>
                        <span className="text-xs font-semibold text-accent-dark group-hover:underline sm:text-sm">
                          Lire l&apos;article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
        <section id="temoignages" className="pb-14 pt-6 overflow-hidden sm:pb-24 sm:pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="mb-10 text-center sm:mb-16" variant="scale-up">
              <p className="section-label mb-3 justify-center sm:mb-4">Ils nous font confiance</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Ce que disent nos clients
              </h2>
              <div className="mx-auto mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 shadow-soft sm:mt-4 sm:gap-3 sm:px-5 sm:py-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" className="h-4 w-auto shrink-0 sm:h-5">
                  <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                  <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C119.25 34.32 129.24 25 141.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                  <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                  <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                  <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                  <path fill="#4285F4" d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z"/>
                </svg>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RiStarFill key={i} className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-warm-700 sm:text-sm">Programme pionnier · Places limitées</span>
              </div>
            </Reveal>
          </div>

          {/* Row 1 — scrolls left */}
          <div className="testimonials-row relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-warm-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-warm-50 to-transparent" />
            <div className="testimonials-track testimonials-track-left">
              {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1].map((t, i) => (
                <div
                  key={`r1-${i}`}
                  className="group flex w-[280px] shrink-0 flex-col rounded-2xl border border-warm-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:w-[380px] sm:rounded-3xl sm:p-7"
                >
                  <div className="mb-3 flex gap-0.5 sm:mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <RiStarFill key={j} className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-warm-700 sm:text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-warm-100 pt-4 sm:mt-6 sm:gap-3 sm:pt-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm-100 text-2xl sm:h-14 sm:w-14 sm:text-3xl" role="img" aria-label={t.name}>
                      {t.emoji}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-warm-900 sm:text-sm">{t.name}</p>
                      <p className="text-[11px] text-warm-500 sm:text-xs">{t.role} · {t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="testimonials-row relative mt-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-warm-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-warm-50 to-transparent" />
            <div className="testimonials-track testimonials-track-right">
              {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => (
                <div
                  key={`r2-${i}`}
                  className="group flex w-[280px] shrink-0 flex-col rounded-2xl border border-warm-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:w-[380px] sm:rounded-3xl sm:p-7"
                >
                  <div className="mb-3 flex gap-0.5 sm:mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <RiStarFill key={j} className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-warm-700 sm:text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-warm-100 pt-4 sm:mt-6 sm:gap-3 sm:pt-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm-100 text-2xl sm:h-14 sm:w-14 sm:text-3xl" role="img" aria-label={t.name}>
                      {t.emoji}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-warm-900 sm:text-sm">{t.name}</p>
                      <p className="text-[11px] text-warm-500 sm:text-xs">{t.role} · {t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════ FAQ ═══════════════════════ */}
        <section id="faq" className="px-4 pb-14 pt-6 sm:px-6 sm:pb-24 sm:pt-8">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-10 text-center sm:mb-16" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">FAQ</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Encore des questions ?
              </h2>
            </Reveal>

            <Reveal delay={0.1} variant="scale-up">
              <div className="rounded-2xl border border-warm-200 bg-white p-4 shadow-soft sm:rounded-3xl sm:p-8">
                {FAQ_ITEMS.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ AUDIT CTA ═══════════════════════ */}
        <section id="audit" className="relative px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
          <Reveal variant="scale-up">
            <div className="mx-auto max-w-6xl rounded-2xl border border-warm-200 bg-white shadow-soft sm:rounded-4xl">
            <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
              <div>
                <p className="section-label mb-3 sm:mb-4">Passez à l&apos;action</p>
                <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                  Vos concurrents ont plus d&apos;avis que vous.
                </h2>
                <p className="mt-3 text-body-sm text-warm-600 sm:mt-4 sm:text-body">
                  Pas parce qu&apos;ils sont meilleurs. Parce qu&apos;ils ont un système.
                  Lancez votre première opération et commencez à collecter des avis authentiques.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-warm-600 sm:mt-6 sm:text-sm">
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Sans engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Résultats sous 14 jours
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Satisfait ou re-testé
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> 100% transparent et légal
                  </li>
                </ul>
                <p className="mt-4 flex items-center gap-2 text-xs text-warm-500 sm:mt-6 sm:text-sm">
                  <RiTimeLine className="h-3.5 w-3.5 text-warm-400 sm:h-4 sm:w-4" />
                  Premiers avis sous 7 à 14 jours.
                </p>
              </div>

              <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-warm-200 bg-warm-50 p-4 sm:rounded-3xl sm:p-6">
                {/* Google Maps background */}
                <div className="pointer-events-none absolute inset-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21003.6!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr"
                    className="absolute inset-0 h-full w-full scale-110 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-warm-50/60 backdrop-blur-[1px]" />
                </div>

                <div className="relative">
                  <p className="mb-3 text-base font-semibold text-warm-900 sm:mb-4 sm:text-lg">Lancez votre opération</p>
                  <PlaceSearchInput onSelect={handlePlaceSelect} />
                  <p className="mt-2.5 text-[11px] text-warm-400 sm:mt-3 sm:text-xs">
                    Recherchez votre entreprise ou créez votre compte business...
                  </p>
                </div>
              </div>
            </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
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

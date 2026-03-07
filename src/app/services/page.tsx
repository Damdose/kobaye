'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
} from '@phosphor-icons/react';
import FreehandIcon from '@/components/FreehandIcon';

const SERVICES = [
  {
    id: 'audit-gratuit',
    icon: 'chart-bar' as const,
    tag: 'Gratuit',
    title: 'Audit Gratuit',
    headline: 'Découvrez où vous en êtes sur Google Maps.',
    description:
      'En 30 secondes, obtenez un diagnostic complet de votre visibilité locale : score d\'optimisation, positions sur la carte, analyse concurrentielle et recommandations IA personnalisées.',
    price: 'Gratuit',
    priceSuffix: '',
    features: [
      'Score d\'optimisation sur 100',
      'Heatmap de vos positions locales',
      'Analyse de vos 3 concurrents principaux',
      'Recommandations IA personnalisées',
      'Estimation de revenus manqués',
      'Analyse de visibilité IA (ChatGPT, Gemini)',
    ],
    stats: [
      { value: '30s', label: 'Pour obtenir votre rapport' },
      { value: '15+', label: 'Métriques analysées' },
      { value: '3', label: 'Concurrents identifiés' },
    ],
    cta: 'Lancer l\'audit',
    ctaHref: '/audit-gratuit',
    detailHref: '/services/audit-gratuit',
    highlighted: false,
    badge: '100% gratuit',
    accentColor: 'bg-positive/10 text-positive',
    accentBorder: 'border-positive/20',
  },
  {
    id: 'optimisation-fiche-google',
    icon: 'pencil' as const,
    tag: 'One-shot · 500€',
    title: 'Optimisation Fiche Google',
    headline: 'Une fiche qui convertit les recherches en clients.',
    description:
      'On passe votre fiche Google au peigne fin et on optimise chaque détail : catégories, description SEO, photos, Q&A, posts. Livrée en 5 jours avec un rapport complet.',
    price: '500€',
    priceSuffix: '',
    features: [
      'Audit complet de la fiche existante',
      'Optimisation catégories, attributs, description SEO',
      'Upload et structuration des photos',
      'Setup Q&A, produits/services, horaires',
      'Publication des premiers posts Google',
      'Cohérence NAP sur les annuaires principaux',
    ],
    stats: [
      { value: '92/100', label: 'Score moyen post-opti' },
      { value: '5 jours', label: 'Délai de livraison' },
      { value: '+70%', label: 'de visibilité en moy.' },
    ],
    cta: 'Prendre rendez-vous',
    ctaHref: '/rendez-vous',
    detailHref: '/services/optimisation-fiche-google',
    highlighted: true,
    badge: 'Populaire',
    accentColor: 'bg-accent/10 text-accent-dark',
    accentBorder: 'border-accent/20',
  },
  {
    id: 'boost-avis-experience',
    icon: 'check-badge' as const,
    tag: 'Sur devis',
    title: 'Boost Avis Expérience',
    headline: 'De vrais clients, de vrais avis Google.',
    description:
      'Des étudiants sélectionnés visitent votre établissement, vivent une expérience réelle et laissent un avis Google authentique et détaillé. 100% conforme aux CGU.',
    price: 'Sur devis',
    priceSuffix: '',
    features: [
      'Des étudiants visitent votre établissement',
      'Expérience réelle (repas, soin, service…)',
      'Avis Google authentique et détaillé',
      '100% conforme aux CGU Google',
      'Suivi et reporting des avis publiés',
      'Accompagnement pour répondre aux avis',
    ],
    stats: [
      { value: '+0.4', label: 'de note moyenne / mois' },
      { value: '24+', label: 'Avis publiés / mois' },
      { value: '100%', label: 'Conforme CGU Google' },
    ],
    cta: 'Candidater',
    ctaHref: '/rendez-vous',
    detailHref: '/services/boost-avis-experience',
    highlighted: false,
    badge: 'Candidature requise',
    accentColor: 'bg-warm-100 text-warm-700',
    accentBorder: 'border-warm-200',
  },
  {
    id: 'google-ads-local',
    icon: 'megaphone' as const,
    tag: 'Dès 400€/mois',
    title: 'Google Ads Local',
    headline: 'Des appels qualifiés, pas juste des clics.',
    description:
      'On gère vos campagnes Search locales et vos Local Service Ads pour transformer chaque euro de budget pub en clients réels. Reporting mensuel transparent.',
    price: '400€',
    priceSuffix: '/mois + budget pub',
    features: [
      'Création et gestion des campagnes Search local',
      'Setup Local Service Ads (LSA) si éligible',
      'Tracking appels, formulaires, visites',
      'Reporting mensuel coût par lead',
      'Optimisation continue enchères et ciblage',
      'Call de suivi mensuel avec votre account manager',
    ],
    stats: [
      { value: '4,20€', label: 'CPL moyen' },
      { value: '3,2x', label: 'ROI moyen à 90 jours' },
      { value: '96%', label: 'De clients reconduits' },
    ],
    cta: 'Prendre rendez-vous',
    ctaHref: '/rendez-vous',
    detailHref: '/services/google-ads-local',
    highlighted: false,
    badge: null,
    accentColor: 'bg-warm-100 text-warm-700',
    accentBorder: 'border-warm-200',
  },
];

const VALUE_PROPS = [
  {
    icon: 'target' as const,
    title: 'Reflétez votre ambition locale',
    description:
      'Démarquez-vous de la concurrence et affirmez votre présence avec une fiche Google optimisée à la hauteur de votre business.',
  },
  {
    icon: 'trend-up' as const,
    title: 'Boostez votre trafic local',
    description:
      'Placez votre fiche en pole position sur Google Maps grâce à notre expertise SEO local. On ne laisse rien au hasard.',
  },
  {
    icon: 'users' as const,
    title: 'Transformez votre trafic en clients',
    description:
      'Faites de chaque recherche locale une opportunité. Votre fiche est conçue pour convertir les recherches en appels et visites.',
  },
  {
    icon: 'shield' as const,
    title: 'Mesurez vos résultats',
    description:
      'Un reporting clair, des KPI lisibles, et des arbitrages orientés business au lieu de vanity metrics.',
  },
  {
    icon: 'chat' as const,
    title: 'Construisez votre réputation',
    description:
      'Mise en place d\'un système continu pour collecter plus d\'avis qualifiés et augmenter le taux de conversion.',
  },
  {
    icon: 'lightning' as const,
    title: 'Reprenez le contrôle',
    description:
      'Déployez votre stratégie locale librement grâce à notre accompagnement et un tableau de bord en temps réel.',
  },
];

const JOURNEY_STEPS = [
  {
    num: '01',
    icon: 'chart-bar' as const,
    title: 'Diagnostic',
    description: 'Lancez un audit gratuit pour comprendre votre situation actuelle sur Google Maps.',
    service: 'Audit Gratuit',
    href: '#audit-gratuit',
  },
  {
    num: '02',
    icon: 'pencil' as const,
    title: 'Optimisation',
    description: 'On optimise votre fiche Google pour qu\'elle convertisse les recherches en clients.',
    service: 'Optimisation Fiche',
    href: '#optimisation-fiche-google',
  },
  {
    num: '03',
    icon: 'check-badge' as const,
    title: 'Réputation',
    description: 'Des vrais clients visitent votre établissement et laissent des avis authentiques.',
    service: 'Boost Avis',
    href: '#boost-avis-experience',
  },
  {
    num: '04',
    icon: 'megaphone' as const,
    title: 'Acquisition',
    description: 'Des campagnes Ads locales qui génèrent des appels et des visites qualifiés.',
    service: 'Google Ads Local',
    href: '#google-ads-local',
  },
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

export default function ServicesPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 pb-6 sm:pb-8 pt-10 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Nos services</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Tout ce qu&apos;il faut pour dominer{' '}
              <span className="serif-accent">Google Maps.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Des offres claires, des résultats concrets. Pas de frais cachés, pas de surprise.
              Choisissez le service adapté à vos enjeux.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Parcours client ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
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

      {/* ── Détail des offres ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
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
                    {/* Left: info */}
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

                      {/* Price */}
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

                      {/* Stats */}
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

                      {/* CTAs */}
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                          href={service.ctaHref}
                          className={service.highlighted ? 'btn-accent' : 'btn-primary'}
                        >
                          {service.cta}
                        </Link>
                        <Link
                          href={service.detailHref}
                          className="inline-flex items-center gap-1.5 rounded-full border border-warm-200 bg-warm-50 px-5 py-2 text-[13px] font-medium text-warm-600 transition-colors hover:bg-warm-100 hover:text-warm-900"
                        >
                          En savoir plus
                          <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: features */}
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

      {/* ── Comparatif rapide ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
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
                        {s.title.split(' ').slice(0, 2).join(' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-200/40">
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Prix</td>
                    <td className="p-5 text-center font-semibold text-positive">Gratuit</td>
                    <td className="p-5 text-center font-semibold text-warm-900 bg-accent/[0.04]">500€</td>
                    <td className="p-5 text-center font-semibold text-warm-900">Sur devis</td>
                    <td className="p-5 text-center font-semibold text-warm-900">400€/mois</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Format</td>
                    <td className="p-5 text-center text-warm-500">Instantané</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">One-shot</td>
                    <td className="p-5 text-center text-warm-500">Récurrent</td>
                    <td className="p-5 text-center text-warm-500">Récurrent</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Délai résultats</td>
                    <td className="p-5 text-center text-warm-500">30 secondes</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">1-2 semaines</td>
                    <td className="p-5 text-center text-warm-500">Dès le 1er mois</td>
                    <td className="p-5 text-center text-warm-500">Dès la 1ère semaine</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Idéal si…</td>
                    <td className="p-5 text-center text-warm-500">Vous voulez savoir où vous en êtes</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">Votre fiche est incomplète ou mal optimisée</td>
                    <td className="p-5 text-center text-warm-500">Vous manquez d&apos;avis récents</td>
                    <td className="p-5 text-center text-warm-500">Vous voulez des leads immédiats</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Engagement</td>
                    <td className="p-5 text-center text-warm-500">Aucun</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">Aucun</td>
                    <td className="p-5 text-center text-warm-500">Candidature</td>
                    <td className="p-5 text-center text-warm-500">Sans engagement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pourquoi Siva ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 max-w-3xl">
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Pourquoi choisir <span className="serif-accent">Siva</span> ?
            </h2>
            <p className="mt-4 text-body-sm sm:text-body-lg text-warm-500">
              Votre visibilité locale au service de vos enjeux business.
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

      {/* ── CTA ── */}
      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white sm:text-display">
              Prêt à <span className="serif-accent text-accent">passer à l&apos;action</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Commencez par un audit gratuit ou prenez rendez-vous avec un expert.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
              <Link
                href="/audit-gratuit"
                className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                Lancer l&apos;audit gratuit
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

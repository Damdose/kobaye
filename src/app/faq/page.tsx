'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CaretDown,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import FreehandIcon, { type FreehandIconName } from '@/components/FreehandIcon';

type FAQCategory = {
  id: string;
  label: string;
  icon: FreehandIconName;
  items: { q: string; a: string }[];
};

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'plateforme',
    label: 'La plateforme',
    icon: 'map-pin' as const,
    items: [
      {
        q: 'Qu\'est-ce que Kobaye fait concrètement ?',
        a: 'Kobaye est une plateforme qui organise des expériences clients réelles pour générer de la preuve sociale authentique. Nous connectons des entreprises qui veulent des avis authentiques avec des testeurs qualifiés qui testent leurs produits et services gratuitement en échange de leur retour honnête.',
      },
      {
        q: 'Comment ça marche ?',
        a: 'Vous créez une opération en définissant ce que vous offrez aux testeurs et le profil idéal. Notre plateforme matche votre offre avec des testeurs qualifiés. Ils testent réellement votre produit. Les satisfaits laissent un avis public authentique, les insatisfaits vous font un retour privé constructif.',
      },
      {
        q: 'Est-ce que les avis sont de vrais avis ?',
        a: 'Oui. Les testeurs utilisent réellement votre produit. Leur retour est libre et honnête. Nous ne demandons jamais de note minimale. Chaque avis mentionne que le test a été réalisé via notre programme — transparence totale.',
      },
      {
        q: 'Combien de temps faut-il pour voir les premiers avis ?',
        a: 'En moyenne, les premiers avis sont publiés sous 7 à 14 jours après le lancement de l\'opération.',
      },
    ],
  },
  {
    id: 'legalite',
    label: 'Légalité & transparence',
    icon: 'shield' as const,
    items: [
      {
        q: 'Est-ce légal ?',
        a: 'Oui. Notre modèle repose sur la transparence : chaque avis identifie le cadre du test. C\'est le même principe que les programmes Amazon Vine ou Bazaarvoice. Conforme aux règles Google, Trustpilot, et au droit français de la consommation.',
      },
      {
        q: 'Et si les testeurs laissent des avis négatifs ?',
        a: 'Les testeurs insatisfaits sont orientés vers un feedback privé constructif sur notre plateforme. Ils ne sont pas empêchés de publier un avis, mais le design du parcours canalise naturellement les retours négatifs en privé.',
      },
      {
        q: 'Pourquoi ça fonctionne ?',
        a: 'Le biais de réciprocité est le moteur invisible. Un utilisateur qui reçoit quelque chose gratuitement est naturellement enclin à donner un retour positif — sans qu\'on le lui demande. Nous ne demandons jamais 5 étoiles. Nous créons les conditions pour que la satisfaction s\'exprime d\'elle-même.',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Opérations & fonctionnement',
    icon: 'wrench' as const,
    items: [
      {
        q: 'Qu\'est-ce que je dois offrir aux testeurs ?',
        a: 'Cela dépend de votre activité : un accès gratuit à votre formation, une période d\'essai étendue de votre SaaS, un échantillon produit, une séance découverte de coaching… Vous définissez l\'offre au moment de créer votre opération.',
      },
      {
        q: 'Comment sont sélectionnés les testeurs ?',
        a: 'Chaque testeur a un profil vérifié sur la plateforme. Vous pouvez définir des critères (localisation, centres d\'intérêt, profil socio-démo) pour cibler les bons profils. Les testeurs candidatent et vous validez (ou nous le faisons pour vous).',
      },
      {
        q: 'Que comprend le dashboard ?',
        a: 'Vous suivez tout en temps réel depuis votre dashboard : feedbacks structurés, avis publiés, scores, et progression de votre opération. Le dashboard varie selon votre pack (basique, avancé ou complet).',
      },
    ],
  },
  {
    id: 'tarifs',
    label: 'Tarifs & engagement',
    icon: 'dollar' as const,
    items: [
      {
        q: 'Quels sont vos tarifs ?',
        a: 'Nous proposons 3 packs : 50 testeurs (1 450€, soit 29€/testeur), 100 testeurs (2 450€, soit 24,5€/testeur), et 200 testeurs (4 650€, soit ~23€/testeur). Chaque pack inclut le feedback structuré et le suivi des avis. Des opérations sur-mesure sont aussi disponibles pour les gros volumes.',
      },
      {
        q: 'Y a-t-il un engagement de durée ?',
        a: 'Non. Chaque opération est un achat ponctuel, sans abonnement ni engagement. Vous lancez une opération quand vous en avez besoin.',
      },
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Virement bancaire, prélèvement SEPA et carte bancaire. La facturation est claire et détaillée.',
      },
      {
        q: 'Quelle est la différence entre les packs ?',
        a: 'Au-delà du nombre de testeurs, les packs supérieurs incluent du matching avancé, un rapport consolidé, un support prioritaire, et pour le pack Scale : un account manager dédié, la relance des testeurs, et une stratégie d\'avis personnalisée.',
      },
    ],
  },
  {
    id: 'testeurs',
    label: 'Espace testeur',
    icon: 'star' as const,
    items: [
      {
        q: 'C\'est vraiment gratuit pour les testeurs ?',
        a: 'Oui. L\'inscription est gratuite. Les produits et services que tu testes sont offerts par les marques. Tu ne payes rien.',
      },
      {
        q: 'Je suis obligé de mettre un avis positif ?',
        a: 'Non. Jamais. Si tu as aimé, tu es invité à laisser un avis public. Si tu n\'as pas aimé, tu fais un retour privé constructif. Aucune pression, aucune note imposée.',
      },
      {
        q: 'Quels types de produits je peux tester ?',
        a: 'Formations en ligne, apps, SaaS, produits physiques, coaching, services digitaux… La variété augmente chaque semaine.',
      },
      {
        q: 'Comment je suis sélectionné ?',
        a: 'Ton profil est matché avec les critères de chaque opération. Plus ton profil est complet et ta réputation élevée, plus tu as accès aux meilleures expériences.',
      },
      {
        q: 'Combien de temps ça prend ?',
        a: 'Chaque opération précise la durée estimée du test. En général entre 30 minutes et quelques jours selon le produit.',
      },
    ],
  },
  {
    id: 'profil',
    label: 'Pour qui ?',
    icon: 'building' as const,
    items: [
      {
        q: 'Je suis infopreneur ou formateur en ligne, c\'est fait pour moi ?',
        a: 'C\'est idéal pour vous. Votre produit est 100% digital, testable à distance. Les avis sont votre principal levier de conversion. Nos testeurs accèdent gratuitement à votre formation et laissent un retour authentique.',
      },
      {
        q: 'Je lance mon activité et j\'ai zéro avis, c\'est trop tôt ?',
        a: 'Au contraire, c\'est le moment parfait. Zéro avis au démarrage est un problème critique (le « cold start »). Notre service est conçu pour résoudre exactement ce frein en vous permettant d\'accumuler rapidement de la preuve sociale authentique.',
      },
      {
        q: 'Je suis une agence ou un freelance, ça marche aussi ?',
        a: 'Oui. Le marché des services digitaux est saturé et la preuve sociale fait la différence entre deux prestataires. Vous pouvez offrir un audit gratuit, un livrable test ou une mini-mission en échange d\'un avis.',
      },
      {
        q: 'Je suis un SaaS, comment ça fonctionne ?',
        a: 'Vous proposez une période d\'essai étendue ou un accès premium gratuit. Les testeurs utilisent votre app et partagent leur retour. Idéal pour booster la social proof sur vos pages de pricing et les app stores.',
      },
    ],
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-200/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left"
      >
        <span className="text-sm font-medium text-warm-800 transition-colors group-hover:text-warm-900 sm:text-lg">
          {question}
        </span>
        <CaretDown
          weight="bold"
          className={`h-4.5 w-4.5 shrink-0 text-warm-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-warm-600 sm:pb-6 sm:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ category }: { category: FAQCategory }) {
  return (
    <div id={category.id} className="scroll-mt-32">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <FreehandIcon name={category.icon} size={20} className="text-accent-dark" />
          </div>
          <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">{category.label}</h2>
        </div>
        <div className="rounded-xl border border-warm-200 bg-white px-4 py-1 shadow-soft sm:rounded-2xl sm:px-7">
          {category.items.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => (activeCategory ? cat.id === activeCategory : true));

  const visibleCategories = filteredCategories.filter((cat) => cat.items.length > 0);
  const totalQuestions = FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <main>
      {/* Hero */}
      <section className="px-4 sm:px-6 pb-6 pt-10 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Tout savoir sur <span className="serif-accent">Kobaye</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              {totalQuestions} réponses sur notre plateforme, nos opérations et notre approche de la preuve sociale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 sm:px-6 pb-4">
        <div className="mx-auto max-w-2xl">
          <Reveal delay={0.05}>
            <div className="relative">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-400"
              />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-warm-200 bg-white py-3 pl-10 pr-4 sm:py-4 sm:pl-12 text-body text-warm-800 shadow-soft outline-none transition-all placeholder:text-warm-400 focus:border-warm-300 focus:shadow-card"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category pills */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === null
                    ? 'bg-warm-900 text-white shadow-soft'
                    : 'bg-white text-warm-600 border border-warm-200 hover:border-warm-300 hover:text-warm-800'
                }`}
              >
                Tout voir
              </button>
              {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat.id ? null : cat.id)
                    }
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-warm-900 text-white shadow-soft'
                        : 'bg-white text-warm-600 border border-warm-200 hover:border-warm-300 hover:text-warm-800'
                    }`}
                  >
                    <FreehandIcon name={cat.icon} size={16} />
                    {cat.label}
                  </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {visibleCategories.length > 0 ? (
            visibleCategories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-warm-200 bg-white p-8 text-center shadow-soft sm:p-12">
                <MagnifyingGlass
                  weight="bold"
                  className="mx-auto mb-4 h-10 w-10 text-warm-300"
                />
                <p className="text-lg font-medium text-warm-700">
                  Aucun résultat trouvé
                </p>
                <p className="mt-2 text-warm-500">
                  Essayez avec d&apos;autres mots-clés ou{' '}
                  <button
                    onClick={() => {
                      setSearch('');
                      setActiveCategory(null);
                    }}
                    className="font-medium text-accent-dark underline underline-offset-2 hover:text-accent-hover"
                  >
                    réinitialisez les filtres
                  </button>
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Vous avez d&apos;autres questions ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Notre équipe est disponible pour répondre à toutes vos interrogations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
              <a
                href="tel:+33760554000"
                className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                Nous appeler
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

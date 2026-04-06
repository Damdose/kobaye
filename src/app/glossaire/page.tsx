'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MagnifyingGlass } from '@phosphor-icons/react';

type GlossaryEntry = {
  term: string;
  definition: string;
  category: string;
};

const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    term: 'Preuve sociale',
    definition:
      "Phénomène psychologique où les individus se fient aux actions et opinions des autres pour guider leurs propres décisions. Les avis clients, témoignages et notes sont les formes les plus courantes de preuve sociale en ligne.",
    category: 'Concepts',
  },
  {
    term: 'Avis authentique',
    definition:
      "Avis laissé par un utilisateur ayant réellement utilisé le produit ou service. Se distingue des faux avis par l'expérience vécue et la transparence sur le contexte (programme de test, achat vérifié, etc.).",
    category: 'Avis',
  },
  {
    term: 'Biais de réciprocité',
    definition:
      "Tendance naturelle à vouloir rendre la pareille lorsqu'on reçoit quelque chose. Dans le contexte du test produit, un utilisateur qui reçoit un accès gratuit est naturellement enclin à donner un retour positif — sans manipulation.",
    category: 'Concepts',
  },
  {
    term: 'Cold start (problème du)',
    definition:
      "Situation où une entreprise ou un produit nouvellement lancé n'a aucun avis en ligne, ce qui freine la confiance des prospects et donc les premières ventes. C'est un cercle vicieux que les opérations de test permettent de briser.",
    category: 'Business',
  },
  {
    term: 'Opération de test',
    definition:
      "Campagne organisée sur la plateforme où une entreprise offre l'accès à son produit/service à des testeurs qualifiés en échange de leur retour honnête. Chaque opération définit l'offre, le profil testeur idéal et les objectifs.",
    category: 'Plateforme',
  },
  {
    term: 'Testeur qualifié',
    definition:
      "Utilisateur inscrit sur la plateforme avec un profil vérifié, des centres d'intérêt renseignés et un historique de tests. Les testeurs sont matchés avec les opérations selon leur profil.",
    category: 'Plateforme',
  },
  {
    term: 'Feedback structuré',
    definition:
      "Retour d'expérience organisé selon un format prédéfini sur la plateforme. Permet aux entreprises d'obtenir des insights exploitables et comparables plutôt que des commentaires libres non structurés.",
    category: 'Plateforme',
  },
  {
    term: 'Feedback privé constructif',
    definition:
      "Retour négatif ou mitigé d'un testeur, canalisé vers la plateforme plutôt que publié en ligne. Permet à l'entreprise de s'améliorer sans impact sur sa réputation publique.",
    category: 'Plateforme',
  },
  {
    term: 'Mention de transparence',
    definition:
      "Indication dans un avis public que le test a été réalisé dans le cadre d'un programme de test. Obligatoire pour la conformité avec les règles Google, Trustpilot et le droit français.",
    category: 'Légal',
  },
  {
    term: 'Amazon Vine',
    definition:
      "Programme d'Amazon qui envoie des produits gratuits à des testeurs sélectionnés en échange d'avis honnêtes. Modèle de référence pour les programmes de test produit transparents et conformes.",
    category: 'Références',
  },
  {
    term: 'Bazaarvoice',
    definition:
      "Plateforme de gestion d'avis et de contenu généré par les utilisateurs (UGC). Propose des programmes de sampling et de test produit à grande échelle pour les marques.",
    category: 'Références',
  },
  {
    term: 'Taux de conversion',
    definition:
      "Pourcentage de visiteurs qui effectuent l'action souhaitée (achat, inscription, prise de contact). Les avis positifs authentiques augmentent significativement le taux de conversion.",
    category: 'Métriques',
  },
  {
    term: 'Note moyenne',
    definition:
      "Score moyen des avis publiés sur une plateforme (Google, Trustpilot, etc.). Une note supérieure à 4.0/5 est généralement considérée comme le seuil de confiance pour les consommateurs.",
    category: 'Métriques',
  },
  {
    term: 'Volume d\'avis',
    definition:
      "Nombre total d'avis publiés pour un produit ou une entreprise. Au-delà de la note, le volume d'avis est un facteur de confiance crucial : 10 avis à 4.5 étoiles sont moins convaincants que 100 avis à 4.3.",
    category: 'Métriques',
  },
  {
    term: 'Récence des avis',
    definition:
      "Fraîcheur des avis publiés. Les consommateurs et les algorithmes de Google privilégient les avis récents. Des avis vieux de plus de 6 mois perdent en impact.",
    category: 'Métriques',
  },
  {
    term: 'Marketplace B2B2C',
    definition:
      "Modèle de plateforme à deux faces qui connecte des entreprises (B2B) et des consommateurs (B2C). Siva fonctionne sur ce modèle en connectant des businesses avec des testeurs.",
    category: 'Business',
  },
  {
    term: 'Matching testeur',
    definition:
      "Algorithme de la plateforme qui associe les testeurs les plus pertinents à chaque opération en fonction de critères comme la localisation, les centres d'intérêt et le profil socio-démographique.",
    category: 'Plateforme',
  },
  {
    term: 'Profil testeur',
    definition:
      "Page personnelle du testeur sur la plateforme incluant ses centres d'intérêt, son historique de tests, ses badges et sa réputation. Un profil complet augmente les chances d'être sélectionné.",
    category: 'Plateforme',
  },
  {
    term: 'Réputation testeur',
    definition:
      "Score de confiance attribué à un testeur basé sur la qualité et la régularité de ses retours. Les testeurs avec une haute réputation accèdent aux opérations premium en priorité.",
    category: 'Plateforme',
  },
  {
    term: 'UGC (User Generated Content)',
    definition:
      "Contenu créé par les utilisateurs (avis, photos, vidéos, témoignages). Le UGC est considéré comme plus authentique et crédible que le contenu marketing produit par la marque elle-même.",
    category: 'Concepts',
  },
  {
    term: 'Social proof (preuve sociale)',
    definition:
      "Version anglaise de la preuve sociale. Terme marketing désignant l'ensemble des signaux qui montrent que d'autres personnes ont fait confiance à un produit ou service : avis, témoignages, nombre de clients, logos partenaires.",
    category: 'Concepts',
  },
  {
    term: 'Trustpilot',
    definition:
      "Plateforme d'avis en ligne indépendante permettant aux consommateurs d'évaluer les entreprises. Avec Google, c'est l'une des principales sources d'avis consultées avant un achat.",
    category: 'Références',
  },
  {
    term: 'Google Reviews',
    definition:
      "Système d'avis intégré à Google Business Profile. Les avis Google influencent directement le référencement local et sont visibles dans les résultats de recherche et sur Google Maps.",
    category: 'Références',
  },
  {
    term: 'Droit de la consommation (avis)',
    definition:
      "En France, la réglementation impose que les avis publiés soient authentiques et que tout lien commercial soit déclaré. Les programmes de test avec mention de transparence sont conformes à cette réglementation.",
    category: 'Légal',
  },
  {
    term: 'CGU Google (avis)',
    definition:
      "Conditions Générales d'Utilisation de Google concernant les avis. Google autorise les avis issus de programmes de test à condition qu'ils reflètent une expérience réelle et soient transparents sur le contexte.",
    category: 'Légal',
  },
];

const CATEGORIES = ['Tous', 'Concepts', 'Plateforme', 'Avis', 'Business', 'Métriques', 'Légal', 'Références'];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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

export default function GlossairePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = GLOSSARY_ENTRIES.filter((entry) => {
    const matchSearch =
      search === '' ||
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'Tous' || entry.category === activeCategory;
    const matchLetter = !activeLetter || entry.term[0].toUpperCase() === activeLetter;
    return matchSearch && matchCategory && matchLetter;
  }).sort((a, b) => a.term.localeCompare(b.term, 'fr'));

  const groupedByLetter = filtered.reduce<Record<string, GlossaryEntry[]>>((acc, entry) => {
    const letter = entry.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {});

  const availableLetters = new Set(
    GLOSSARY_ENTRIES.map((e) => e.term[0].toUpperCase())
  );

  return (
    <main>
      <section className="px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Ressources</p>
            <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Glossaire de la <span className="serif-accent">preuve sociale</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm text-warm-500 sm:text-body-lg">
              Tous les termes clés de la réputation en ligne et du test produit expliqués simplement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0.08}>
            <div className="relative mb-6">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveLetter(null);
                }}
                placeholder="Rechercher un terme…"
                className="w-full rounded-2xl border border-warm-200 bg-white py-3.5 pl-12 pr-4 text-sm text-warm-900 shadow-soft placeholder:text-warm-400 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mb-6 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-warm-900 text-white'
                      : 'border border-warm-200 bg-white text-warm-600 hover:border-warm-300 hover:text-warm-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mb-8 flex flex-wrap gap-1">
              {ALPHABET.map((letter) => {
                const isAvailable = availableLetters.has(letter);
                const isActive = activeLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => {
                      if (isAvailable) {
                        setActiveLetter(isActive ? null : letter);
                        setSearch('');
                      }
                    }}
                    disabled={!isAvailable}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-warm-900 text-white'
                        : isAvailable
                          ? 'border border-warm-200 bg-white text-warm-700 hover:border-warm-300 hover:bg-warm-50'
                          : 'text-warm-300 cursor-default'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
              {activeLetter && (
                <button
                  onClick={() => setActiveLetter(null)}
                  className="ml-2 rounded-lg px-3 py-1.5 text-sm font-medium text-warm-500 transition-colors hover:text-warm-900"
                >
                  Effacer
                </button>
              )}
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-warm-200 bg-white p-10 text-center shadow-soft">
                <p className="text-warm-500">Aucun terme trouvé pour cette recherche.</p>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-8">
              {Object.keys(groupedByLetter)
                .sort()
                .map((letter) => (
                  <Reveal key={letter}>
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm-900 text-lg font-bold text-white">
                          {letter}
                        </span>
                        <div className="h-px flex-1 bg-warm-200" />
                      </div>
                      <div className="space-y-3">
                        {groupedByLetter[letter].map((entry) => (
                          <div
                            key={entry.term}
                            className="group rounded-2xl border border-warm-200 bg-white p-5 shadow-soft transition-all hover:shadow-card sm:p-6"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-base font-medium text-warm-900 sm:text-lg">
                                {entry.term}
                              </h3>
                              <span className="shrink-0 rounded-full bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-600">
                                {entry.category}
                              </span>
                            </div>
                            <p className="mt-2.5 text-sm leading-relaxed text-warm-500">
                              {entry.definition}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          )}

          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-warm-400">
              {filtered.length} terme{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="rounded-t-[1.5rem] bg-warm-900 px-4 py-14 text-white sm:rounded-t-[2.5rem] sm:px-6 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Prêt à passer à <span className="serif-accent text-accent">l&apos;action</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm text-white/60 sm:text-body-lg">
              Lancez votre première opération de test et générez de la preuve sociale authentique.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Lancer une opération
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

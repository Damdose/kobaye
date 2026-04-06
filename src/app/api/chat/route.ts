import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Kobaye, une plateforme qui génère des avis authentiques grâce à de vraies expériences clients.

À PROPOS DE KOBAYE :
- Plateforme qui envoie de vrais utilisateurs tester votre produit ou service
- Les testeurs satisfaits laissent un avis public authentique, les insatisfaits font un retour privé constructif
- Services : Programme de testeurs (50, 100 ou 200 testeurs), feedback structuré, dashboard de suivi
- 100% conforme aux règles Google et au droit français (même principe qu'Amazon Vine)
- Contact : +33 7 60 55 40 00, contact@kobaye.fr
- Promesse : transparence totale, avis authentiques, pas d'engagement de durée

STATS CLÉS :
- 46% des recherches Google ont une intention locale
- Résultats visibles en 2-4 semaines (quick wins), résultats significatifs en 60-90 jours
- L'audit est 100% gratuit, sans engagement, sans carte bancaire

TON : Amical, professionnel, direct. Tu vouvoies le visiteur. Tu es enthousiaste mais pas agressif commercialement. Tu donnes des réponses concises (2-4 phrases max). Si la question porte sur un sujet hors SEO local/Google Business, redirige poliment vers le sujet.

OBJECTIF : Répondre aux questions des visiteurs sur les services Kobaye, le SEO local, Google Business Profile, et les orienter vers l'audit gratuit ou la prise de rendez-vous quand c'est pertinent.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = anthropic.messages.stream({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error('Chat stream error:', err);
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}

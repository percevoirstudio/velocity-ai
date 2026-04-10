'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
// 1. On importe le Videur (Clerk)
import { auth } from '@clerk/nextjs/server';
// 2. On importe notre Base de Données (Prisma)
import { prisma } from '../lib/prisma';

export async function genererDescription(produit: string) {
  try {
    // --- ETAPE A : VÉRIFICATION DE SÉCURITÉ ---
    const { userId } = await auth(); // On demande à Clerk qui clique sur le bouton
    
    if (!userId) {
      return { success: false, texte: "🔒 Vous devez être connecté pour utiliser l'IA !" };
    }

    // --- ETAPE B : GESTION DES CRÉDITS DANS LA BASE DE DONNÉES ---
    // On cherche l'utilisateur dans notre tableau
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // S'il n'existe pas encore (c'est sa première connexion), on le crée et on lui donne ses 3 crédits gratuits !
    if (!user) {
      user = await prisma.user.create({
        data: { id: userId, credits: 3 },
      });
    }

    // S'il a 0 crédit (ou moins), on le bloque net !
    if (user.credits <= 0) {
      return { success: false, texte: "💳 Vous n'avez plus de crédits ! Il est temps de passer à l'abonnement Premium." };
    }

    // --- ETAPE C : L'INTELLIGENCE ARTIFICIELLE ---
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Tu es un expert mondial en marketing e-commerce et copywriting. 
    Ton but est de rédiger une fiche produit ultra-vendeuse pour ce produit : "${produit}".
    
    Structure OBLIGATOIRE :
    1. 🎯 Une accroche punchy (1 phrase max).
    2. ✨ Un paragraphe descriptif qui fait rêver.
    3. 🔥 Une liste à puces des 3 avantages principaux.
    Donne le résultat direct.`;

    const result = await model.generateContent(prompt);

    // --- ETAPE D : ON FAIT PAYER LE CLIENT (ON LUI RETIRE 1 CRÉDIT) ---
    await prisma.user.update({
      where: { id: userId },
      data: { credits: user.credits - 1 },
    });

    // On renvoie la belle réponse à l'utilisateur
    return { success: true, texte: result.response.text() };
    
  } catch (error) {
    console.error("Erreur Backend:", error);
    return { success: false, texte: "⚠️ Oups, une erreur s'est produite." };
  }
}

// 🌟 LA FAMEUSE NOUVELLE FONCTION À RAJOUTER ICI :
export async function getCredits() {
  try {
    const { userId } = await auth();
    if (!userId) return null; // S'il n'est pas connecté, pas de crédits

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // S'il existe on donne son vrai solde, sinon on renvoie 3 (le défaut)
    return user ? user.credits : 3; 
  } catch (error) {
    console.error("Erreur lecture crédits:", error);
    return null;
  }
}
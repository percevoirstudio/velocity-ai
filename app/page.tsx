'use client';

import { useState, useEffect } from 'react';
import { genererDescription, getCredits } from './actions';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function Home() {
  const [produit, setProduit] = useState('');
  const [resultat, setResultat] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 🌟 La mémoire pour le compteur de crédits
  const [credits, setCredits] = useState<number | null>(null);

  // 🌟 Quand la page charge, on demande le solde au serveur
  useEffect(() => {
    const fetchCredits = async () => {
      const solde = await getCredits();
      if (solde !== null) setCredits(solde);
    };
    fetchCredits();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResultat(''); // On vide l'ancien résultat
    
    // On appelle notre Backend (actions.ts)
    const reponse = await genererDescription(produit);
    
    setResultat(reponse.texte);
    
    // 🌟 Si la génération a réussi, on retire 1 au compteur visuel !
    if (reponse.success && credits !== null) {
      setCredits(credits - 1);
    }
    
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden flex flex-col items-center">
      
      {/* 🎆 EFFETS DE LUMIÈRE (GLOW) EN ARRIÈRE-PLAN */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* 🧭 NAVBAR */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center z-10 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            V
          </div>
          <span className="font-semibold tracking-wide">Velocity AI</span>
        </div>
        
        {/* LA MAGIE CLERK OPÈRE ICI */}
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            {/* Ce qui s'affiche si l'utilisateur N'EST PAS connecté */}
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-white/70 hover:text-white transition">
                Connexion
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                S'inscrire
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            {/* Ce qui s'affiche si l'utilisateur EST connecté */}
            <div className="flex items-center gap-3">
              {/* 🌟 LE COMPTEUR DYNAMIQUE EST ICI */}
              <span className="text-sm text-orange-400 font-medium">
                {credits !== null ? `${credits} crédit(s) restant(s)` : 'Chargement...'}
              </span>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }} />
            </div>
          </Show>
        </div>
      </header>
      
      {/* 🚀 HERO SECTION */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center z-10">
        
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-orange-400 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md">
          ✨ Générateur E-commerce
        </div>
        
        <h1 className="text-5xl md:text-7xl font-medium text-center tracking-tight mb-6">
          Launch faster.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Convert better.</span>
        </h1>
        
        <p className="text-white/50 text-center max-w-xl mb-12 text-lg">
          L'IA qui rédige vos fiches produits à la perfection. Décrivez ce que vous vendez, nous créons le texte qui fait cliquer vos clients.
        </p>

        {/* 💻 LE LOGICIEL (GLASSMORPHISM CARD) */}
        <div className="w-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-1 shadow-2xl relative">
          
          {/* Ligne lumineuse en haut de la carte */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

          <div className="bg-[#0a0a0a]/80 rounded-[22px] p-6 sm:p-10">
            <label className="block text-sm font-medium text-white/80 mb-3 tracking-wide">
              Qu'est-ce que vous vendez aujourd'hui ?
            </label>
            
            <textarea
              className="w-full bg-black/50 border border-white/10 rounded-xl p-5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all resize-none shadow-inner"
              rows={4}
              placeholder="Ex: Une bougie artisanale senteur bois de santal, coulée à la main en France, cire 100% végétale, durée 40h..."
              value={produit}
              onChange={(e) => setProduit(e.target.value)}
            ></textarea>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/40">
                <i className="fa-solid fa-bolt text-orange-500 mr-1"></i> Optimisé pour le SEO
              </p>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || produit.trim() === ''}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <span className="animate-pulse">Génération...</span>
                ) : (
                  <>Générer le texte <span className="text-lg leading-none">→</span></>
                )}
              </button>
            </div>

            {/* ZONE DE RÉSULTAT */}
            {resultat && (
              <div className="mt-8 pt-8 border-t border-white/10 animate-fadeInUp">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                  <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest">Résultat généré</h3>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative">
                  <p className="text-white/80 whitespace-pre-wrap font-light leading-relaxed">
                    {resultat}
                  </p>
                  {/* Bouton copier (esthétique pour l'instant) */}
                  <button className="absolute top-4 right-4 text-white/40 hover:text-white transition">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </main>
  );
}
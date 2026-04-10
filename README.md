# ⚡ Velocity AI - Générateur de Fiches Produits E-commerce

Velocity AI est une application SaaS (Software as a Service) conçue pour aider les e-commerçants à générer des descriptions de produits ultra-vendeuses et optimisées pour le SEO grâce à l'Intelligence Artificielle.

## ✨ Fonctionnalités Principales

- **🤖 IA Générative** : Propulsé par Google Gemini (2.5 Flash) pour une rédaction de haute qualité (accroches, storytelling, liste d'avantages).
- **🔐 Authentification Sécurisée** : Connexion par Email et Google gérée via Clerk.
- **💳 Système de Crédits** : Un modèle économique intégré. Chaque utilisateur reçoit 3 crédits gratuits à l'inscription, décomptés en temps réel à chaque génération.
- **🎨 Interface Moderne** : Design "Glassmorphism" avec effets de lueur, 100% responsive, construit avec Tailwind CSS.

## 🛠️ Stack Technique (2026)

- **Frontend** : Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend** : Server Actions Next.js
- **Base de Données** : PostgreSQL hébergé sur Neon
- **ORM** : Prisma V7 (avec l'architecture Adapter-pg)
- **Authentification** : Clerk
- **IA** : API Google Generative AI

## 🚀 Installation en local

Si vous souhaitez faire tourner ce projet sur votre machine :

1. Clonez le dépôt :
\`\`\`bash
git clone https://github.com/percevoirstudio/velocity-ai.git
\`\`\`

2. Installez les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Configurez vos variables d'environnement en créant un fichier \`.env.local\` :
\`\`\`env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=votre_cle_clerk
CLERK_SECRET_KEY=votre_secret_clerk
GEMINI_API_KEY=votre_cle_gemini
DATABASE_URL="votre_lien_neon_postgresql"
\`\`\`

4. Synchronisez la base de données :
\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

5. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`
L'application sera disponible sur `http://localhost:3000`.

---
*Projet réalisé dans le cadre de la construction d'un portfolio technique.*
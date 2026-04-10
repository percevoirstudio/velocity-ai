import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// On définit quelles pages sont publiques (accessibles sans être connecté)
// Ici, on dit que la page d'accueil ('/') est publique pour attirer les clients !
const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Ignore les fichiers système Next.js et les images pour ne pas les bloquer
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Surveille toujours les routes API
    '/(api|trpc)(.*)',
  ],
};
import { defineConfig } from '@prisma/config'

export default defineConfig({
  // On lui donne l'URL de la base de données de manière explicite
  datasource: {
    url:"postgresql://neondb_owner:npg_tHILrWOiMg16@ep-dawn-heart-alqju225-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
})
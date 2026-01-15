# Deployment Handleiding - Klant in Beeld

## Snelste Optie: Vercel (Gratis)

### Stap 1: GitHub Repository
1. Push je code naar GitHub (als je dat nog niet hebt gedaan)
2. Zorg dat `.env` NIET gecommit wordt (staat al in .gitignore)

### Stap 2: Vercel Account
1. Ga naar https://vercel.com
2. Log in met je GitHub account
3. Klik "Add New Project"
4. Selecteer je repository

### Stap 3: Environment Variables instellen
In Vercel, voeg deze variabelen toe onder "Environment Variables":

| Naam | Waarde |
|------|--------|
| `VITE_SUPABASE_URL` | `https://itgrssnozolvvsdgyfkr.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (je anon key uit .env) |

### Stap 4: Deploy
1. Klik "Deploy"
2. Wacht tot de build klaar is
3. Je krijgt een URL zoals: `https://klant-in-beeld.vercel.app`

---

## Supabase Productie Checklist

### Authentication Settings
Ga naar Supabase Dashboard > Authentication > URL Configuration:

1. **Site URL**: Zet dit naar je Vercel URL (bijv. `https://klant-in-beeld.vercel.app`)
2. **Redirect URLs**: Voeg toe:
   - `https://klant-in-beeld.vercel.app`
   - `https://klant-in-beeld.vercel.app/reset-password`

### Email Templates (optioneel)
Ga naar Authentication > Email Templates om de emails aan te passen:
- Confirmation email
- Magic link email
- Password reset email

### RLS Policies
Zorg dat deze SQL is uitgevoerd in Supabase SQL Editor:
- `supabase/rls-policies.sql` (alle tabellen beveiligd)

---

## Alternatief: Netlify

1. Ga naar https://netlify.com
2. "Add new site" > "Import an existing project"
3. Selecteer GitHub repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Environment variables toevoegen (zelfde als Vercel)

---

## Na Deployment

### Testen
1. Open de productie URL
2. Test registratie met een nieuw email
3. Test login
4. Test magic link
5. Test wachtwoord reset

### Custom Domein (optioneel)
Zowel Vercel als Netlify ondersteunen custom domeinen:
1. Ga naar project settings > Domains
2. Voeg je domein toe
3. Configureer DNS records

---

## Troubleshooting

### "Database niet geconfigureerd" error
- Check of environment variables correct zijn ingesteld
- Vercel: Project Settings > Environment Variables

### Emails komen niet aan
- Check Supabase Authentication > Email Templates
- Controleer spam folder
- Supabase free tier: max 4 emails/uur

### Login werkt niet na deploy
- Check Supabase > Authentication > URL Configuration
- Site URL moet exact matchen met je productie URL

---

## Environment Variables Overzicht

| Variabele | Verplicht | Beschrijving |
|-----------|-----------|--------------|
| `VITE_SUPABASE_URL` | Ja | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Ja | Supabase anonymous key |
| `VITE_CLAUDE_API_KEY` | Nee | Voor AI features (optioneel) |

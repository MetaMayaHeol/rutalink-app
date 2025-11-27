# 🚀 Guide de Démarrage Rapide - RutaLink

## Étape 1: Configuration Supabase (5 minutes)

### 1.1 Créer un compte Supabase
1. Va sur [supabase.com](https://supabase.com)
2. Clique sur "Start your project"
3. Connecte-toi avec GitHub ou email

### 1.2 Créer un nouveau projet
1. Clique sur "New Project"
2. Choisis un nom: `rutalink-dev`
3. Choisis un mot de passe de base de données (garde-le en sécurité!)
4. Choisis une région proche (ex: South America pour le Mexique)
5. Clique sur "Create new project"
6. ⏳ Attends 2-3 minutes que le projet soit prêt

### 1.3 Récupérer les clés API
1. Dans ton projet, va dans **Settings** (icône ⚙️ en bas à gauche)
2. Clique sur **API**
3. Tu verras:
   - **Project URL** → copie-le
   - **anon/public key** → copie-le
   - **service_role key** → copie-le (clique sur "Reveal" d'abord)

### 1.4 Créer la base de données
1. Va dans **SQL Editor** (icône 📝 dans le menu de gauche)
2. Clique sur "+ New query"
3. Copie tout le contenu du fichier `supabase/schema.sql`
4. Colle-le dans l'éditeur

## Étape 2: Configuration Locale (2 minutes)

### 2.1 Installer les dépendances
```bash
cd rutalink-app
npm install
```

### 2.2 Configurer les variables d'environnement
1. Copie le fichier d'exemple:
   ```bash
   cp .env.example .env.local
   ```

2. Ouvre `.env.local` et remplace les valeurs:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ta_anon_key_ici
   SUPABASE_SERVICE_ROLE_KEY=ta_service_role_key_ici
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Étape 3: Lancer l'application (1 minute)

```bash
npm run dev
```

Ouvre ton navigateur sur [http://localhost:3000](http://localhost:3000)

## ✅ Vérification

Tu devrais voir:
1. ✅ La landing page de RutaLink
2. ✅ Pouvoir cliquer sur "Comenzar gratis"
3. ✅ Voir la page de login
4. ✅ Entrer ton email et recevoir un "magic link"
5. ✅ Cliquer sur le lien dans l'email
6. ✅ Être redirigé vers le dashboard

## 🐛 Problèmes Courants

### Erreur: "Invalid API key"
- ✅ Vérifie que tu as bien copié les clés depuis Supabase
- ✅ Vérifie qu'il n'y a pas d'espaces avant/après les clés
- ✅ Redémarre le serveur (`Ctrl+C` puis `npm run dev`)

### Erreur: "relation 'users' does not exist"
- ✅ Vérifie que tu as bien exécuté le script SQL dans Supabase
- ✅ Va dans **Database** > **Tables** pour vérifier que les tables existent

### Je ne reçois pas l'email de Magic Link
- ✅ Vérifie tes spams
- ✅ Attends 1-2 minutes (peut être lent)
- ✅ Va dans **Authentication** > **Users** dans Supabase pour voir si l'utilisateur a été créé
- ✅ En développement, tu peux aussi copier le lien depuis les logs Supabase

### Le dashboard est vide
- ✅ C'est normal ! Tu n'as pas encore créé de services
- ✅ Clique sur "Agregar un servicio" pour commencer

## 📚 Prochaines Étapes

Maintenant que tout fonctionne, tu peux:

1. **Créer ta page de profil** → `/dashboard/profile` (à implémenter)
2. **Ajouter des services** → `/dashboard/services/new` (à implémenter)
3. **Configurer tes disponibilités** → `/dashboard/availability` (à implémenter)
4. **Voir ta page publique** → `/g/ton-slug` (à implémenter)

## 🆘 Besoin d'aide?

- 📖 Consulte le [README.md](./README.md) pour plus de détails
- 🐛 Vérifie les logs dans la console du navigateur (F12)
- 📊 Vérifie les logs dans Supabase (**Logs** dans le menu)

---

**Temps total estimé**: ~10 minutes ⏱️

Bon développement! 🚀

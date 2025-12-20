# 🚀 Idy Portfolio - Next.js + GSAP

Un portfolio moderne et animé construit avec Next.js, Tailwind CSS et GSAP.

## ✨ Features

- **Loader animé** avec progression
- **Curseur personnalisé** qui réagit aux éléments interactifs
- **Transitions de page** avec effet slide-in/slide-out
- **Animations GSAP avancées** sur chaque section
- **Scroll-triggered animations** fluides
- **Marquee dynamique** avec accélération au scroll
- **Design responsive** mobile-first
- **Dark mode** élégant avec accents néon

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **GSAP** - Animations professionnelles
- **ScrollTrigger** - Animations au scroll

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/idy-portfolio.git

# Installer les dépendances
cd idy-portfolio
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📁 Structure

```
src/
├── app/
│   ├── globals.css      # Styles globaux + Tailwind
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
├── components/
│   ├── CustomCursor.tsx # Curseur personnalisé
│   ├── Loader.tsx       # Écran de chargement
│   ├── PageTransition.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
```

## 🎨 Personnalisation

### Couleurs
Modifie les variables CSS dans `globals.css`:
```css
:root {
  --accent: #00ff88;
  --accent-secondary: #00ccff;
}
```

### Contenu
- Modifie tes infos dans chaque composant
- Ajoute tes vrais projets dans `Projects.tsx`
- Met à jour les liens sociaux dans `Contact.tsx`

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload du dossier .next
```

## 📝 À faire

- [ ] Ajouter ta photo de profil
- [ ] Mettre à jour l'email de contact
- [ ] Ajouter les vrais liens GitHub
- [ ] Personnaliser les projets
- [ ] Ajouter un formulaire de contact

## 📄 License

MIT - Libre d'utilisation

---

Créé avec ❤️ par Idy

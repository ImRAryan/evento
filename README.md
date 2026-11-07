# Evento — Event Management Website (React + Tailwind CSS)

Responsive event management site: browse upcoming events, search and filter, view details and register.

**Live site:** _add your Vercel / Netlify / GitHub Pages link_
**Repository:** _add your GitHub link_

## Tech stack
React 18, Vite, Tailwind CSS v4, JavaScript (ES modules), Git/GitHub.

## Features
- Hero section with live countdown to the next event
- Event cards (image, date, venue, price, description), search and category filters
- Event details modal with countdown and registration form
- JavaScript validation: name, email, 10-digit Indian mobile number, event
- Confirmation screen with reference code
- Bonus: dark/light mode, countdown timers, animations, Local Storage registrations with cancel and duplicate check
- Fully responsive and keyboard accessible

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
```
src/
  App.jsx               page layout, filters, state
  data.js               events, helpers, validation rules
  hooks.js              useNow (timers), useLocalStorage
  components/           Navbar, Hero, EventCard, EventModal, Countdown
  index.css             Tailwind import, theme colours, animations
```

## Deploy
- **Vercel / Netlify:** import the repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.js`, run `npm run build`, publish `dist`.

## Storage
Registrations: `localStorage['evento-registrations']`. Theme: `localStorage['evento-theme']`.

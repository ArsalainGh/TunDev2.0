# TunDev

**The free resource hub for Tunisian IT students.** Curated courses, tools, career roadmaps, local communities and real-world guides — everything a Tunisian CS student needs, in one place, without paywalls or fluff.

Built with plain HTML, CSS, JavaScript and Bootstrap 5. No frameworks, no build tools, no npm — just open it and it works.

---

## Table of Contents

- [Features](#features)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Fully responsive** — mobile-first Bootstrap grid, hamburger navigation, layouts adapt from phone to widescreen
- **Dark / Light mode** — one-click toggle, preference saved to `localStorage`, respects OS preference on first visit
- **Live filtering & search** — 36 curated resources filterable by 9 categories and searchable by name, description and keywords
- **Animated stat counters** — trigger on scroll via `IntersectionObserver`
- **Scroll-reveal animations** — subtle, staggered, and disabled automatically for users who prefer reduced motion
- **Interactive guides** — PFE survival guide in a Bootstrap accordion, 8 full articles in expandable cards
- **Persistent design system** — shared CSS variables (Tunisian red `#E63946`, deep blue `#1D3557`, warm orange `#F4A261`) shared across all pages
- **Zero emojis in the UI** — professional SVG icons throughout (Lucide + Bootstrap Icons), including an inline SVG Tunisian flag and favicon

## Pages

| Page | File | What's inside |
|---|---|---|
| **Home** | `index.html` | Full-viewport hero with animated orbs & tech marquee, animated stat counters, explore cards, "Why TunDev", suggest-a-resource CTA banner |
| **Resources** | `resources.html` | 36 vetted resources across Books, YouTube, Platforms, Coding Tools, Design, Resume, Presentation, Planning and AI Tools — with filter pills, live search, language/level/cost badges and external links |
| **Roadmaps** | `roadmaps.html` | 7 career paths (Frontend, Backend, AI/Data Science, Cybersecurity, DevOps, Mobile, Game Dev) with key technologies, real roadmap.sh links, and a side-by-side comparison table |
| **Tunisia Corner** | `tunisia.html` | Community cards (Discord, Reddit, Facebook) in brand colors, 8 Tunisian tech influencer profiles, and 6 student clubs (GDG, IEEE, MLSA, WTM, Securinets, TCPC) |
| **Tips & Guides** | `tips.html` | The featured **PFE Survival Guide** (6-part accordion) plus 8 full-length articles on university, internships, LinkedIn, freelancing payments and studying abroad |

## Tech Stack

- **HTML5** — semantic markup, accessible labels, accurate `target="_blank" rel="noopener noreferrer"` on external links only
- **CSS3** — custom design system in `css/style.css` (CSS variables for instant theming)
- **JavaScript (ES6+)** — all logic in `js/main.js`, feature-guarded so one file safely serves every page
- **[Bootstrap 5.3](https://getbootstrap.com/)** — grid, cards, navbar, accordion, collapse, badges (via CDN)
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** — brand/social icons (via CDN)
- **[Lucide](https://lucide.dev/)** — general UI icons (via CDN)
- **Google Fonts** — Poppins (display) + Inter (body)

No frameworks. No bundlers. No dependencies to install.

## Project Structure

```
tundev/
├── index.html          # Home — hero, stats, explore, why, CTA
├── resources.html      # Resource Vault — 36 cards, filters + search
├── roadmaps.html       # 7 career paths + comparison table
├── tunisia.html        # Communities, influencers, clubs
├── tips.html           # Featured PFE guide + 8 articles
├── css/
│   └── style.css       # Shared design system (themes, components, animations)
├── js/
│   └── main.js         # Shared logic (theme, filters, search, counters, reveals)
└── README.md
```

## Getting Started

No installation required. Either:

1. **Open directly** — double-click `index.html` in any modern browser, or
2. **Serve locally** (recommended, so the pages behave like production):

```bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

Any static host works out of the box:

- **GitHub Pages** — push the repo, then Settings → Pages → deploy from `main` branch
- **Netlify / Vercel** — drag-and-drop the folder, or connect the repository (no build command needed)
- **Cloudflare Pages** — same: no build step, output directory is the project root

## Customization

### Change the color scheme

All colors live as CSS variables at the top of `css/style.css`:

```css
:root {
  --primary: #E63946;   /* Tunisian red  */
  --secondary: #1D3557; /* deep blue     */
  --accent: #F4A261;    /* warm orange   */
  /* ...plus --bg, --surface, --text, --border for both themes */
}
```

Edit them once — every page, badge, button and gradient updates instantly.

### Add a new resource

1. Open `resources.html`.
2. Copy any `resource-item` card and update the content.
3. Set `data-category` to one of:
   `books` · `youtube` · `platforms` · `coding` · `design` · `resume` · `presentation` · `planning` · `ai`
4. Add extra keywords to `data-search` so the search bar can find it.
5. Bump the `resTotal` number in the page header.

Filtering, search and the live counter pick the new card up automatically.

### Add a guide / article

Copy an article card in `tips.html`, set `data-tcat` to `university`, `career`, `technical`, `pfe` or `freelancing`, give its collapse a unique `id` (and matching `data-bs-target`), and it joins the filter system.

### The single script, explained

`js/main.js` is shared by all pages. Each feature checks that its elements exist before running (`if (document.getElementById('resFilters')) { ... }`), so the counters only run on Home, the search only on Resources, the guide filters only on Tips — safely, with no console errors.

## Contributing

Found a resource, creator or guide worth adding?

- Use the **Suggest a Resource** Google Form (linked in the navbar-adjacent CTA banner and the footer), or
- Open an issue / pull request on [GitHub](https://github.com/TunDev)

Content guidelines: free or student-tier first, tested by a real student, and useful in the Tunisian context (English, French or Arabic all welcome).

## License

MIT — free to use, remix and learn from. Keep the credit line if you fork it.

---

<p align="center">Made with ❤️ in Tunisia · © 2026 TunDev — For students, by students</p>

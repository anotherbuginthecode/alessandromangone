# Analisi dei siti di riferimento

Data analisi: 19 ottobre 2026

## 1. elenagonci.com (navigazione e concept)

**Tecnologia e stile**
- Next.js + Tailwind CSS.
- Font: Bricolage Grotesque (testo), Clepto (display).
- Palette: neutri chiari (`#fafafa`, `#f5f5f5`, `#e5e7eb`), blu di sistema macOS (`#0069d9`, `#3E8FE4`, `#57A4F0`), giallo accento (`#FFB800`), pulsanti "semaforo" delle finestre (`#ff5f57`, `#febc2e`, `#28c840`).

**Concept: la home è un desktop macOS**
- Cartelle sul desktop = aree e progetti (QA Agent Loop, Eleyyva, Engineering, Product Mgmt, Customer Success). Ogni cartella apre un case study su `/work/[slug]`.
- Widget personali: player musicale con la canzone preferita, selfie con il cane, meteo della sua città.
- Dock di app usato come barra contatti: "Ask ChatGPT about me", LinkedIn, Gmail, X (più Notion, Claude, Terminal, Calendar).
- Headline: "I'm Elena. I lead product at Arrive." più una riga su cosa fa ogni giorno.
- Badge premi (Awwwards, CSS Design Awards).

**Navigazione**
- Nessun menu classico: si naviga cliccando le cartelle e scorrendo la pagina.
- Ancore: `#achievements`, `#pillar-stack`, `#about`, `#contact`.

**Sezioni della home, in ordine**
1. Desktop (hero).
2. Achievements: 5 voci brevi (titolo + una riga).
3. In the press: carosello infinito di articoli con logo della testata.
4. Pillar stack: "Superpower nº1...nº4" (AI Systems, Product, Engineering, Customer Success). Ogni pilastro ha un titolo-affermazione, un paragrafo, il link al case study e 3 metriche concrete (es. "418 PRs merged to production at 87% acceptance").
5. Venture studio & portfolio work: lista compatta dei progetti passati (nome + una riga), 2019-2024.
6. Playground: galleria personale ("random stuff I've done and things I like").
7. `about-me.txt`: finestra a forma di file di testo con **Then / Now / The future** (l'ultima voce è ironica e si apre con un pulsante).
8. Footer: firma, claim ironico ("A Supersaiyan version of a PM"), link Email, LinkedIn, X, Book a meeting, CV, premi.

**Case study (`/work/[slug]`)**
- Formato conversazionale con due modalità:
  - "Chat through it": la storia si svela messaggio per messaggio, si possono fare domande; le risposte live usano solo fatti presenti sul sito.
  - "Read the full case study": tutta la conversazione caricata come un articolo.

**Tono**: prima persona, diretto, numeri precisi, ironia dosata.

## 2. jacopomarcolini.com (storytelling)

**Tecnologia e stile**
- Next.js + Tailwind CSS.
- Font: Fraunces (serif, titoli), Inter (testo), JetBrains Mono (dettagli).
- Palette "carta calda": paper `#f5f2ee`, ink `#1a1a18`, accento `#e84b2a`.

**Navigazione**: barra con nome a sinistra e pill ad ancora (Philosophy, Projects, Skills, Contact).

**Sezioni della home**
1. Hero: ruolo ("Deployment Strategist | Product Design Lead") e headline ("I design digital products and amazing experiences.").
2. Philosophy: 4 pilastri (Product Design, Team Leadership, AI Enablement, Business & Growth), ognuno con una frase e un numero ("da 3 a 30 persone", "budget fino a ~1M EUR", "400+ ore di training per 600+ persone").
3. Projects: carosello di card (anno, immagine, tag, titolo, una riga) verso `/case-studies/[slug]`.
4. Skills: chip raggruppati per pilastro, chiusura con "7+ years of experience".
5. Contact: "Let's build something good." + email, LinkedIn, GitHub, città e disponibilità a viaggiare.
6. SEO footnote: paragrafo a scomparsa scritto per i motori di ricerca, con una battuta rivolta agli agenti AI.

**Arco narrativo del case study (esempio: Matcha)**
1. Header: tag, anno, titolo, una riga di descrizione, ruolo, link esterni.
2. Insight: il problema come affermazione ("Real dates, not endless chats").
3. Sfida: "cosa serviva partendo da zero", lista con frecce.
4. Processo: "From naming to launch", sotto-blocchi per area (brand, core flow, onboarding, compliance, partner, metriche).
5. Approfondimenti speciali (content engine con AI, trailer di lancio).
6. Chiusura: sintesi che ricollega tutto ("Getting people off their phones").

Regola chiave: **i titoli sono affermazioni, non etichette**.

**Progetti nel suo portfolio**: Matcha (2026, Co-founder CXO & CMO), AI Training Program (2026), Spendscape (2025), Marquee (2025), Paywall Design System (2024), Design Journey (2023), Domus (2022), Algorithmic Tokens (2022), Bloom (2021).

## 3. Cosa prendere per il tuo sito

**Da Elena**
- Home "desktop" interattiva come firma visiva.
- Cartelle che aprono i case study.
- Pilastri "superpower" con 3 metriche ciascuno.
- `about-me` con Then / Now / The future.
- Footer con più CTA (email, LinkedIn, call, CV).

**Da Jacopo**
- Arco narrativo dei case study (insight, sfida, processo, chiusura).
- Titoli-affermazione.
- Pilastri con un numero forte ciascuno.
- Skills raggruppate.
- Footnote SEO.

**Adattamento a Tech Lead / EM / CTO**
- Metafora desktop "da engineer": cartelle-progetto, widget terminale, `about-me.md`, `git log` come timeline della carriera.
- Pilastri (da definire): Engineering Leadership, Architecture & Delivery, Hiring & Team Building, AI & Platform.
- Nei case study, una sezione dedicata al ruolo di leader: dimensione del team, decisioni architetturali, trade-off, metriche (DORA, uptime, time-to-market).
- Blog: assente in entrambi i riferimenti, va progettato da zero.

## 4. Sitemap proposta

```
/                 Home (desktop + sezioni)
/work             Indice case study
/work/[slug]      Case study
/blog             Indice articoli
/blog/[slug]      Articolo
```

About e contatti restano sezioni della home con ancore (`#about`, `#contact`), come nei due riferimenti.

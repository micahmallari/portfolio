import { useState } from "react";

/* ─── DESIGN TOKENS ──────────────────────────────────────────────
   Palette:
     cream-light  #FBFCEE   page background
     cream-mid    #FEFACD   sidebar / card surface
     cream-warm   #F7EBAF   accent / hover
     blue         #3A7DC1   links, tags, highlights

   Typography:
     Display      Neulis Alt  (swap @font-face below when self-hosting)
     Body         Neulis

   NOTE: Neulis is a paid font. The @import below points to a Google
   Fonts fallback (DM Sans + DM Serif Display). Replace the two
   @import lines and the font-family declarations once you have
   your Neulis files.
──────────────────────────────────────────────────────────────── */

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500&display=swap');
  @font-face {
    font-family: 'Neulis Alt';
    src: url('/fonts/NeulisAlt-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neulis Alt';
    src: url('/fonts/NeulisAlt-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neulis Alt';
    src: url('/fonts/NeulisAlt-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neulis';
    src: url('/fonts/Neulis-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neulis';
    src: url('/fonts/Neulis-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neulis';
    src: url('/fonts/Neulis-SemiBold.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neulis';
    src: url('/fonts/Neulis-Italic.otf') format('opentype');
    font-weight: 400;
    font-style: italic;
  }
  :root {
    --font-display: 'Neulis', serif;
    --font-body:    'DM Sans', sans-serif;

    --c-bg:       #f9faef;
    --c-surface:  #FEFACD;
    --c-accent:   #F7EBAF;
    --c-blue:     #2c5282;
    --c-blue-dim: rgba(44,82,130,0.12);
    --c-text:     #1a1a18;
    --c-muted:    #6b6b60;
    --c-border:   rgba(44,82,130,0.18);
    --c-divider:  rgba(26,26,24,0.10);

    --radius-sm:  6px;
    --radius-md:  10px;
    --radius-lg:  14px;
    --sidebar-w:  320px;
    --transition: 180ms ease;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--c-bg);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
    color: var(--c-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  /* ── LAYOUT ── */
  .layout {
    display: grid;
    grid-template-columns: var(--sidebar-w) 1fr;
    min-height: 100vh;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 24px;
    gap: 48px;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 60px 16px 60px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 0;
  }

  .sidebar-photo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: var(--c-accent);
    border: 1.5px solid var(--c-border);
    margin-bottom: 32px;
    margin-left: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--c-blue);
    flex-shrink: 0;
    overflow: hidden;
  }

  .sidebar-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sidebar-name {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 500;
    color: var(--c-text);
    margin-bottom: 4px;
    text-decoration: underline wavy var(--c-blue);
  text-decoration-thickness: 1.5px;
  text-underline-offset: 5px;
  }

  .sidebar-role {
    font-size: 13px;
    letter-spacing: 0.07em;
    color: var(--c-muted);
    text-transform: uppercase;
    margin-bottom: 16px;
    font-family: var(--font-body);
    font-weight: 500;
  }

  .sidebar-tagline {
    font-size: 15px;
    color: var(--c-muted);
    line-height: 1.6;
    margin-bottom: 36px;
    font-style: italic;
  }

  .sidebar-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
    width: 100%;
    text-align: left;
  }

  .sidebar-link {
    font-size: 14px;
    color: var(--c-muted);
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: color var(--transition);
  }

  .sidebar-link:hover { color: var(--c-blue); }

  .sidebar-link svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── MAIN ── */
  .main {
    padding: 48px 0 80px;
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-muted);
    margin-bottom: 14px;
    font-family: var(--font-body);
    font-weight: 500;
  }

  .section + .section { margin-top: 44px; }

  /* ── WORK CARDS ── */
  .work-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .work-card {
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    padding: 14px 16px;
    cursor: pointer;
    text-align: left;
    transition: background var(--transition);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    width: 100%;
  }

  .work-card-image {
    width: 120px;
    height: 120px;
    border-radius: var(--radius-md);
    background: var(--c-surface);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--c-muted);
    overflow: hidden;
  }

  .work-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .work-card-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--c-blue-dim);
    color: var(--c-muted);
    font-size: 11px;
  }

  .work-card:hover {
    background: var(--c-surface);
  }

  .work-card-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--c-text);
    margin-bottom: 3px;
    font-family: var(--font-body);
  }

  .work-card-sub {
    font-size: 14px;
    color: var(--c-muted);
    margin-bottom: 8px;
    line-height: 1.5;
    font-family: var(--font-body);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .tag {
    font-size: 10px;
    letter-spacing: 0.04em;
    padding: 2px 9px;
    border-radius: 99px;
    background: var(--c-blue-dim);
    color: var(--c-blue);
    font-weight: 500;
    font-family: var(--font-body);
  }

  .work-card-arrow {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--c-muted);
    margin-top: 2px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform var(--transition), color var(--transition);
  }

  .work-card:hover .work-card-arrow {
    transform: translateX(3px);
    color: var(--c-blue);
  }

  /* ── EXPERIENCE CARD ── */
 .exp-card {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 0 20px;
  text-align: left;        /* everything flush left */
}

/* the dateline — sits in the left column */
.exp-date {
  font-size: 11px;
  color: var(--c-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding-top: 3px;
  line-height: 1.4;
  text-align: right;               /* flush right toward the content */
}

.exp-company {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  margin-bottom: 3px;
}

.exp-meta {
  font-size: 12px;
  color: var(--c-muted);
  margin-bottom: 8px;
}

.exp-desc {
  font-size: 14px;
  color: var(--c-text);
  line-height: 1.75;
}

  /* ── CASE STUDY PAGE ── */
  .cs-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--c-muted);
    cursor: pointer;
    margin-bottom: 40px;
    transition: color var(--transition);
    background: none;
    border: none;
    padding: 0;
  }

  .cs-back:hover { color: var(--c-blue); }

  .cs-back svg {
    width: 14px; height: 14px;
    stroke: currentColor; fill: none;
    stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
  }

  .cs-eyebrow {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-blue);
    margin-bottom: 10px;
  }

  .cs-title {
    font-family: var(--font-display);
    font-size: 30px;
    font-weight: 400;
    line-height: 1.25;
    color: var(--c-text);
    margin-bottom: 12px;
    max-width: 520px;
  }

  .cs-intro {
    font-size: 16px;
    color: var(--c-muted);
    line-height: 1.75;
    max-width: 500px;
    margin-bottom: 32px;
  }

  .cs-image {
    width: 100%;
    max-width: 520px;
    height: 300px;
    border-radius: var(--radius-lg);
    background: var(--c-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    overflow: hidden;
  }

  .cs-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cs-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--c-blue-dim);
    color: var(--c-muted);
    font-size: 14px;
  }

  .cs-meta-row {
    display: flex;
    gap: 32px;
    padding: 18px 0;
    margin-bottom: 40px;
  }

  .cs-meta-item { }
  .cs-meta-label {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--c-muted);
    margin-bottom: 3px;
    font-family: var(--font-body);
    font-weight: 500;
  }
  .cs-meta-value {
    font-size: 13px;
    font-weight: 500;
    color: var(--c-text);
  }

  .cs-body { max-width: 520px; }

  .cs-section { margin-bottom: 36px; }

  .cs-section-heading {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--c-blue);
    margin-bottom: 10px;
    font-family: var(--font-body);
    font-weight: 500;
  }

  .cs-section-text {
    font-size: 16px;
    color: var(--c-text);
    line-height: 1.8;
  }

  .cs-section-text + .cs-section-text {
    margin-top: 12px;
  }

  .cs-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .cs-skill {
    font-size: 11px;
    padding: 4px 11px;
    border-radius: 99px;
    border: 0.5px solid var(--c-border);
    color: var(--c-muted);
    background: var(--c-surface);
  }

  .cs-callout {
    background: var(--c-surface);
    border-left: 2px solid var(--c-blue);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    padding: 14px 18px;
    font-size: 13px;
    color: var(--c-muted);
    line-height: 1.7;
    font-style: italic;
    margin: 24px 0;
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .layout {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 0;
    }
    .sidebar {
      position: static;
      height: auto;
      border-right: none;
      padding: 32px 0 24px;
      padding-right: 0;
    }
    .sidebar-links { flex-direction: row; flex-wrap: wrap; margin-top: 16px; gap: 14px; }
    .main { padding: 32px 0 60px; }
    .cs-title { font-size: 24px; }
    .cs-meta-row { flex-wrap: wrap; gap: 18px; }
  }
`;

/* ─── DATA ──────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "technovation",
    title: "Technovation Society Website",
    sub: "End-to-end UI/UX leadership",
    image: "/projects/technovation.png",
    tags: ["UI/UX", "Design Systems", "Leadership"],
    eyebrow: "UI/UX · Design Systems",
    // Redirect this card to the live site instead of an internal case study page
    externalUrl: "https://usttechsoc.org",
    // meta: [
    //   { label: "Role", value: "UI/UX Director" },
    //   { label: "Team", value: "9 designers + dev team" },
    //   { label: "Year", value: "2025–2026" },
    //   { label: "Output", value: "usttechsoc.org" },
    // ],
    meta: [],
    intro:
      "When I became UI/UX Director, the organization had no visual identity, no shared design language, and no process for how design decisions got made. Nine designers were working in isolation — every page looked different, and polished Figma files kept breaking in development.",
    sections: [
      {
        heading: "Situation",
        text: "The surface problem was 'we need a website.' The real problem was structural — designs broke during handoff because there was nothing to be consistent with. There was no single source of truth.",
      },
      {
        heading: "Thinking",
        text: "Before opening Figma, I talked to officers, developers, and past members who'd been through previous design attempts. The pattern was consistent. That conversation made clear that the design system wasn't a nice-to-have — it was the prerequisite for anything else working.",
      },
      {
        heading: "Making",
        text: "I built a Figma design system from scratch — component libraries, typography and color tokens, spacing guidelines, interaction states. Alongside it, I restructured how design reviews worked: shifting feedback from 'I don't like this' to 'this doesn't align with the guidelines.' I joined developers' planning sessions throughout to eliminate handoff friction early.",
      },
      {
        heading: "Outcome",
        text: "The website is live at usttechsoc.org. The design system remains in active use by the team. What I'm most proud of isn't the visual output — it's that the system outlasted my direct involvement.",
      },
    ],
    reflection:
      "Designing a website is maybe 40% of the job. The other 60% is building the conditions where good design can happen consistently. The work that doesn't show up in a Figma file is often the work that matters most.",
    skills: [
      "Figma",
      "Component libraries",
      "Design tokens",
      "Design systems",
      "SEO",
      "Team leadership",
    ],
  },
  {
    id: "airquality",
    title:
      "Image-Based Air Quality Forecasting Utilizing an Efficient-CapsNet-LSTM-LightGBM Hybrid Model: Exploiting Temporal and Spatial Features from High-Resolution Images and Environmental Data",
    sub: "Undergraduate thesis (Hybrid Deep Learning model)",
    image: "/projects/airquality.png",
    tags: ["ML", "Data Science", "Research"],
    eyebrow: "ML · Data Science",
    // meta: [
    //   { label: "Role", value: "ML Engineer & Researcher" },
    //   { label: "Team", value: "4 researchers (UST College of IT)" },
    //   { label: "Type", value: "Undergraduate thesis" },
    //   { label: "Year", value: "2025–2026" },
    //   { label: "Model", value: "CapsNet + LSTM + LightGBM" },
    // ],
    meta: [],
    intro:
      "Air quality shapes millions of daily decisions. Most forecasting systems depend entirely on sensor networks, which are expensive to scale. Our thesis started from a different question: what if you could extract meaningful air quality signals from images? Working alongside three researchers at UST, we explored whether a hybrid model combining spatial features from images and temporal environmental data could produce reliable, real-world-useful forecasts.",
    sections: [
      {
        heading: "Situation",
        text: "The research question was whether a hybrid model combining spatial features from images and temporal environmental data could produce reliable, real-world-useful forecasts. Our team approached it from complementary angles: data preparation, model architecture exploration, validation strategy, and deployment considerations.",
      },
      {
        heading: "Thinking",
        text: "We designed a three-model hybrid where each component addressed a genuine weakness in the others. Efficient CapsNet for spatial pattern extraction from images — haze, visibility, atmospheric texture. LSTM for temporal dependencies. LightGBM as the final ensemble layer, combining both outputs without overfitting. The architecture emerged from weeks of exploratory work and team discussion about where existing approaches fell short.",
      },
      {
        heading: "Making",
        text: "My contribution focused on the full ML lifecycle: data preparation across multimodal inputs, feature engineering, hyperparameter tuning with time-series cross-validation — standard cross-validation doesn't work here because it leaks future data into training. The team handled parallel workstreams on evaluation design and research methodology. Evaluation was deliberately multi-metric, because underestimating a pollution spike is a qualitatively different error than overestimating one.",
      },
      {
        heading: "Outcome",
        text: "The hybrid architecture demonstrated predictive accuracy across real-world air quality data, validated across multiple metrics and evaluated against the specific error types that matter in this domain. The research was presented at UST and accepted for publication, with all four team members credited equally.",
      },
    ],
    /*reflection:
      "The collaborative part was harder than I expected. Aligning on evaluation criteria, reconciling different technical approaches, and making sure every team member's contribution was visible in the final output — those required more negotiation than the modeling did. But the thesis was stronger for the four perspectives. I'd intentionally involve team members in defining research questions earlier, rather than treating it as a solo phase that happens first.",
    */
    skills: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebook",
      "Research collaboration",
    ],
  },
  {
    id: "sentiment",
    title: "DistilBERT for Movie Sentiment Classification",
    sub: "A Lightweight Fine-Tuning Approach on Internet Movie Database (IMDb) reviews",
    image: "/projects/sentiment.png",
    tags: ["ML", "NLP", "Python"],
    eyebrow: "ML · NLP",
    // meta: [
    //   { label: "Role", value: "ML Engineer, Data Scientist, Researcher" },
    //   { label: "Team", value: "7 researchers" },
    //   { label: "Type", value: "Final Project" },
    //   { label: "Year", value: "May 2025" },
    //   { label: "Dataset", value: "50k IMDb reviews" },
    //   { label: "Model", value: "DistilBERT" },
    //   { label: "Accuracy", value: "~87% test" },
    // ],
    meta: [],
    intro:
      "Sentiment analysis sounds simple: is this review positive or negative? But in any real-world application, the text is messy, ironic, mixed, and context-dependent. Working alongside six teammates, we built something that engaged with that reality directly. Our challenge: fine-tune DistilBERT to handle the nuance and noise inherent in movie reviews.",
    sections: [
      {
        heading: "Situation",
        text: "Most academic projects skip the messiness of real-world text. We chose DistilBERT because it was 40% smaller than BERT, 60% faster during inference, and retained 97% of BERT's performance — critical for working within hardware constraints on a Macbook Air. The team split work across preprocessing, model implementation, hyperparameter optimization, and evaluation design.",
      },
      {
        heading: "Thinking",
        text: "The more interesting design decision was to deliberately inject noise into the training data — random typos, synonym replacements, character errors — and treat error analysis as a first-class output, not an afterthought. If we were going to claim the model was useful in production, we needed to understand exactly where and why it failed, especially on noisy inputs.",
      },
      {
        heading: "Making",
        text: "My focus was on the full ML pipeline: exploratory data analysis, comprehensive text preprocessing (HTML removal, URL stripping, stopword elimination, lemmatization), noise injection strategies, tokenization with DistilBertTokenizerFast, and grid search hyperparameter tuning. The training dataset was reduced from 50,000 to 1,400 reviews due to the 44-hour computational constraint. I conducted detailed error analysis on 841+ misclassified reviews across both clean and noisy datasets.",
      },
      {
        heading: "Outcome",
        text: "~87% test accuracy with balanced precision (0.87–0.88), recall, and F1-scores across negative and positive reviews. The model demonstrated strong generalization from training to validation to test sets. Importantly, we quantified robustness: adding noise increased errors from 702 to 923 misclassifications, revealing that real-world performance depends heavily on preprocessing quality.",
      },
    ],
    /*
    reflection:
      "What surprised me was how much the team's division of labor affected the final output quality. By having different people own data preprocessing vs. model training vs. error analysis, we caught edge cases no single person would have noticed. The reverse side: alignment took longer. We spent cycles debating whether certain noisy samples were legitimate or data quality issues. I'd do that upfront next time, before training starts. Also — working on a constrained machine (8GB Macbook) forced us to be ruthless about dataset size and iteration speed. Constraints can be forcing functions for good architecture decisions.",
    */
    skills: [
      "Python",
      "Hugging Face Transformers",
      "DistilBERT",
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Jupyter Notebook",
      "Grid search optimization",
      "Error analysis",
      "Data preprocessing",
      "Research collaboration",
    ],
  },
  {
    id: "kho",
    title: "Kho Veterinary Clinic Record Management System",
    sub: "Full-stack clinic management system",
    image: "/projects/kho.png",
    tags: ["Full-stack", "PM", "React"],
    eyebrow: "Full-Stack · Project Management",
    // meta: [
    //   { label: "Role", value: "PM & Full-stack dev" },
    //   { label: "Team", value: "6 developers" },
    //   { label: "Stack", value: "React, Node.js, MySQL" },
    //   { label: "Year", value: "2024–2025" },
    // ],
    meta: [],
    intro:
      "The clinic's existing process was entirely manual — paper records for patient history, handwritten logs for appointments, no system for tracking overdue vaccinations. The ask was a digital system that wouldn't require clinic staff to learn something complicated. I wore two hats: project manager and full-stack developer.",
    sections: [
      {
        heading: "Situation",
        text: "The first priority was translating the clinic's actual needs — not what they said they wanted, but what the paper-based process was actually doing — into a product backlog the team could work from.",
      },
      {
        heading: "Thinking",
        text: "I structured the project around Agile sprints in Jira, delegated tasks based on each team member's strengths, and ran regular standups and retrospectives. The hardest part of planning wasn't the technical architecture — it was managing scope creep once stakeholders started seeing a working product.",
      },
      {
        heading: "Making",
        text: "We built a full-stack application in React, Node.js/Express, and MySQL. Core features: patient records with full medical history tracking, appointment scheduling and visit logging, role-based access control, and an owner contact log. I contributed across both frontend and backend while running the project management side in parallel.",
      },
      {
        heading: "Outcome",
        text: "A working, deployed system that replaced the clinic's paper-based process. The role-based access control went through three design iterations — but the final implementation covered all the permission edge cases that earlier versions missed.",
      },
    ],
    /*
    reflection:
      "The role-based access rework cost us two sprints that a proper requirements workshop upfront would have saved. The conversations you skip at the start always come back later, and they're more expensive the second time.",
    */
    skills: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Jira",
      "Notion",
      "Agile / Scrum",
    ],
  },
];

/* ─── ICONS ─────────────────────────────────────────────────────── */
const IconFile = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconArrowRight = () => (
  <svg className="work-card-arrow" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </svg>
);

/* ─── SIDEBAR ───────────────────────────────────────────────────── */
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-photo">
        <img src="/profile.jpg" alt="Micah Mallari" />
      </div>
      <p className="sidebar-name">Micah Mallari</p>
      <p className="sidebar-role">Data Science ★ UI/UX</p>
      <p className="sidebar-tagline">
        This is my space to show what I do and what I've been building.
        <br />
        From the University of Santo Tomas with a degree in Computer Science and
        a habit of making data make sense and interfaces feel human.
      </p>

      <div className="sidebar-links">
        <a className="sidebar-link" href="mailto:mallarimicah.work@gmail.com">
          <IconMail /> mallarimicah.work@gmail.com
        </a>
        <a
          className="sidebar-link"
          href="https://www.linkedin.com/in/micah-mallari/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconLinkedIn /> LinkedIn
        </a>
        <a
          className="sidebar-link"
          href="/cv.pdf"
          download="Micah_Mallari_CV.pdf"
        >
          <IconFile /> CV
        </a>
      </div>
    </aside>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────── */
function HomePage({
  onSelectProject,
}: {
  onSelectProject: (id: string) => void;
}) {
  const handleCardClick = (p: (typeof PROJECTS)[0]) => {
    // If the project has an external URL, open it in a new tab instead of
    // navigating to the internal case study page.
    if ("externalUrl" in p && p.externalUrl) {
      window.open(p.externalUrl, "_blank", "noopener,noreferrer");
    } else {
      onSelectProject(p.id);
    }
  };

  return (
    <main className="main">
      <section className="section">
        <p className="section-label">things I've made</p>
        <div className="work-list">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              className="work-card"
              onClick={() => handleCardClick(p)}
            >
              {/* <div className="work-card-image">
                {p.image ? (
                  <img src={p.image} alt={p.title} />
                ) : (
                  <div className="work-card-image-placeholder">Image</div>
                )}
              </div> */}
              <div>
                <p className="work-card-title">{p.title}</p>
                <p className="work-card-sub">{p.sub}</p>
                <p
                  className="section-label"
                  style={{
                    marginBottom: 0,
                    marginTop: 6,
                    color: "var(--c-blue)",
                  }}
                >
                  {p.eyebrow}
                </p>
              </div>
              <IconArrowRight />
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-label">where I've been</p>
        <div className="exp-card">
          <p className="exp-date">
            Jan–Apr
            <br />
            2026
          </p>
          <div>
            <p className="exp-company">Amdocs</p>
            <p className="exp-meta">
              Software Engineer Intern · Taguig, Philippines
            </p>
            <p className="exp-desc">
              Built end-to-end Python automation pipelines for IAMOps (user
              creation, deactivation, reactivation, and queue modification)
              across four production workflows. Worked directly on live systems
              used by the operations team from day one.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── CASE STUDY PAGE ───────────────────────────────────────────── */
function CaseStudyPage({
  project,
  onBack,
}: {
  project: (typeof PROJECTS)[0];
  onBack: () => void;
}) {
  // NOTE: The Technovation project (id: "technovation") redirects to the
  // external site from the card click in HomePage and never reaches this
  // component. The case study page content for it is intentionally unused.
  // If you later want to re-enable it, remove `externalUrl` from that project
  // object in PROJECTS and this component will render it automatically.

  return (
    <main className="main">
      <button className="cs-back" onClick={onBack}>
        <IconArrowLeft /> Back
      </button>

      <p className="cs-eyebrow">{project.eyebrow}</p>
      <h1 className="cs-title">{project.title}</h1>
      <p className="cs-intro">{project.intro}</p>

      <div className="cs-image">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="cs-image-placeholder">Image Placeholder</div>
        )}
      </div>

      {/* Meta row commented out — data is kept in PROJECTS for reference
      <div className="cs-meta-row">
        {project.meta.map((m: (typeof PROJECTS)[0]["meta"][0]) => (
          <div key={m.label} className="cs-meta-item">
            <p className="cs-meta-label">{m.label}</p>
            <p className="cs-meta-value">{m.value}</p>
          </div>
        ))}
      </div>
      */}

      <div className="cs-body">
        {project.sections.map((s: (typeof PROJECTS)[0]["sections"][0]) => (
          <div key={s.heading} className="cs-section">
            <p className="cs-section-heading">{s.heading}</p>
            <p className="cs-section-text">{s.text}</p>
          </div>
        ))}

        {/* <div className="cs-callout">{project.reflection}</div> */}

        <div className="cs-section">
          <p className="cs-section-heading">Stack & Skills</p>
          <div className="cs-skills">
            {project.skills.map((s: string) => (
              <span key={s} className="cs-skill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const project = activeProject
    ? PROJECTS.find((p) => p.id === activeProject)
    : null;

  return (
    <>
      <style>{css}</style>
      <div className="layout">
        <Sidebar />
        {project ? (
          <CaseStudyPage
            project={project}
            onBack={() => setActiveProject(null)}
          />
        ) : (
          <HomePage onSelectProject={setActiveProject} />
        )}
      </div>
    </>
  );
}

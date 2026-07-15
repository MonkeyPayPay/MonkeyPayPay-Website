# MonkeyPayPay — Custom WordPress Theme

This repository **is** the MonkeyPayPay WordPress theme. The repo root is the
theme root, so the whole repo drops straight into
`wp-content/themes/monkeypaypay/` on a WordPress install.

It's a hand-built classic theme — plain PHP templates, CSS, and vanilla JS. No
build step, no framework, nothing to compile. Edit a file, refresh the page.

**What the site does:** it's a directory of the owner's Google Play apps,
grouped by category (Fitness, Games, Widgets, …). Each app shows an icon, a
"View on Google Play" link, a short description, and screenshots. Apps are
managed entirely from the WordPress dashboard — no code needed to add one.

## Adding an app (no code)

In the WordPress dashboard:

1. **Apps → Add New**.
2. **Title** — the app's name.
3. **Category** (right sidebar) — tick one or more (Fitness, Games, Widgets…).
   Defaults are created for you; add your own anytime under *Apps → Categories*.
4. **Featured image** (right sidebar) — upload the **app icon**.
5. **Excerpt** — the **short description** shown under the app.
   (If you don't see the Excerpt box, enable it under the ⋮ menu → Preferences → Panels.)
6. **Content area** — add a **Gallery block** with your **screenshots**.
7. **App Details box** — paste the **Google Play URL**.
8. **Publish.** It appears on the homepage under its category automatically.

---

## What's in here

```
.
├── style.css              Theme header + design tokens (CSS custom properties)
├── functions.php          Loads the files in /inc
├── inc/
│   ├── setup.php           Theme supports, menus, widget areas
│   ├── enqueue.php         Loads CSS/JS
│   ├── template-tags.php   Small reusable output helpers
│   └── post-types.php      "App" post type, category taxonomy, Play-URL field
├── header.php             Site header + opening markup
├── footer.php             Site footer + closing markup
├── front-page.php         Homepage — apps grouped by category
├── archive-mpp_app.php    /apps — all apps
├── taxonomy-mpp_app_category.php  One category's apps
├── single-mpp_app.php     Single app detail page
├── index.php              Fallback list view (blog, archives)
├── page.php               Single pages
├── single.php             Single blog posts
├── 404.php                Not-found page
├── searchform.php         Search form markup
├── template-parts/
│   ├── app-card.php        One app's card (icon, link, description, shots)
│   ├── content.php         Generic post partial
│   └── content-none.php    "Nothing found" partial
└── assets/
    ├── css/main.css        Main stylesheet
    └── js/main.js          Responsive menu toggle
```

---

## The big picture: how the pieces connect

You have a domain. To get from there to a live, custom, GitHub-versioned site,
four things have to be in place:

1. **Hosting** — a server that runs WordPress (PHP + MySQL). Your domain points
   at it. *This is the current missing piece.*
2. **WordPress** — installed on that host (most hosts do this in one click).
3. **This theme** — deployed into `wp-content/themes/` and activated.
4. **A deploy path** — how code from GitHub reaches the live site.

Claude (this session) sits alongside all of it: connected to your GitHub repo,
writing and reviewing the theme code with you.

---

## Step 1 — Pick a host (needed before anything goes live)

WordPress can't run on a domain alone; it needs hosting. For a custom-coded
theme you want SSH/SFTP access and, ideally, Git-based deploys. Good options:

| Host        | Why it fits | Rough cost |
|-------------|-------------|-----------|
| **Cloudways** | Simple Git deployment built in, SSH, staging | ~$11+/mo |
| **Kinsta**    | Managed, fast, SSH + Git, great staging | ~$35+/mo |
| **WP Engine** | `git push` deploy workflow, strong tooling | ~$20+/mo |
| **SiteGround / DreamHost** | Budget-friendly, SFTP deploy | ~$3–8/mo |

If you're just getting started and cost matters, SiteGround or DreamHost are
fine — we'd deploy over SFTP. If you want the cleanest GitHub → site pipeline,
Cloudways or WP Engine are worth it.

Once you choose a host, you'll point your domain's DNS (A record / nameservers)
at it — the host gives you exact values. Tell me who you picked and I'll walk
you through the DNS records and WordPress install.

---

## Step 2 — Develop locally (recommended while we build)

You don't need the live site to work on the theme. Run WordPress on your own
machine and point it at this repo:

- **[Local](https://localwp.com/)** (by WP Engine) — easiest, one-click WP site.
- **[Studio](https://developer.wordpress.com/studio/)** (by WordPress.com) — free, fast.
- **[`@wordpress/env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)** — Docker-based, CLI.

Then symlink or clone this repo into that site's themes folder:

```bash
# from your local WordPress site's wp-content/themes directory
git clone <this-repo-url> monkeypaypay
```

Activate **MonkeyPayPay** under *Appearance → Themes*, and you're editing live.

---

## Step 3 — Connect GitHub to the live site (deploy)

Pick whichever matches your host. All of these use this repo as the source.

- **Host-native Git** (Cloudways/Kinsta/WP Engine): add this repo in the host
  dashboard; `git push` deploys automatically. Cleanest option.
- **[WP Pusher](https://wppusher.com/)** (any host): a WordPress plugin that
  pulls this repo's theme on each push. No server config needed.
- **GitHub Actions → SFTP** (any host): a workflow that uploads the theme on
  every push to `main`. I can generate this once you have host credentials —
  we'd store them as encrypted GitHub Secrets, never in the repo.

---

## Step 4 — Claude stays in the loop

This session is already connected to your GitHub repo, so from here I can:

- build out pages, templates, and styles as you describe them,
- open pull requests you review before anything merges,
- wire up the deploy workflow when your host is ready.

You review, I drive.

---

## Conventions

- **WordPress Coding Standards** — tabs for PHP/JS/CSS (see `.editorconfig`).
- All output is escaped (`esc_html`, `esc_url`, `esc_attr`) and text is
  translation-ready via the `monkeypaypay` text domain.
- Design tokens (colors, spacing, radius) live as CSS custom properties in
  `style.css` — change them there to restyle the whole site.

---

## Current status

✅ Starter theme scaffolded and version-controlled
⬜ Host chosen and WordPress installed
⬜ Domain DNS pointed at host
⬜ Deploy pipeline (GitHub → live site) configured

**Next:** tell me which host you want to use (or ask me to recommend one for
your budget), and we'll get WordPress live and this theme deployed.

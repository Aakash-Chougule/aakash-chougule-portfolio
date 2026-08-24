# Aakash Chougule Portfolio

This build focuses on production public-portfolio quality:

- cinematic scroll transition from the hero into the portfolio
- mouse-follow hero spotlight
- lightweight animated signal/snake dividers
- lazy-loaded galleries, certificate and GitHub contribution graphic
- browser rendering optimizations (`content-visibility`, smaller backdrop blur)
- EmailJS form switched to the official `sendForm` pattern
- exact EmailJS template field names: `from_name`, `from_email`, `date`, `time`, `message`
- public-friendly form failure message with detailed diagnostics only in local development
- no EmailJS private key stored in the project

## Run

```bash
npm install
npm run dev
```

## EmailJS dashboard checks

Template HTML variables:

```text
{{from_name}}
{{from_email}}
{{date}}
{{time}}
{{message}}
```

Recommended template settings:

```text
To Email: aakashc549@gmail.com
Reply-To: {{from_email}}
Subject: New Portfolio Message from {{from_name}}
```

If Domains / allowlist is enabled in EmailJS, add the local test origin `http://localhost:5173` while testing, and later add the final production domain.

## Production build

```bash
npm run build
```

Cloudflare Pages output directory: `dist`

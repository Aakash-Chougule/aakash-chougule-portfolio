# Final Deployment Checklist

## Local test

```powershell
npm install
npm run dev
```

Production preview:

```powershell
npm run build
npm run preview
```

## GitHub

Create a public repository named:

```text
aakash-chougule-portfolio
```

Then from this folder:

```powershell
git init
git add .
git commit -m "feat: launch professional .NET developer portfolio"
git branch -M main
git remote add origin https://github.com/Aakash-Chougule/aakash-chougule-portfolio.git
git push -u origin main
```

`.env`, `node_modules`, and `dist` are ignored and should not be committed.

## Cloudflare Pages

Connect the GitHub repository and use:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

Add these environment variable names in Cloudflare Pages settings:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Copy their values from your local `.env` file.

After deployment, test the live site, resume, certificate, project galleries, GitHub links and EmailJS contact form.

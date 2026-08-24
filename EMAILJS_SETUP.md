# EmailJS checklist for this public portfolio

The portfolio now uses EmailJS `sendForm`, which matches the official browser SDK pattern and your template variables exactly.

## IDs used by the site

- Service ID: `service_ih91v8z`
- Template ID: `template_9ll2uuk`
- Public key: `2ebBAJBkDrupcL5F7`

The private key is intentionally **not** stored in the React app.

## Your EmailJS template must use

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

## If it still fails on localhost

1. In EmailJS, open **Email Services** and test `service_ih91v8z` directly from the dashboard.
2. Open **Templates** and confirm `template_9ll2uuk` is saved/published.
3. If **Domains / allowlist** is enabled, add:

```text
http://localhost:5173
```

4. After deployment, add the production origin too, for example:

```text
https://your-project.pages.dev
```

5. On localhost, the portfolio error box contains a **Developer diagnostic** expander. Open it and use the returned HTTP/status text to identify the exact EmailJS issue.

## Security

Rotate the private EmailJS key that was previously shared. It is not required for this browser portfolio.

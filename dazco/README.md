# Dazco - Landing Page

Next.js (App Router) + TypeScript + Tailwind CSS landing page for Dazco, with a
contact form that sends email through a backend API route using Nodemailer.

Brand assets and guidelines live in [`ref/`](./ref) (logo variations and
`MANUAL_DE_MARCA_DAZCO_LLC.pdf`). Colors and fonts in this project are pulled
from that manual.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) for form validation
- [Nodemailer](https://nodemailer.com) for sending contact form emails via SMTP

## Getting started

Install dependencies:

```bash
pnpm install
```

Copy the environment file and fill in your SMTP credentials:

```bash
cp .env.example .env.local
```

| Variable             | Description                                                        |
| --------------------- | -------------------------------------------------------------------- |
| `SMTP_HOST`           | SMTP server host (e.g. from Gmail, Office365, or your own provider) |
| `SMTP_PORT`           | SMTP port (`587` for TLS, `465` for SSL)                             |
| `SMTP_SECURE`         | `true` to force SSL, otherwise leave `false`                        |
| `SMTP_USER`           | SMTP account username                                                |
| `SMTP_PASS`           | SMTP account password / app password                                 |
| `CONTACT_TO_EMAIL`    | Inbox that should receive contact form submissions                   |
| `CONTACT_FROM_EMAIL`  | "From" address used for outgoing emails (defaults to `SMTP_USER`)    |

> **Gmail users:** you'll need to create an [App Password](https://myaccount.google.com/apppasswords)
> (requires 2-Step Verification) instead of your regular password.

Run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    api/contact/route.ts   # POST endpoint that validates + sends the contact email
    layout.tsx              # Root layout, fonts, metadata
    page.tsx                # Landing page composition
  components/
    navbar.tsx, hero.tsx, about.tsx, services.tsx, contact.tsx,
    contact-form.tsx, footer.tsx
  lib/
    contact-schema.ts       # Shared Zod schema (client + server validation)
    mailer.ts                # Nodemailer transporter + email template
public/
  brand/                     # Logo variations copied from ref/
ref/                         # Original brand manual + source logo files
```

## Brand

Colors and typography are configured in `src/app/globals.css` and
`src/app/layout.tsx`, based on the brand manual:

- **Vivid Tangelo** `#EA6E24` — primary
- **Mediterranean Blue** `#137ABF` — secondary
- **Vivid Cerulean** `#01AEEA` — accent
- **Rich Grey** `#3C3C3C` — neutral text
- **Dravit Grey** `#5B5B5B` — muted text

The brand manual specifies **Futura** as the supplementary typeface. Futura is
a commercial font, so this project uses **Jost** (a free, geometric-sans
alternative available on Google Fonts) as a stand-in. Swap the font in
`src/app/layout.tsx` if you obtain a Futura web font license.

## Build

```bash
pnpm build
pnpm start
```

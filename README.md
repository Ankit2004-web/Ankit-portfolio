# Ankit Biswas — Portfolio

Personal portfolio website built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

**Live site:** [https://ankit-portfolio-iota-one.vercel.app](https://ankit-portfolio-iota-one.vercel.app)

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Recommended | Contact form delivery to your email |
| `VITE_GITHUB_TOKEN` | Optional | Higher GitHub API rate limits |

## Deployment (Vercel)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework:** Vite

Add `VITE_WEB3FORMS_ACCESS_KEY` in the Vercel project **Environment Variables** settings.

Pushes to `main` automatically redeploy the live site when connected to Vercel.

## Update live site

```bash
git add .
git commit -m "Update portfolio"
git push
```

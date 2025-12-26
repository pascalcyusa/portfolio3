This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SEO Features

### Sitemap
This website includes an automatically generated XML sitemap for search engines. The sitemap is defined in `src/app/sitemap.ts` and includes all main pages:

- **Home** (`/`) - Priority: 1.0, Updated: Yearly
- **Projects** (`/projects`) - Priority: 0.8, Updated: Monthly
- **Research** (`/research`) - Priority: 0.8, Updated: Monthly
- **Resume** (`/resume`) - Priority: 0.5, Updated: Yearly
- **Contact** (`/contact`) - Priority: 0.5, Updated: Yearly

The sitemap is automatically generated at build time and is accessible at `/sitemap.xml` when the site is deployed.

### Robots.txt
The site includes a `robots.txt` configuration (`src/app/robots.ts`) that:
- Allows all search engines to crawl the site
- References the sitemap at `https://pascalcyusa.com/sitemap.xml`
- Disallows access to `/private/` directory (if it exists)

Both files follow Next.js 13+ App Router conventions and are automatically generated during the build process.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

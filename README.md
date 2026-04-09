# Benjamin Portfolio (Next.js)

This project is a converted portfolio site built with Next.js App Router, Tailwind CSS, Prisma, and Playwright.

## Requirements

- Node.js 20+
- npm

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
# already included for local SQLite
DATABASE_URL="file:./dev.db"
```

3. Generate Prisma client and sync database:

```bash
npm run db:generate
npm run db:push
```

4. Seed baseline content (posts/services/case studies):

```bash
npm run db:seed
```

5. Start development server:

```bash
npm run dev
```

Visit http://localhost:3000.

## Quality Gates

Run full project checks:

```bash
npm run check
```

This runs:

- ESLint
- TypeScript type checking
- Vitest unit tests

## End-to-End Tests

Install Playwright browser once:

```bash
npx playwright install chromium
```

Run e2e tests:

```bash
npm run test:e2e
```

## Production Build

```bash
npm run build
npm run start
```

## Useful Commands

- `npm run db:studio` opens Prisma Studio
- `npm run test:watch` runs unit tests in watch mode

## Firebase Setup (Firestore)

Firebase Admin support is now added for server-side database access.

1. Install dependencies (already included in project):

```bash
npm install
```

2. Add Firebase Admin env vars (see `.env.example`):

```bash
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxx@your-project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

3. Verify connection:

```bash
GET /api/firebase/health
```

If successful, the endpoint returns `ok: true` and lists existing collections.

## Google Sign-In Setup

Google OAuth is available on both sign-in and sign-up pages.

Required environment variables:

```bash
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
# Optional: comma-separated list of emails that should get admin role after Google sign-in.
GOOGLE_ADMIN_EMAILS="admin1@example.com,admin2@example.com"
```

Google Cloud OAuth settings:

- Authorized redirect URI:

```text
https://your-domain.com/api/auth/google/callback
```

For local development also add:

```text
http://localhost:3000/api/auth/google/callback
```

## Image Location And Naming

Store all website images in [public/images/README.md](public/images/README.md).

Main folder to use:

- [public/images](public/images)

Recommended names aligned to current UI placeholders:

- [Home hero placeholder](src/app/page.tsx#L89) -> `hero-chanuka.jpg`
- [Home about image placeholder](src/app/page.tsx#L164) -> `about-chanuka.jpg`
- [About page image placeholder](src/app/about/page.tsx#L47) -> `about-page-chanuka.jpg`
- [Testimonials left photo placeholder](src/app/testimonials/page.tsx#L139) -> `testimonial-chanuka.jpg`
- [Services grid placeholders](src/app/services/page.tsx#L81) -> `service-cv-writing.jpg`, `service-cover-letter.jpg`, `service-linkedin-optimization.jpg`, `service-cv-review.jpg`
- [Service detail hero placeholder](src/app/services/[slug]/page.tsx#L30) -> `service-hero-default.jpg`
- [Portfolio project placeholders](src/app/portfolio/page.tsx#L57) -> `portfolio-project-1.jpg`, `portfolio-project-2.jpg`, `portfolio-project-3.jpg`, `portfolio-project-4.jpg`
- [Case study placeholders](src/app/case-studies/page.tsx#L69) -> `case-study-1.jpg`, `case-study-2.jpg`, `case-study-3.jpg`
- [Blog list card placeholders](src/app/blog/page.tsx#L60) -> `blog-card-1.jpg`, `blog-card-2.jpg`, `blog-card-3.jpg`
- [Blog featured image placeholder](src/app/blog/[slug]/page.tsx#L127) -> `blog-featured-default.jpg`
- [Blog content image placeholders](src/app/blog/[slug]/page.tsx#L152) -> `blog-content-1.jpg`, `blog-content-2.jpg`
- [Blog author photo placeholder](src/app/blog/[slug]/page.tsx#L183) -> `blog-author.jpg`

Note:

- The current pages still use visual placeholders in many spots. After adding files, the next step is to wire these exact filenames into image components on those pages.

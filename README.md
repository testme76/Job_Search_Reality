# Job Search Reality

An anonymous dashboard showing real job search statistics from 100+ software engineering candidates.

## Features

- **Real Data**: 100+ anonymous survey responses
- **Interactive Filters**: Filter by major, school tier, sponsorship, location, and experience level
- **Live Stats**: Average applications, interviews, offers, and success rates
- **Charts**: Visual representations of application distributions and success rates
- **Responsive**: Works on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, TailwindCSS
- **Backend**: Vercel Postgres / Neon
- **Charts**: Recharts
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Vercel account (for Postgres) or Neon account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd job-search-reality
```

2. Install dependencies
```bash
npm install
```

3. Set up Postgres database
   - Create a Vercel Postgres or Neon database
   - Copy connection string to `.env.local`:
   ```
   POSTGRES_URL="your_connection_string_here"
   ```

4. Initialize database
```bash
npm run dev
# Visit http://localhost:3000/api/db/init
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Create Vercel Postgres database in Vercel dashboard
3. Import project to Vercel (environment variables auto-configured)
4. After first deploy, visit `/api/db/init` to initialize schema
5. Deploy

```bash
npm run build
```

## Project Structure

```
job-search-reality/
├── app/                      # Next.js app router
│   ├── dashboard/           # Dashboard page
│   ├── about/              # About page
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── landing/            # Landing page components
│   ├── dashboard/          # Dashboard components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── utils.ts            # Utility functions
│   └── googleSheets.ts     # Google Sheets integration
└── public/                 # Static assets
```

## Contributing

Feel free to open issues or submit PRs!

## License

MIT

## Contact

Built to help job seekers understand they're not alone in this brutal market.

Survey: https://forms.gle/98NCmJuqme5Dtwrr7

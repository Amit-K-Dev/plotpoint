# 🎬 Trailer Analyst — Next.js

Enterprise-grade movie trailer analysis app — Next.js 14 App Router · TypeScript · Tailwind · Anthropic SDK.

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Client shell (tab state)
│   ├── globals.css
│   └── api/
│       ├── analyze/route.ts    # POST /api/analyze  ← server-side API key
│       └── chat/route.ts       # POST /api/chat
├── components/
│   ├── ui/                     # Atomic: ScoreRing, HypeBar, SectionCard, LoadingPulse
│   ├── analysis/               # Domain: EmotionArc, KeyMoments, TheoryCard, HypeBreakdown
│   ├── tabs/                   # Pages: AnalyzeTab, HistoryTab, WatchlistTab, CompareTab
│   ├── chat/                   # AIChat
│   └── layout/                 # Header
├── hooks/
│   ├── useAnalysis.ts          # Async analysis state machine
│   ├── useHistory.ts           # localStorage history CRUD
│   ├── useWatchlist.ts         # localStorage watchlist CRUD
│   └── useLocalStorage.ts      # Generic SSR-safe storage hook
├── lib/
│   ├── constants.ts            # Sections, configs, storage keys
│   ├── prompts.ts              # AI system prompts
│   ├── youtube.ts              # YouTube URL parser
│   └── utils.ts                # cn, fmtDate, fileToBase64, safeParseJSON
└── types/
    └── index.ts                # All TypeScript interfaces
```

## Quick Start

```bash
# 1. Install
npm install

# 2. Add your API key
cp .env.example .env.local
# Edit .env.local → ANTHROPIC_API_KEY=sk-ant-...

# 3. Run
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel (recommended)

```bash
npx vercel
# Add env variable: ANTHROPIC_API_KEY in Vercel dashboard
```

Or:
1. Push to GitHub
2. Import at vercel.com
3. Set `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy

## Security

- API key lives **only on the server** — never exposed to browser
- All Anthropic calls go through `/api/analyze` and `/api/chat` route handlers
- Security headers set in `next.config.ts`

## Get API Key

→ [console.anthropic.com](https://console.anthropic.com)

<img src="logo/betalog-logo.png" alt="BetaLog" width="420" />

# BetaLog ðŸ§—

**A climbing journal that tracks your progress and uses AI to analyse your climbing videos.**

BetaLog lets climbers log their sessions, track grade progression over time, and get AI-powered feedback on their climbs from uploaded videos.

> ðŸš§ **Status:** In development

---

## Problem

Most climbers track progress in their heads, scattered phone notes, or not at all. It's hard to see whether you're actually improving, which styles you struggle with, or why you keep falling on the same move. Getting feedback usually means asking a friend or paying for coaching.

## Goals

- Make logging a session quick enough to do between climbs
- Turn logged climbs into clear, visual progress insights
- Give climbers useful, video-based feedback on what went wrong and how to improve

---

## Features

### Journal
- [x] Log sessions (date, gym, duration, energy level)
- [x] Log climbs per session (grade, style, attempts, sent or not)
- [x] Add personal notes to each climb
- [ ] Browse and filter climbing history

### Progress Dashboard
- [ ] Grade pyramid
- [ ] Send rate over time
- [ ] Highest grade sent and monthly trends
- [ ] Breakdown by climbing style

### AI Video Feedback
- [x] Upload a short clip of an attempt
- [ ] Pose detection with skeleton overlay
- [ ] AI-generated description of the attempt
- [ ] Suggested areas for improvement

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, Recharts |
| Backend | Node.js, Express |
| Database | PostgreSQL (Supabase) |
| AI | MediaPipe Pose, vision-capable LLM API |
| Testing | Jest |
| Deployment | Vercel, Render |

*Stack may change as the project develops.*

---

## Roadmap

1. **Planning:** user stories, wireframes, database design
2. **Journal:** session and climb logging, history
3. **Dashboard:** progress charts and stats
4. **AI feedback:** video upload, pose detection, AI analysis
5. **Polish:** mobile/PWA support, testing, deployment

Progress is tracked on the [project board](#).

---

## Getting Started

### Prerequisites
- Node.js 20+
- A free [Supabase](https://supabase.com) project

### 1. Database
In your Supabase project, open **SQL Editor** and run `database/schema.sql`. This creates the tables and a private `climb-videos` storage bucket.

### 2. Backend
```bash
cd server
cp .env.example .env   # add your Supabase URL and anon key
npm install
npm run dev            # http://localhost:3000
```

### 3. Frontend
```bash
cd client
cp .env.example .env   # add your Supabase URL and anon key
npm install
npm run dev            # http://localhost:5173
```

### Tests
```bash
cd server && npm test
```

## Project Structure
```
betalog/
â”œâ”€â”€ client/      React + Vite frontend
â”œâ”€â”€ server/      Express API
â”œâ”€â”€ database/    SQL schema
â””â”€â”€ logo/        Logo files
```

---

## Author

**Ong Liang Cheng**
Diploma in Information Technology, Ngee Ann Polytechnic
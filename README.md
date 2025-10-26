# Study Timer App 📚⏰

A Pomodoro-style study timer built with modern web technologies to help you focus and track your study sessions.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Redux Toolkit** - Predictable state management
- **Prisma + PostgreSQL** - Database ORM with PostgreSQL
- **NextAuth** - Authentication
- **Vitest** - Fast, modern testing framework
- **React Testing Library** - Component testing utilities

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm (or npm/yarn)
- PostgreSQL database (local or remote)

### Database Setup

#### Option 1: Local PostgreSQL
Install PostgreSQL locally and create a database:

```bash
createdb study_timer
```

#### Option 2: Docker (Recommended)
Run PostgreSQL in Docker:

```bash
docker run --name study-timer-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=study_timer \
  -p 5432:5432 \
  -d postgres
```

#### Option 3: Vercel Postgres (Production)
Use Vercel Postgres for production deployments.

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Then update `.env` with your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/study_timer?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

3. Run database migrations:
```bash
pnpm prisma migrate dev --name init
```

4. Generate Prisma Client:
```bash
pnpm prisma generate
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm db:studio` - Open Prisma Studio

## 🎯 Features

- ✅ Customizable study timer (default: 25 minutes)
- ✅ Break timer (default: 7 minutes)
- ✅ Study goal tracking
- ✅ Session management
- ✅ User authentication
- ✅ User preferences
- 🚧 Session history (coming soon)
- 🚧 Statistics dashboard (coming soon)

## 📁 Project Structure

```
study-timer/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── components/        # React components
│   ├── api/              # API routes
│   └── auth/             # Auth pages
├── store/                 # Redux store
│   ├── store.ts          # Store configuration
│   ├── slices/           # Redux slices
│   └── hooks.ts          # Typed Redux hooks
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🧪 Testing

```bash
pnpm test              # Run tests
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Generate coverage report
```

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add a Vercel Postgres database
4. Set environment variables:
   - `DATABASE_URL` - Automatically provided by Vercel Postgres
   - `NEXTAUTH_SECRET` - Generate a random secret
   - `NEXTAUTH_URL` - Your deployment URL
5. Deploy!

The `DATABASE_URL` provided by Vercel Postgres will automatically use PostgreSQL.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [NextAuth Documentation](https://next-auth.js.org/)

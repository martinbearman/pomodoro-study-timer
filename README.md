# Study Timer App 📚⏰

A Pomodoro-style study timer built with modern web technologies to help you focus and track your study sessions.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Redux Toolkit** - Predictable state management
- **Vitest** - Fast, modern testing framework
- **React Testing Library** - Component testing utilities

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 🎯 Features

- ✅ Customizable study timer (default: 25 minutes)
- ✅ Break timer (default: 7 minutes)
- ✅ Study goal tracking
- ✅ Session management
- ✅ Visual progress indicator
- 🚧 Session history (coming soon)
- 🚧 Statistics dashboard (coming soon)
- 🚧 User authentication (coming soon)

## 📁 Project Structure

```
study-timer/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── components/        # React components
│   └── globals.css        # Global styles
├── store/                 # Redux store
│   ├── store.ts          # Store configuration
│   ├── slices/           # Redux slices
│   └── hooks.ts          # Typed Redux hooks
├── lib/                   # Utility functions
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🧪 Testing

This project uses Vitest and React Testing Library for testing.

Run tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)

## 🤝 Contributing

This is a learning project! Feel free to experiment, break things, and learn.

## 📝 License

MIT


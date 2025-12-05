🚀 React + Vite + TypeScript App

A modern React application built with Vite, TypeScript, React Router, TanStack Query, Tailwind CSS, and shadcn/ui.
This project includes full authentication flows, a dashboard, settings, cart system, and more.

📌 Features
🔐 Authentication

Phone number login & OTP (SMS) flow

Register & Login pages

Auth screen routing

🧭 Navigation / Screens

Splash

Auth → Phone / OTP / Register / Login

Dashboard

Orders

Account

Cart

Settings

404 Not Found

⚛️ Tech Stack

React 18 + TypeScript

Vite (super-fast dev + build)

React Router v6

@tanstack/react-query (API caching + server state)

Tailwind CSS

shadcn/ui & Radix UI components

Sonner & custom toaster notifications

Context API for global state (AppContext)

📂 Project Structure (Important Files)
src/
 ├── components/ui/...      # UI components (shadcn, sonner, toaster)
 ├── contexts/AppContext.tsx
 ├── screens/
 │    ├── SplashScreen.tsx
 │    ├── auth/
 │    │    ├── PhoneInputScreen.tsx
 │    │    ├── OTPScreen.tsx
 │    │    ├── RegisterScreen.tsx
 │    │    └── LoginScreen.tsx
 │    ├── DashboardScreen.tsx
 │    ├── OrdersScreen.tsx
 │    ├── SettingsScreen.tsx
 │    └── CartScreen.tsx
 ├── pages/NotFound.tsx
 └── App.tsx

▶️ Running the Project Locally
1. Install dependencies
npm install

2. Start the development server
npm run dev

3. Build for production
npm run build

4. Preview production build
npm run preview

🌐 App Routing Overview

Your App.tsx defines the following routes:

Route	Screen
/	SplashScreen
/auth/phone	PhoneInputScreen
/auth/otp	OTPScreen
/auth/register	RegisterScreen
/auth/login	LoginScreen
/dashboard	DashboardScreen
/orders	OrdersScreen
/account	AccountScreen
/settings	SettingsScreen
/cart	CartScreen
*	NotFound
🧰 Development Tools

Type checking with TypeScript

Linting with ESLint

Styling with Tailwind + shadcn/ui

State + server cache with React Query

📦 Production Deployment

You can deploy this app to:

Vercel

Netlify

Cloudflare Pages

GitHub Pages

Typical Vercel deployment:

npm run build


Then push to GitHub → import into Vercel → done.

🤝 Contributing

Feel free to fork, open issues, or submit PRs.
This repo uses standard Node.js/Vite project conventions.
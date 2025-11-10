# Job Search Reality

A full-stack web application that aggregates and visualizes anonymous job search data from 110+ software engineering candidates. Built to help job seekers understand market trends and normalize the struggle of modern tech recruiting.

**Live Demo**: [Your deployment URL]

## Overview

This project showcases:
- Full-stack development with Next.js 16 (App Router)
- Real-time data visualization and filtering with React Query
- PostgreSQL database design and optimization
- Responsive UI/UX with TailwindCSS 4.1
- Type-safe development with TypeScript
- Advanced React patterns with hooks and context providers
- Comprehensive testing with Jest and React Testing Library

## Key Features

### Interactive Dashboard
- Dynamic filtering by major, degree, school tier, GPA, sponsorship status, and more
- Real-time statistics updates based on filter selections
- Visual data representations using Recharts
- Responsive design optimized for mobile and desktop

### Data Collection & Management
- Comprehensive survey form with validation
- PostgreSQL database with indexed queries for performance
- Google Sheets sync for bulk data imports
- CSV export functionality for analysis
- 110+ real survey responses collected

### Technical Highlights
- Server-side rendering with Next.js App Router
- Optimized database queries with parameterized SQL
- Type-safe API routes and data models
- Dark mode support throughout the application
- Framer Motion animations for enhanced UX

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React 19.2
- TypeScript 5.9
- TailwindCSS 4.1
- Recharts 3.3
- Framer Motion 12
- TanStack React Query 5.90
- clsx & tailwind-merge for styling

**Backend**
- Next.js API Routes
- Vercel Postgres
- PostgreSQL with parameterized queries

**Testing & Development**
- Jest 30
- React Testing Library 16
- TypeScript ESLint
- tsx for script execution

**Deployment**
- Vercel (hosting + database)

## Architecture

```
app/
├── dashboard/          # Interactive data visualization with dynamic filters
├── survey/            # Multi-step form for data collection
├── responses/         # Admin view with CSV export
└── api/
    ├── stats/         # Aggregated statistics with filtering
    ├── responses/     # CRUD operations for survey data
    ├── filters/       # Dynamic filter options
    └── sync-sheets/   # Google Sheets integration

components/
├── dashboard/         # Chart components, metric cards, filters
├── survey/           # Form components with validation
├── landing/          # Hero, stats preview, CTA
├── ui/               # Reusable UI components (Skeleton, etc.)
└── ErrorBoundary.tsx # Error handling wrapper

lib/
├── db/
│   ├── postgres.ts   # Database layer with parameterized queries
│   └── schema.sql    # Database schema definitions
├── providers/        # React context providers
├── utils/            # Utility functions and helpers
└── types.ts          # Shared TypeScript interfaces

scripts/
├── check-data.ts     # Data validation utilities
└── clear-data.ts     # Database cleanup utilities
```

## What I Built

- **Database schema** for storing multi-dimensional survey data with optimized indexes
- **RESTful API** with multiple endpoints for data operations and filtering
- **Dynamic filtering system** with React Query for real-time statistics updates
- **Interactive charts** using Recharts showing application distributions and success rates
- **Responsive survey form** with comprehensive validation and dropdown options
- **Error boundaries** and loading states for better UX
- **Data visualization** helping users understand job market trends
- **Testing infrastructure** with Jest and React Testing Library
- **Utility scripts** for data validation and management

## Key Technical Implementations

### Performance Optimizations
- Implemented React Query for efficient data fetching and caching
- Database query optimization with proper indexing
- Skeleton loading states for better perceived performance
- Responsive animations with Framer Motion

### Code Quality
- Comprehensive TypeScript types throughout the application
- Jest test suite with React Testing Library
- Error boundary implementation for graceful error handling
- Reusable component architecture

### Data Management
- PostgreSQL schema with proper constraints and indexes
- Parameterized queries for SQL injection prevention
- Data validation scripts for integrity checks
- CSV export functionality for data analysis

## Project Impact

This project demonstrates:
- Full-stack development expertise with modern React and Next.js
- Database design and optimization skills
- Real-world problem solving for 110+ job seekers
- Clean, maintainable, and tested code architecture

---

Built to help job seekers understand they're not alone in this brutal market.

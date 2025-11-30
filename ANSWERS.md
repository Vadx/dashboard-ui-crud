# Dashboard UI CRUD - Project Documentation

## Complete Project Structure

```
dashboard-ui-crud/
│
├── app/                           # Application source code
│   ├── app.css                    # Global styles
│   ├── root.tsx                   # Root component
│   ├── routes.ts                  # Route configuration
│   │
│   ├── components/                # Shared components
│   │   ├── confirmation-dialog.tsx     # Delete confirmation dialog
│   │   ├── home-welcome-card.tsx       # Welcome card for home
│   │   ├── logo.tsx                    # App logo component
│   │   ├── product-drawer-form.tsx     # Product form drawer
│   │   ├── user-drawer-form.tsx        # User form drawer
│   │   │
│   │   ├── layouts/                    # Layout components
│   │   │   ├── auth-layout/            # Auth pages layout
│   │   │   │   └── index.tsx
│   │   │   └── dashboard-layout/       # Main app layout
│   │   │       ├── index.tsx           # Main layout wrapper
│   │   │       ├── app-sidebar.tsx     # Sidebar component
│   │   │       ├── breadcrumb-nav.tsx  # Breadcrumb navigation
│   │   │       ├── nav-main.tsx        # Main navigation
│   │   │       └── nav-user.tsx        # User menu
│   │   │
│   │   └── ui/                         # shadcn/ui components
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── collapsible.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton-list.tsx
│   │       ├── skeleton.tsx
│   │       ├── table.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   │
│   ├── features/                  # Feature modules
│   │   ├── login/                 # Login feature
│   │   │   └── index.tsx
│   │   │
│   │   ├── product-details/       # Product details feature
│   │   │   └── index.tsx
│   │   │
│   │   ├── products/              # Products feature
│   │   │   ├── index.tsx
│   │   │   ├── ARCHITECTURE.md
│   │   │   ├── components/
│   │   │   │   ├── index.ts
│   │   │   │   ├── product-filters.tsx
│   │   │   │   ├── product-pagination.tsx
│   │   │   │   ├── product-search-bar.tsx
│   │   │   │   ├── product-sort-select.tsx
│   │   │   │   ├── product-table-row.tsx
│   │   │   │   └── product-table.tsx
│   │   │   └── hooks/
│   │   │       ├── index.ts
│   │   │       ├── use-product-actions.ts
│   │   │       └── use-product-params.ts
│   │   │
│   │   └── users/                 # Users feature
│   │       ├── index.tsx
│   │       ├── ARCHITECTURE.md
│   │       ├── components/
│   │       │   ├── index.ts
│   │       │   ├── user-card.tsx
│   │       │   ├── user-filters.tsx
│   │       │   ├── user-grid.tsx
│   │       │   ├── user-loading-skeleton.tsx
│   │       │   ├── user-pagination.tsx
│   │       │   ├── user-search-bar.tsx
│   │       │   └── user-sort-select.tsx
│   │       └── hooks/
│   │           ├── index.ts
│   │           ├── use-user-actions.ts
│   │           └── use-user-params.ts
│   │
│   ├── hooks/                     # Shared hooks
│   │   └── use-mobile.ts          # Mobile detection hook
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── api.ts                 # API client functions
│   │   └── utils.ts               # Utility functions
│   │
│   ├── routes/                    # Page components
│   │   ├── home.tsx               # Home page
│   │   ├── login.tsx              # Login page
│   │   ├── product-[id].tsx       # Product details page
│   │   ├── products.tsx           # Products list page
│   │   └── users.tsx              # Users list page
│   │
│   ├── schemas/                   # Validation schemas
│   │   ├── index.ts               # All schema exports
│   │   ├── auth.schema.ts         # Auth validation schemas
│   │   ├── product.schema.ts      # Product validation schemas
│   │   └── user.schema.ts         # User validation schemas
│   │
│   ├── store/                     # State management
│   │   └── auth-store.ts          # Auth state (Zustand)
│   │
│   └── types/                     # TypeScript types
│       ├── auth-user.ts           # Auth user interface
│       ├── product.ts             # Product interface
│       └── user.ts                # User interface
│
├── public/                        # Static assets
│
├── .gitignore                     # Git ignore rules
├── ANSWERS.md                     # This file
├── components.json                # shadcn/ui config
├── Dockerfile                     # Docker configuration
├── package.json                   # Dependencies
├── pnpm-lock.yaml                 # Lock file
├── react-router.config.ts         # React Router config
├── README.md                      # Project readme
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite config
```

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     Container Layer                         │
│  • ProductsList / UsersList                                 │
│  • Orchestrates all components                              │
│  • Manages data fetching (SWR)                              │
│  • Coordinates modals                                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Presentation │    │  Custom Hooks │    │  Shared UI    │
│     Layer     │    │     Layer     │    │  Components   │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ • Filters     │    │ • useParams   │    │ • Button      │
│ • Table/Grid  │    │ • useActions  │    │ • Card        │
│ • Pagination  │    │               │    │ • Input       │
│ • Row/Card    │    │               │    │ • Select      │
│ • Search      │    │               │    │ • Table       │
│ • Sort        │    │               │    │ • Dialog      │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
        ┌──────────────────────────────────────────┐
        │           External Services              │
        ├──────────────────────────────────────────┤
        │ • API (fetch/mutate)                     │
        │ • Router (navigation)                    │
        │ • Store (auth)                           │
        │ • Toast (notifications)                  │
        │ • Schemas (validation)                   │
        └──────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────┐
│   Browser    │
│   URL Bar    │
└──────┬───────┘
       │ page=1&search=...&sortBy=...
       ▼
┌──────────────────────┐
│  useFeatureParams    │
│  • Reads URL params  │
│  • Provides updaters │
└──────┬───────────────┘
       │ { page, search, sortBy, ... }
       ▼
┌──────────────────────┐
│   Container          │
│   FeatureList()      │
└──────┬───────────────┘
       │ url = api.getFeatures(...)
       ▼
┌──────────────────────┐
│      SWR             │
│   useSWR(url)        │
└──────┬───────────────┘
       │ { data, error, isLoading }
       ▼
┌──────────────────────────────────────────┐
│        Conditional Rendering             │
├──────────────────────────────────────────┤
│ if isLoading  → LoadingSkeleton          │
│ if error      → Error Message            │
│ if data       → Content + Pagination     │
└──────────────────────────────────────────┘
       │
       ├─► Filters (search, sort)
       │    └─► updateSearch() / updateSort()
       │         └─► URL changes → refetch
       │
       ├─► Table/Grid (display)
       │    └─► Row/Card click
       │         └─► handleEdit() / handleDelete()
       │              └─► Modal opens
       │              └─► Schema validation
       │
       └─► Pagination
            └─► updatePage()
                 └─► URL changes → refetch
```

## Technology Stack

### Core

- **React 19** - UI library
- **React Router 7** - Routing with file-based routing
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Icon library

### State & Data

- **SWR** - Data fetching and caching
- **Zustand** - State management
- **Zod** - Schema validation (schemas folder)

### Forms

- **React Hook Form** - Form state management
- **Zod** - Form validation

### Development

- **pnpm** - Package manager
- **Docker** - Containerization

## Key Features

### Authentication

- Login with JWT tokens
- Token refresh mechanism
- Protected routes
- Auth state persistence (Zustand)

### Recommended Enhancements

- Analyze bundle size
- Environment configurations
- Advanced filtering
- Improve UI/UX design

# Project Structure

```
app/features/
│
├── users/
│   ├── index.tsx                   # Container
│   ├── README.md                   # Feature documentation
│   ├── ANSWERS.md                  # Architecture diagrams
│   │
│   ├── components/
│   │   ├── index.ts                # Component exports
│   │   ├── user-card.tsx           # Card display
│   │   ├── user-grid.tsx           # Grid layout
│   │   ├── user-filters.tsx        # Filters
│   │   ├── user-search-bar.tsx     # Search
│   │   ├── user-sort-select.tsx    # Sort
│   │   ├── user-pagination.tsx     # Pagination
│   │   └── user-loading-skeleton.tsx  # Loading
│   │
│   └── hooks/
│       ├── index.ts                # Hook exports
│       ├── use-user-params.ts      # URL params
│       └── use-user-actions.ts     # CRUD
│
└── products/
    ├── index.tsx                   # Container
    ├── ARCHITECTURE.md             # Architecture diagrams
    │
    ├── components/
    │   ├── index.ts                # Component exports
    │   ├── product-table-row.tsx   # Row display
    │   ├── product-table.tsx       # Table layout
    │   ├── product-filters.tsx     # Filters
    │   ├── product-search-bar.tsx  # Search
    │   ├── product-sort-select.tsx # Sort
    │   └── product-pagination.tsx  # Pagination
    │
    └── hooks/
        ├── index.ts                # Hook exports
        ├── use-product-params.ts   # URL params
        └── use-product-actions.ts  # CRUD
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
       │
       └─► Pagination
            └─► updatePage()
                 └─► URL changes → refetch
```

## Next Steps

### Recommended Enhancements

1. **Shared Components** - Extract common patterns (SearchBar, SortSelect, Pagination)
2. **Testing** - Add unit/integration tests for each component
3. **Storybook** - Document components visually
4. **Accessibility** - Add ARIA labels and keyboard navigation
5. **Performance** - Add memoization where needed

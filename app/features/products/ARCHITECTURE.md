# Products Feature Architecture

## Component Hierarchy

```
ProductsList (Container)
│
├── Header Section
│   └── Create Product Button
│
├── Card (Main Container)
│   │
│   ├── ProductFilters
│   │   ├── ProductSearchBar
│   │   └── ProductSortSelect
│   │
│   ├── Content Area (Conditional Rendering)
│   │   │
│   │   ├── SkeletonList (when loading)
│   │   │
│   │   ├── Error Message (when error)
│   │   │
│   │   └── Data Display (when loaded)
│   │       ├── ProductTable
│   │       │   └── ProductTableRow (multiple)
│   │       │       ├── Product Image
│   │       │       ├── Product Info
│   │       │       └── Action Buttons
│   │       │
│   │       └── ProductPagination
│   │
├── ProductDrawerForm (Modal)
│
└── ConfirmationDialog (Modal)
```

## Data Flow

```
URL Params ──→ useProductParams Hook ──→ API Request (SWR)
                     │                        │
                     │                        ↓
                     │                   Data Response
                     │                        │
                     ↓                        ↓
              URL Updates ←────────────── ProductsList
                                              │
                                              ├──→ ProductFilters
                                              │    (search, sort)
                                              │
                                              ├──→ ProductTable
                                              │    └──→ ProductTableRow
                                              │         (display, view, edit, delete)
                                              │
                                              └──→ ProductPagination
                                                   (page navigation)
```

## State Management

### URL State (via useProductParams)

- `page` - Current page number
- `limit` - Items per page (default: 10)
- `search` - Search query
- `sortBy` - Sort field (title, price, brand, category)
- `order` - Sort direction (asc/desc)

### Local State (via useProductActions)

- `drawerOpen` - Product form drawer visibility
- `editingProduct` - Product being edited
- `deleteDialogOpen` - Delete confirmation dialog visibility
- `productToDelete` - Product ID pending deletion

### Server State (via SWR)

- `data` - Products data from API
- `error` - Error state
- `isLoading` - Loading state

## Event Flow

### Search Flow

```
User types ──→ ProductSearchBar ──→ updateSearch() ──→ URL update ──→ API refetch
```

### Sort Flow

```
User selects ──→ ProductSortSelect ──→ updateSort() ──→ URL update ──→ API refetch
```

### Pagination Flow

```
User clicks ──→ ProductPagination ──→ updatePage() ──→ URL update ──→ API refetch
```

### View Flow

```
User clicks View ──→ ProductTableRow ──→ Navigate to product detail page
```

### Edit Flow

```
User clicks Edit ──→ ProductTableRow ──→ handleEdit() ──→ Open drawer ──→ Submit ──→ Mutate cache
```

### Delete Flow

```
User clicks Delete ──→ ProductTableRow ──→ openDeleteDialog() ──→ Confirm ──→ API delete ──→ Mutate cache
```

## Responsibilities

### ProductsList (Container)

- Fetch data from API
- Coordinate sub-components
- Handle modals (drawer, dialog)
- Manage overall layout

### useProductParams

- Read URL parameters
- Update URL parameters
- Reset pagination on filter changes

### useProductActions

- Handle CRUD operations
- Manage modal states
- Show toast notifications
- Invalidate cache after mutations

### ProductFilters

- Combine search and sort controls
- Provide unified filter interface

### ProductTable

- Render products in table layout
- Handle empty state
- Pass actions to rows
- Display table headers

### ProductTableRow

- Display product information
- Show product thumbnail
- Provide view/edit/delete buttons
- Link to product detail page

### ProductPagination

- Show pagination controls
- Display item counts
- Handle page navigation

## Key Differences from Users Feature

1. **Table Layout** - Products use table instead of grid (better for tabular data)
2. **View Action** - Products have a view/detail page, users don't
3. **Thumbnail Images** - Products display thumbnail images in table
4. **Different Sort Fields** - title, price, brand, category vs firstName, lastName, email, age
5. **Items Per Page** - 10 for products vs 12 for users

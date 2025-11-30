# Users Feature Architecture

## Component Hierarchy

```
UsersList (Container)
│
├── Header Section
│   └── Create User Button
│
├── Card (Main Container)
│   │
│   ├── UserFilters
│   │   ├── UserSearchBar
│   │   └── UserSortSelect
│   │
│   ├── Content Area (Conditional Rendering)
│   │   │
│   │   ├── UserLoadingSkeleton (when loading)
│   │   │
│   │   ├── Error Message (when error)
│   │   │
│   │   └── Data Display (when loaded)
│   │       ├── UserGrid
│   │       │   └── UserCard (multiple)
│   │       │       ├── Avatar
│   │       │       ├── User Info
│   │       │       └── Action Buttons
│   │       │
│   │       └── UserPagination
│   │
├── UserDrawerForm (Modal)
│
└── ConfirmationDialog (Modal)
```

## Data Flow

```
URL Params ──→ useUserParams Hook ──→ API Request (SWR)
                     │                      │
                     │                      ↓
                     │                  Data Response
                     │                      │
                     ↓                      ↓
              URL Updates ←──────────── UsersList
                                            │
                                            ├──→ UserFilters
                                            │    (search, sort)
                                            │
                                            ├──→ UserGrid
                                            │    └──→ UserCard
                                            │         (display, edit, delete)
                                            │
                                            └──→ UserPagination
                                                 (page navigation)
```

## State Management

### URL State (via useUserParams)

- `page` - Current page number
- `limit` - Items per page
- `search` - Search query
- `sortBy` - Sort field
- `order` - Sort direction (asc/desc)

### Local State (via useUserActions)

- `drawerOpen` - User form drawer visibility
- `editingUser` - User being edited
- `deleteDialogOpen` - Delete confirmation dialog visibility
- `userToDelete` - User ID pending deletion

### Server State (via SWR)

- `data` - Users data from API
- `error` - Error state
- `isLoading` - Loading state

## Event Flow

### Search Flow

```
User types ──→ UserSearchBar ──→ updateSearch() ──→ URL update ──→ API refetch
```

### Sort Flow

```
User selects ──→ UserSortSelect ──→ updateSort() ──→ URL update ──→ API refetch
```

### Pagination Flow

```
User clicks ──→ UserPagination ──→ updatePage() ──→ URL update ──→ API refetch
```

### Edit Flow

```
User clicks Edit ──→ UserCard ──→ handleEdit() ──→ Open drawer ──→ Submit ──→ Mutate cache
```

### Delete Flow

```
User clicks Delete ──→ UserCard ──→ openDeleteDialog() ──→ Confirm ──→ API delete ──→ Mutate cache
```

## Responsibilities

### UsersList (Container)

- Fetch data from API
- Coordinate sub-components
- Handle modals (drawer, dialog)
- Manage overall layout

### useUserParams

- Read URL parameters
- Update URL parameters
- Reset pagination on filter changes

### useUserActions

- Handle CRUD operations
- Manage modal states
- Show toast notifications
- Invalidate cache after mutations

### UserFilters

- Combine search and sort controls
- Provide unified filter interface

### UserGrid

- Render users in grid layout
- Handle empty state
- Pass actions to cards

### UserCard

- Display user information
- Provide edit/delete buttons
- Show avatar and badges

### UserPagination

- Show pagination controls
- Display item counts
- Handle page navigation

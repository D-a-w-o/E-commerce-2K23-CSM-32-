# E-Commerce SDLC - Sprint 2: Catalog Data Foundation

## 1. Sprint Goal and Scope Boundary
**Goal:** To turn the Sprint 1 architecture into a reliable database foundation. The system must persist categories, products, variants, and SKUs without losing identity, relationship, price, or inventory meaning. 
**Scope Boundary:** In-scope items include category tree management, product creation, variant/SKU management, database migrations, constraints, basic administrative CRUD APIs, and seed data. Out-of-scope items include frontend public search, dynamic specifications, order placement, and checkout flows.

## 2. Link to Sprint 1 Decisions
This sprint builds upon the original MVP tech stack and architecture defined in [SPRINT_1.md](./SPRINT_1.md). We are extending the MVP data models to support a robust catalog foundation.

## 3. Updated ERD and Data Dictionary
Below is the updated Entity-Relationship Diagram focusing on the Catalog Data Foundation:

```mermaid
erDiagram
    CATEGORIES ||--o{ CATEGORIES : "parent"
    CATEGORIES ||--o{ PRODUCTS : "contains"
    PRODUCTS ||--o{ VARIANTS : "has"
    VARIANTS ||--o{ SKUS : "materializes"
    PRODUCTS ||--o{ ASSETS : "displays"
    PRODUCTS ||--o{ CART_ITEMS : "selected_as"
    SKUS ||--o{ ORDER_ITEMS : "sold_as"

    CATEGORIES {
        uuid id PK
        uuid parent_id FK "Nullable"
        string name
        string slug "UNIQUE"
        boolean active_status
        datetime created_at
        datetime updated_at
    }
    PRODUCTS {
        uuid id PK
        uuid category_id FK
        string name
        string slug "UNIQUE"
        string description
        string status "Draft / Published"
        datetime created_at
        datetime updated_at
    }
    VARIANTS {
        uuid id PK
        uuid product_id FK
        jsonb option_values
    }
    SKUS {
        uuid id PK
        uuid variant_id FK
        string sku_code "UNIQUE"
        integer price "Integer minor units (e.g., cents/paisa)"
        integer stock_quantity "CHECK >= 0"
        boolean active_status
    }
    ASSETS {
        uuid id PK
        uuid reference_id FK "Product or Variant ID"
        string storage_url
        string role
        string alt_text
        integer sort_order
    }

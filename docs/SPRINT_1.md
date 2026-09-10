# Sprint 1: System Architecture & Scope Definition
**Course:** E-Commerce  
**Document Path:** `/docs/SPRINT_1.md`  
**SDLC Phase:** Phase 1 – Inception, Requirements & Architectural Planning  

---

## Section 1: Target Audience & Market Focus

### Primary Persona
* **Name:** Hamza Tariq
* **Demographic Profile:** 24-year-old Software Engineer and hardware enthusiast.
* **Technical Proficiency:** High; frequently researches and purchases computing equipment and electronics online.
* **Behavioral Drivers:** Demands granular product specifications, transparent inventory availability without post-checkout cancellations, and a minimalist checkout pipeline.

### Core Pain Point
Mainstream retail marketplaces suffer from fragmented and superficial product specifications, lack of real-time inventory synchronization leading to post-purchase order cancellations, and bloated multi-step checkout interfaces that increase user drop-off. Customers lack a dedicated platform that pairs verifiable technical data sheets with guaranteed real-time stock allocation.

### Domain Scope
* **Vertical Market:** Consumer Electronics (Specialized Computer Peripherals, Mechanical Keyboards, and Custom Desk Hardware).
* **Operational Boundary:** B2C e-commerce model focusing on specialized hardware cataloging, real-time inventory validation, and structured order lifecycle tracking.

---

## Section 2: Minimum Viable Product (MVP) Feature Scope

| Category | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **Authentication** | User Registration & Authentication | Secure registration and login workflows implementing bcrypt password hashing and stateless JSON Web Token (JWT) issuance with role-based access control (Customer vs. Admin). | **High (MVP)** |
| **Catalog** | Product List & Search | Taxonomy-driven product discovery interface supporting server-side pagination, category-based filtering, price range sorting, and keyword search indexing. | **High (MVP)** |
| **Cart** | Cart Management | State-persistent shopping cart allowing authenticated and guest users to add, increment, decrement, and remove items with dynamic subtotal recalculation. | **High (MVP)** |
| **Checkout** | Order Processing | Multi-step checkout pipeline validating shipping addresses, supporting mock/Stripe payment gateway integration, and instantiating immutable order records. | **High (MVP)** |
| **Order Management** | Order History & Status Tracking | Customer dashboard rendering past order invoices, itemized purchasing records, and real-time status progression (`Pending` → `Processing` → `Shipped` → `Delivered`). | **Medium** |
| **Admin** | Inventory Control | Protected administrative portal providing CRUD operations for catalog items, category assignment, and real-time stock level modifications. | **Medium** |

---

## Section 3: Tech Stack Selection & Justification

### 1. Frontend Framework: React.js (with Tailwind CSS)
* **Justification:** React was selected over Angular and Vue due to its virtual DOM performance and robust component-driven ecosystem, which facilitates modular UI development for complex catalog filters and dynamic cart states. Tailwind CSS provides a utility-first styling system that avoids CSS bloat and accelerates responsive layout prototyping compared to standard component libraries.

### 2. Backend Infrastructure: Node.js with Express.js
* **Justification:** Node.js utilizes an event-driven, non-blocking I/O architecture that handles high-throughput, concurrent I/O operations (such as catalog queries and order mutations) with lower latency than traditional thread-per-request architectures like Django or Spring Boot. Express.js provides a lightweight, unopinionated routing layer that minimizes operational overhead and enables a unified JavaScript/TypeScript codebase across client and server tiers.

### 3. Database Management System: PostgreSQL
* **Justification:** PostgreSQL was chosen over MongoDB due to its strict schema enforcement, ACID compliance, and robust relational modeling capabilities, which prevent stock race conditions and ensure transaction consistency during checkout. Relational foreign key constraints and normalization are mandatory for financial auditing and relational integrity across users, orders, and products.

### 4. Caching & Asynchronous Processing: Redis (Optional / In-Memory Tier)
* **Justification:** Redis is utilized as an in-memory key-value store to cache high-frequency, read-heavy catalog data and maintain ephemeral session states. This setup mitigates relational database load during traffic spikes and maintains response latencies below 50ms compared to executing repeated disk-bound SQL queries.

---

## Section 4: Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o| CARTS : "owns"
    USERS ||--o{ ORDERS : "places"
    CATEGORIES ||--o{ PRODUCTS : "categorizes"
    CARTS ||--o{ CART_ITEMS : "contains"
    PRODUCTS ||--o{ CART_ITEMS : "referenced_in"
    ORDERS ||--|{ ORDER_ITEMS : "contains"
    PRODUCTS ||--o{ ORDER_ITEMS : "ordered_in"

    USERS {
        INTEGER id PK
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR full_name
        VARCHAR role
        TIMESTAMP created_at
    }

    CATEGORIES {
        INTEGER id PK
        VARCHAR name UK
        VARCHAR slug UK
        TEXT description
        TIMESTAMP created_at
    }

    PRODUCTS {
        INTEGER id PK
        INTEGER category_id FK
        VARCHAR title
        VARCHAR sku UK
        DECIMAL price
        INTEGER stock_quantity
        TEXT description
        BOOLEAN is_active
        TIMESTAMP created_at
    }

    CARTS {
        INTEGER id PK
        INTEGER user_id FK
        TIMESTAMP updated_at
    }

    CART_ITEMS {
        INTEGER id PK
        INTEGER cart_id FK
        INTEGER product_id FK
        INTEGER quantity
        TIMESTAMP added_at
    }

    ORDERS {
        INTEGER id PK
        INTEGER user_id FK
        DECIMAL total_amount
        VARCHAR status
        VARCHAR payment_method
        VARCHAR payment_status
        TEXT shipping_address
        TIMESTAMP created_at
    }

    ORDER_ITEMS {
        INTEGER id PK
        INTEGER order_id FK
        INTEGER product_id FK
        INTEGER quantity
        DECIMAL unit_price
    }

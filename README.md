# 🚀 Analytics Platform

A scalable **event-driven analytics platform** built with a microservices architecture, featuring asynchronous processing, **pre-aggregated analytics**, and **production-grade data consistency guarantees**.

---

## 🧠 Architecture Overview

This project follows a **service-oriented architecture with OLTP + OLAP separation** and async processing:

```
Frontend → Gateway (GraphQL)
                 ↓
        ┌────────┴────────┐
        ↓                 ↓
Event Service        Analytics Service
   (OLTP)                (OLAP)
        ↓
 Queue (Redis + BullMQ)
        ↓
      Worker
        ↓
 ┌───────────────┴────────────────┐
 ↓                                ↓
Raw Events (MongoDB)     Aggregates (MongoDB)
```

---

## 🧩 Services

### 🟣 Gateway (`apps/gateway`)

* GraphQL API (Apollo Server + Express)
* Aggregates data from internal services
* Does **NOT** access the database directly
* Acts as a unified entry point
* Exposes `/graphql` and `/health`

---

### 🔵 Event Service (`services/event-service`)

* Receives incoming events via REST
* Generates **eventId (idempotency key)**
* Pushes events to a queue (Redis/BullMQ)
* Supports querying raw events (`/events`)
* Handles **write-heavy (OLTP)** workload
* Exposes `/health`

---

### 🟠 Analytics Service (`services/analytics-service`)

* Handles analytics queries
* Reads from **pre-aggregated collections**
* Falls back to Mongo aggregation pipeline if needed
* Optimized for **read-heavy (OLAP)** workloads
* Exposes `/events/stats` and `/health`

---

### 🟢 Worker (`services/worker`)

* Consumes jobs from the queue
* Persists raw events into MongoDB
* Updates **pre-aggregated analytics collections**
* Guarantees:

  * ✅ **Idempotency** (no duplicate processing)
  * ✅ **Atomicity** (MongoDB transactions)
  * ✅ **Consistency under retries**

---

## 📦 Shared Packages

### 🟡 `packages/shared-types`

* Zod schemas (validation)
* Shared TypeScript types (contracts between services)

---

### 🟡 `packages/shared-infra`

* Validation middleware
* Request typing (`ValidatedRequest`)
* Reusable infrastructure utilities

---

### 🟡 `packages/models`

* Shared Mongoose models:

  * `EventModel` (raw events)
  * `EventsByType`
  * `EventsByUser`
  * `EventsByDay`

* Ensures schema consistency across services

---

## ⚙️ Tech Stack

* Node.js + TypeScript
* GraphQL (Apollo Server)
* Express
* MongoDB (Mongoose + Transactions)
* Redis + BullMQ
* Zod (validation + typing)
* Vite (Frontend)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Setup environment variables

```bash
cp services/event-service/.env.example services/event-service/.env
cp services/analytics-service/.env.example services/analytics-service/.env
cp services/worker/.env.example services/worker/.env
cp apps/gateway/.env.example apps/gateway/.env
```

---

### 3. One-command setup (recommended)

```bash
npm run dev:setup
```

This will:

* Start MongoDB and Redis via Docker
* Initialize and configure MongoDB replica set
* Wait until MongoDB is PRIMARY
* Start all services

---

### 4. Manual setup (optional)

```bash
npm run dev:infra
npm run dev
```

---

## 📡 API Usage

### ➤ Send an event

```http
POST http://localhost:4001/events
```

```json
{
  "eventId": "uuid",
  "type": "click",
  "userId": "123"
}
```

---

### ➤ Query raw events (GraphQL)

```graphql
query {
  events(input: { limit: 10 }) {
    data {
      id
      type
      userId
      createdAt
    }
    pagination {
      nextCursor
      hasMore
    }
  }
}
```

---

### ➤ Query analytics (pre-aggregated)

```graphql
query {
  eventStats(input: {
    groupBy: TYPE
  }) {
    key
    count
  }
}
```

---

## 🧠 Key Concepts

### ✔ OLTP vs OLAP Separation

* **OLTP** → raw event ingestion (Event Service)
* **OLAP** → analytics queries (Analytics Service)

---

### ✔ Asynchronous Processing

* Events are queued using BullMQ
* Worker processes them in the background
* Prevents API bottlenecks

---

### ✔ Pre-Aggregation (Materialized Views)

* Aggregations are computed at **write-time**

* Stored in collections:

  * `events_by_type`
  * `events_by_user`
  * `events_by_day`
* Enables **fast read queries**

---

### ✔ Idempotency (Exactly-Once Processing)

* Each event has a unique `eventId`
* Enforced via **unique index in MongoDB**
* Duplicate jobs are safely ignored
* Prevents double counting under retries

---

### ✔ Transactions (Atomic Writes)

* Event insert + aggregation updates run in a **single transaction**
* Guarantees:

  * all succeed ✅
  * or all rollback ✅

---

### ✔ Eventual Consistency

* Analytics are updated asynchronously by the worker
* Slight delay is expected, but data remains consistent

---

### ✔ Infrastructure Automation

* Automated setup script (`dev:setup`)

* Handles:

  * container startup
  * replica set initialization
  * primary election readiness

* Ensures **reproducible local environments**

---

## 📦 Project Structure

```
analytics-platform/
├── apps/
│   ├── gateway/
│   └── frontend/
├── services/
│   ├── event-service/
│   ├── analytics-service/
│   └── worker/
├── packages/
│   ├── shared-types/
│   ├── shared-infra/
│   └── models/
├── infrastructure/
│   └── docker/
├── scripts/
│   └── setup.js
```

---

## 🔥 Features

* Event-driven ingestion pipeline
* Async processing with BullMQ
* Pre-aggregated analytics (fast reads)
* Idempotent processing (safe retries)
* MongoDB transactions (strong consistency)
* GraphQL API gateway
* Cursor-based pagination
* Shared contracts across services
* Health checks for all services
* Automated development environment setup

---

## 🚧 Future Improvements

* Redis caching layer for hot analytics queries
* Batch aggregation (reduce write pressure)
* Authentication & authorization
* Rate limiting
* Observability (metrics, tracing, logs)
* Kafka / NATS for event streaming
* Deployment (Docker → Kubernetes)

---

## 📄 License

MIT

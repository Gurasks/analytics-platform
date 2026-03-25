# 🚀 Analytics Platform

A scalable **event-driven analytics platform** built with a microservices architecture, featuring asynchronous processing, **pre-aggregated analytics**, and **production-grade data consistency guarantees**.

---

## 🧠 Architecture Overview

This project follows a **microservices-based, event-driven architecture** with OLTP + OLAP separation and async processing:

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
* Publishes events to a queue enabling an **event-driven pipeline**
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

---

## ⚙️ Tech Stack

* Node.js + TypeScript
* GraphQL (Apollo Server)
* Express
* MongoDB (Mongoose + Transactions)
* Redis + BullMQ
* Zod (validation + typing)
* Vite (Frontend)
* Docker (local environment)

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
* Initialize MongoDB replica set
* Wait for PRIMARY election
* Start all services

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

## 🌱 Seeding & Testing

### ➤ Run seed script

```bash
npm run seed
```

---

### ➤ Custom seed

```bash
npm run seed -- 500 20
```

---

### ⚡ Stress test

```bash
npm run seed -- 5000 50 stress
```

* Simulates high throughput
* Validates queue + worker scalability

---

### 🧪 Duplicate test (idempotency)

```bash
npm run seed -- 50 5 duplicate
```

Expected result:

```
events = 1
aggregates = 1
```

---

### ⏳ Time-based test

```bash
npm run seed -- 200 10 time
```

---

## 🧠 Key Concepts

### ✔ Event-Driven Architecture

* Services communicate asynchronously via queue
* Decouples ingestion from processing
* Enables scalability and resilience

---

### ✔ OLTP vs OLAP Separation

* **OLTP** → ingestion (Event Service)
* **OLAP** → analytics (Analytics Service)

---

### ✔ Asynchronous Processing

* Queue-based processing with workers
* Improves throughput and responsiveness

---

### ✔ Pre-Aggregation

* Aggregations computed at write-time
* Enables fast analytics queries

---

### ✔ Idempotency

* Unique `eventId` ensures duplicate-safe processing
* Prevents double counting

---

### ✔ Transactions

* Atomic writes across collections
* Ensures consistency

---

### ✔ Eventual Consistency

* Analytics updated asynchronously
* Slight delay accepted for scalability

---

### ✔ Scalability

* Horizontal worker scaling
* Queue-based load leveling
* Read optimization via pre-aggregation
* Decoupled services for independent scaling

---

### ✔ Fault Tolerance

* Retry mechanism for failed jobs
* Safe reprocessing via idempotency
* Consistent behavior under failures

---

### ✔ API Design

* REST APIs for ingestion and analytics
* GraphQL gateway for flexible queries
* Clear separation of read/write responsibilities

---

### ✔ Infrastructure Automation

* Automated setup via `dev:setup`
* Ensures reproducible local environments

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
│   ├── setup.js
│   └── seed.js
```

---

## 🔥 Features

* Event-driven ingestion pipeline
* Async processing with BullMQ
* Pre-aggregated analytics
* Idempotent processing
* MongoDB transactions
* GraphQL API gateway
* Cursor-based pagination
* Shared contracts across services
* Health checks
* Automated dev environment
* Advanced seed testing

---

## 🚧 Future Improvements

* Redis caching layer
* Batch aggregation
* Authentication & authorization
* Rate limiting
* Observability (metrics, tracing, logs)
* Kafka / NATS integration for event streaming
* Deployment with Kubernetes

---

## 🔄 Event Streaming Evolution

* Current: BullMQ (Redis)
* Future: Kafka / NATS
* Same event-driven principles apply (producers/consumers, retries, idempotency)

---

## 📄 License

MIT

# 🚀 Analytics Platform

A scalable **event-driven analytics platform** built with a microservices architecture, featuring asynchronous processing, GraphQL API, analytics aggregation, and clean service boundaries.

---

## 🧠 Architecture Overview

This project follows a **service-oriented architecture with OLTP + OLAP separation**:

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
     MongoDB
```

---

## 🧩 Services

### 🟣 Gateway (`apps/gateway`)

* GraphQL API (Apollo Server + Express)
* Aggregates data from services
* Does NOT access the database directly
* Acts as a unified entry point
* Exposes `/graphql` and `/health`

---

### 🔵 Event Service (`services/event-service`)

* Receives incoming events via REST
* Pushes events to a queue (Redis/BullMQ)
* Supports querying raw events (`/events`)
* Handles **write-heavy (OLTP)** workload
* Exposes `/health`

---

### 🟠 Analytics Service (`services/analytics-service`)

* Handles aggregation queries (MongoDB aggregation pipeline)
* Provides analytics endpoints (`/events/stats`)
* Optimized for **read-heavy (OLAP)** workloads
* Decoupled from event ingestion
* Exposes `/health`

---

### 🟢 Worker (`services/worker`)

* Consumes jobs from the queue
* Processes and persists events into MongoDB
* Handles asynchronous event processing

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

* Shared Mongoose models
* Ensures schema consistency across services

---

## ⚙️ Tech Stack

* **Node.js + TypeScript**
* **GraphQL (Apollo Server)**
* **Express**
* **MongoDB (Mongoose)**
* **Redis + BullMQ**
* **Zod (validation + typing)**
* **Vite (Frontend)**

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Setup environment variables

Copy `.env.example` files:

```bash
cp services/event-service/.env.example services/event-service/.env
cp services/analytics-service/.env.example services/analytics-service/.env
cp services/worker/.env.example services/worker/.env
cp apps/gateway/.env.example apps/gateway/.env
```

---

### 3. Start infrastructure (MongoDB + Redis)

Make sure Docker is running:

```bash
npm run dev:infra
```

---

### 4. Run the application

```bash
npm run dev
```

This will start:

* Gateway → http://localhost:4000/graphql
* Event Service → http://localhost:4001
* Analytics Service → http://localhost:4002
* Worker → background processing
* Frontend → http://localhost:5173

---

## 📡 API Usage

---

### ➤ Send an event

```http
POST http://localhost:4001/events
```

```json
{
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

### ➤ Query analytics (aggregation)

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

### ➤ Direct analytics API (optional)

```http
POST http://localhost:4002/events/stats
```

```json
{
  "groupBy": "TYPE"
}
```

---

## 🧪 Health Checks

Each service exposes a health endpoint:

```text
GET /health
```

Examples:

```bash
curl http://localhost:4001/health   # event-service
curl http://localhost:4002/health   # analytics-service
curl http://localhost:4000/health   # gateway
```

---

## 🧠 Key Concepts

### ✔ Separation of Concerns

* Gateway → orchestration
* Event Service → ingestion (OLTP)
* Analytics Service → aggregation (OLAP)
* Worker → async processing

---

### ✔ Asynchronous Processing

* Events are queued using BullMQ
* Worker processes and persists data
* Decouples ingestion from database writes

---

### ✔ Shared Contracts

* Zod schemas ensure validation consistency
* Shared types prevent mismatch between services

---

### ✔ Modular GraphQL Architecture

* Schema split into modules (event / analytics)
* Resolvers organized by domain

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
```

---

## 🔥 Features

* Event ingestion pipeline
* Asynchronous job processing
* GraphQL API gateway
* Analytics aggregation service
* Cursor-based pagination
* Schema validation (Zod)
* Shared contracts across services
* Health checks for all services
* Clean microservices architecture

---

## 🚧 Future Improvements

* Pre-aggregated analytics (materialized views / Redis)
* Authentication & authorization
* Rate limiting
* Observability (logging, tracing, metrics)
* GraphQL query complexity limits
* Service-to-service messaging (Kafka / NATS)
* Deployment (Docker Compose → Kubernetes)

---

## 📄 License

MIT

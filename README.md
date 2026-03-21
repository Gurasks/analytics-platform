# 🚀 Analytics Platform

A scalable event-driven analytics platform built with a microservices architecture, featuring asynchronous processing, GraphQL API, and clean service boundaries.

---

## 🧠 Architecture Overview

This project follows a **service-oriented architecture**:

```
Frontend → Gateway (GraphQL)
                 ↓
          Event Service (REST)
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

* GraphQL API (Apollo Server)
* Aggregates data from services
* Does NOT access the database directly

### 🔵 Event Service (`services/event-service`)

* Receives incoming events via REST
* Pushes events to a queue (Redis/BullMQ)
* Exposes read endpoints (`/events`)

### 🟢 Worker (`services/worker`)

* Consumes jobs from the queue
* Processes and persists events into MongoDB

### 🟡 Shared Packages (`packages/models`)

* Shared Mongoose models
* Used across services to maintain consistency

---

## ⚙️ Tech Stack

* **Node.js + TypeScript**
* **GraphQL (Apollo Server)**
* **Express**
* **MongoDB (Mongoose)**
* **Redis + BullMQ**
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
cp services/worker/.env.example services/worker/.env
cp apps/gateway/.env.example apps/gateway/.env
```

---

### 3. Start infrastructure (MongoDB + Redis)

Make sure Docker is running, then:

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
* Worker → background processing
* Frontend → http://localhost:5173

---

## 📡 API Usage

### ➤ Send an event

```http
POST http://localhost:4001/events
```

```json
{
  "type": "click",
  "userId": "123",
  "data": {
    "page": "home"
  }
}
```

---

### ➤ Query events (GraphQL)

Open:

```
http://localhost:4000/graphql
```

Example query:

```graphql
query {
  events {
    type
    userId
    createdAt
  }
}
```

---

## 🧪 Development Notes

* Each service has its own `.env` and `config.ts`
* Environment variables are validated at startup
* Gateway communicates with services via HTTP (no direct DB access)
* Worker handles asynchronous processing via BullMQ

---

## 📦 Project Structure

```
analytics-platform/
├── apps/
│   ├── gateway/
│   └── frontend/
├── services/
│   ├── event-service/
│   └── worker/
├── packages/
│   └── models/
├── infrastructure/
│   └── docker/
```

---

## 🔥 Features

* Event ingestion pipeline
* Asynchronous job processing
* GraphQL API gateway
* Service decoupling
* Environment-based configuration
* Shared models across services

---

## 🚧 Future Improvements

* Filtering and pagination in GraphQL
* Authentication & authorization
* Rate limiting
* Observability (logs, metrics)
* Service-to-service communication via message broker
* Deployment (Docker/Kubernetes)

---

## 📄 License

MIT

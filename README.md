# Rate Limiter System (Spring Boot + React)

A full-stack project that demonstrates **four classic rate-limiting algorithms** implemented in **Spring Boot (backend)** and visualized through a **React (Vite + TypeScript)** frontend.  
This system simulates API traffic control to ensure fair usage and prevent abuse under high load conditions.

---

## Overview

The project allows users to test and compare the following rate-limiting strategies:

- **Token Bucket**
- **Leaky Bucket**
- **Fixed Window Counter**
- **Sliding Window Log**

Each API call responds whether the request is **allowed** or **blocked** based on the selected algorithm.

You can learn more about these algorithms here : [Rate Limiting Algorithms](https://bytebytego.com/courses/system-design-interview/design-a-rate-limiter)

---

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Maven**
- **Factory + Strategy Design Patterns**
- **CORS Configuration**
- **Dockerized**

### Frontend
- **React 18 + Vite**
- **TypeScript**
- **Axios** (for REST API calls)
- **TailwindCSS** *(optional for styling)*
- **Dockerized**

### DevOps
- **Docker** + **Docker Compose**
- **Bridge Networking** for frontend-backend communication

---

## Quick Start (Using Docker Compose)

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Clone the repository

```bash
git clone https://github.com/Prezzy06/rate-limiter-project.git
cd rate-limiter-project
```

---

### Build and run both frontend + backend

```bash
docker-compose up --build
```


This will:

- Build the backend (Spring Boot JAR)

- Build the frontend (Vite dev server)

- Run both inside connected containers

### Access the app

- Frontend → http://localhost:5173

- Backend → http://localhost:8080

## Development (Without Docker)

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features 

- Four rate-limiting strategies implemented from scratch

- Clean RESTful API structure

- Error handling with proper HTTP status codes (200 / 429)

- CORS enabled for frontend integration

- Dockerized full-stack environment

- Ready for deployment or scaling




# Technical Specification Document

## 1. Overview

This document provides the technical specifications for the **Multi-Tenant SaaS Project & Task Management System**. It explains the project structure, development setup, environment configuration, and instructions to run the application locally and using Docker. This document serves as a reference for developers and evaluators to understand how the system is organized and executed.

---

## 2. Project Structure

### 2.1 Backend Folder Structure

```
backend/
├── src/
│   ├── controllers/      # API request handlers
│   ├── models/           # Database models / ORM schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Auth, RBAC, tenant isolation, validation
│   ├── services/         # Business logic and audit logging
│   ├── utils/            # Helper functions and constants
│   └── config/           # Database and app configuration
├── migrations/           # Database migration files
├── seeds/                # Seed data scripts
├── tests/                # Unit and integration tests
├── Dockerfile            # Backend Docker configuration
└── package.json          # Backend dependencies and scripts
```

**Purpose:**

* Ensures clear separation of concerns
* Simplifies maintenance and scalability
* Supports automated migrations and seed loading

---

### 2.2 Frontend Folder Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages (Login, Dashboard, etc.)
│   ├── services/         # API service layer
│   ├── context/          # Authentication and global state
│   ├── routes/           # Protected and public routes
│   ├── assets/           # Images, icons, styles
│   └── utils/            # Helper functions
├── public/               # Static files
├── Dockerfile            # Frontend Docker configuration
└── package.json          # Frontend dependencies and scripts
```

**Purpose:**

* Component-based UI architecture
* Role-based rendering
* Clean separation between UI and API logic

---

## 3. Environment Configuration

### 3.1 Backend Environment Variables

The backend uses environment variables for configuration. A template file `.env.example` is provided.

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=saas_db
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_EXPIRES_IN=24h

PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000
```

**Notes:**

* All sensitive values are stored in environment variables
* For evaluation, a `.env` file with test values must be committed

---

## 4. Development Setup Guide

### 4.1 Prerequisites

* Node.js (v18 or later)
* PostgreSQL (v15)
* Docker & Docker Compose
* Git

---

### 4.2 Local Backend Setup

1. Navigate to backend folder:

   ```
   cd backend
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Configure environment variables:

   ```
   cp .env.example .env
   ```
4. Run migrations and seed data:

   ```
   npm run migrate
   npm run seed
   ```
5. Start backend server:

   ```
   npm run dev
   ```

Backend will be available at:

```
http://localhost:5000
```

---

### 4.3 Local Frontend Setup

1. Navigate to frontend folder:

   ```
   cd frontend
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Start frontend application:

   ```
   npm start
   ```

Frontend will be available at:

```
http://localhost:3000
```

---

## 5. Docker-Based Setup (Mandatory)

The application is fully containerized using Docker and Docker Compose.

### 5.1 Running the Application

From the project root:

```
docker-compose up -d
```

This command starts:

* PostgreSQL database container
* Backend API container
* Frontend application container

---

### 5.2 Automatic Initialization

* Database migrations run automatically on backend startup
* Seed data loads automatically after migrations
* No manual commands are required

---

## 6. Health Check

The backend exposes a health check endpoint:

```
GET /api/health
```

**Response:**

```
{
  "status": "ok",
  "database": "connected"
}
```

This endpoint confirms that:

* Backend is running
* Database connection is successful
* Migrations and seed data are complete

---

## 7. Testing Guidelines

* Unit tests validate individual services and utilities
* Integration tests validate API endpoints
* Authentication and tenant isolation must be tested thoroughly

---

## 8. Conclusion

This technical specification defines a clean, scalable, and production-ready structure for the multi-tenant SaaS system. Following this structure ensures consistent development, smooth deployment, and successful evaluation.

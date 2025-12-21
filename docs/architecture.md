# System Architecture Document

## 1. Overview

This document describes the overall system architecture of the **Multi-Tenant SaaS Project & Task Management System**. The architecture is designed to support multiple tenants with strict data isolation, secure authentication, role-based access control, and scalability. The system follows a modular, service-oriented design that separates concerns between frontend, backend, and database layers.

---

## 2. High-Level System Architecture

### 2.1 Architecture Description

The system consists of the following main components:

1. **Client (Web Browser)**

   * Used by Super Admins, Tenant Admins, and End Users
   * Interacts with the system via HTTPS

2. **Frontend Application**

   * Provides the user interface for authentication, dashboards, and management screens
   * Communicates with the backend via REST APIs
   * Handles role-based UI rendering

3. **Backend API Server**

   * Implements all business logic
   * Handles authentication, authorization, and tenant isolation
   * Exposes RESTful APIs for frontend consumption

4. **Database (PostgreSQL)**

   * Stores all tenant, user, project, task, and audit data
   * Enforces relationships, constraints, and data integrity

5. **Authentication Flow (JWT)**

   * Issues JWT tokens after successful login
   * Tokens include userId, tenantId, and role
   * Tokens are validated on every API request

---

### 2.2 System Architecture Diagram

The system architecture diagram visually represents the interaction between the client, frontend, backend, authentication layer, and database.

**Diagram includes:**

* Browser → Frontend
* Frontend → Backend APIs
* Backend → Database
* JWT authentication flow

📌 **Diagram File:**

```
docs/images/system-architecture.png
```

---

## 3. Database Architecture

### 3.1 Database Design Principles

The database follows a **shared database, shared schema** multi-tenancy model. All tenant data resides in the same set of tables and is isolated using a `tenant_id` column.

Key principles:

* Every tenant-specific record includes `tenant_id`
* Queries are always filtered using `tenant_id`
* Super Admin users have `tenant_id = NULL`
* Strong foreign key constraints ensure integrity

---

### 3.2 Entity Relationship Diagram (ERD)

The ERD illustrates the relationships between core entities:

**Core Tables:**

* tenants
* users
* projects
* tasks
* audit_logs

**Relationships:**

* One tenant → many users
* One tenant → many projects
* One project → many tasks
* One user → many assigned tasks
* Audit logs linked to users and tenants

📌 **ERD File:**

```
docs/images/database-erd.png
```

---

### 3.3 Tenant Isolation Strategy

Tenant isolation is enforced at multiple levels:

* JWT tokens carry tenant_id
* Middleware extracts tenant_id from JWT
* All database queries filter by tenant_id
* Client-provided tenant identifiers are ignored

This approach ensures that no tenant can access another tenant’s data, even through malicious API calls.

---

## 4. API Architecture

### 4.1 API Design Approach

The backend exposes RESTful APIs following standard HTTP methods and response formats. APIs are grouped by modules to maintain clarity and scalability.

**Modules:**

* Authentication
* Tenant Management
* User Management
* Project Management
* Task Management

---

### 4.2 API Endpoint Overview

| Module   | Example Endpoints                                       |
| -------- | ------------------------------------------------------- |
| Auth     | POST /api/auth/login, GET /api/auth/me                  |
| Tenants  | GET /api/tenants, PUT /api/tenants/:id                  |
| Users    | POST /api/tenants/:id/users, GET /api/tenants/:id/users |
| Projects | POST /api/projects, GET /api/projects                   |
| Tasks    | POST /api/projects/:id/tasks, PUT /api/tasks/:id        |

Each endpoint specifies:

* Required authentication
* Required role (super_admin, tenant_admin, user)
* Tenant-level access enforcement

---

## 5. Security Architecture

### 5.1 Authentication

* JWT-based stateless authentication
* Tokens expire after 24 hours
* Tokens validated on every request

---

### 5.2 Authorization

* Role-Based Access Control (RBAC)
* Endpoint-level permission checks
* Field-level restrictions for sensitive operations

---

### 5.3 Audit Logging

* All critical operations are logged
* Includes create, update, and delete actions
* Logs include tenant_id, user_id, action type, and timestamp

---

## 6. Scalability and Reliability

* Stateless backend enables horizontal scaling
* Database indexing on tenant_id improves performance
* Dockerized services ensure consistent deployment
* Health check endpoint ensures service readiness

---

## 7. Conclusion

This architecture provides a secure, scalable, and maintainable foundation for a multi-tenant SaaS application. The design ensures strict tenant isolation, clear separation of concerns, and readiness for production deployment and future expansion.

# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### POST /auth/register-tenant
Register a new tenant organization.
**Body:**
```json
{
  "tenantName": "Acme Corp",
  "subdomain": "acme",
  "adminEmail": "admin@acme.com",
  "adminPassword": "password123",
  "adminFullName": "Admin User"
}
```

### POST /auth/login
Login.
**Body:**
```json
{
  "email": "admin@acme.com",
  "password": "password123",
  "tenantSubdomain": "acme"
}
```

### GET /auth/me
Get current user profile.
**Headers:** `Authorization: Bearer <token>`

## Projects

### GET /projects
List projects for the current tenant.
**Headers:** `Authorization: Bearer <token>`

### POST /projects
Create a project.
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "New Project",
  "description": "Description"
}
```

## Tasks

### GET /projects/:projectId/tasks
List tasks for a project.

### POST /projects/:projectId/tasks
Create a task.

## Health Check

### GET /health
Check system status.
**Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

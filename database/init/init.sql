-- =========================================
-- CLEANUP
-- =========================================
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;

-- =========================================
-- SCHEMA CREATION
-- =========================================

CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  subscription_plan VARCHAR(50) DEFAULT 'free',
  max_users INT NOT NULL,
  max_projects INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  UNIQUE(tenant_id, email)
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'todo',
  priority VARCHAR(20) DEFAULT 'medium',
  assigned_to UUID,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  user_id UUID,
  action VARCHAR(255),
  entity_type VARCHAR(50),
  entity_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SEED DATA
-- =========================================

INSERT INTO tenants (
  id, name, subdomain, status, subscription_plan, max_users, max_projects
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Demo Organization',
  'demo',
  'active',
  'pro',
  25,
  15
);

-- Super Admin
INSERT INTO users (
  id, tenant_id, email, password_hash, role
) VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  NULL,
  'superadmin@saas.com',
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8v5KZL8AjtKoa6HgMHqYjgJv1nVbW6', -- Admin@123
  'super_admin'
);

-- Tenant Admin


-- REVISED USERS INSERT
INSERT INTO users (id, tenant_id, email, password_hash, role) VALUES 
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'admin@demo.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8v5KZL8AjtKoa6HgMHqYjgJv1nVbW6', 'tenant_admin'), -- Password: Admin@123
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'user1@demo.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8v5KZL8AjtKoa6HgMHqYjgJv1nVbW6', 'user'), -- Password: Admin@123
('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'user2@demo.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8v5KZL8AjtKoa6HgMHqYjgJv1nVbW6', 'user'); -- Password: Admin@123

-- Projects
INSERT INTO projects (id, tenant_id, name, description, status, created_by) VALUES
('11111111-2222-3333-4444-555555555555', '11111111-1111-1111-1111-111111111111', 'Project Alpha', 'First demo project', 'active', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('22222222-3333-4444-5555-666666666666', '11111111-1111-1111-1111-111111111111', 'Project Beta', 'Second demo project', 'active', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Tasks
INSERT INTO tasks (id, project_id, tenant_id, title, description, status, priority, assigned_to) VALUES
('33333333-4444-5555-6666-777777777777', '11111111-2222-3333-4444-555555555555', '11111111-1111-1111-1111-111111111111', 'Initial Setup', 'Setup project infrastructure', 'completed', 'high', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('44444444-5555-6666-7777-888888888888', '11111111-2222-3333-4444-555555555555', '11111111-1111-1111-1111-111111111111', 'Database Design', 'Design the schema', 'in_progress', 'high', 'cccccccc-cccc-cccc-cccc-cccccccccccc');


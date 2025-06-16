Full Stack Secure Task Management System

This project is a complete, full-stack task management application built within an NX monorepo. It features a NestJS backend API and an Angular frontend dashboard. The core of the application is a robust, permission-based Role-Based Access Control (RBAC) system that ensures users can only view and manipulate data according to their assigned role and organization.

Core Features
Monorepo Architecture: Uses NX for a scalable, integrated monorepo structure.

Modern Backend: Built with NestJS, TypeORM, and a SQLite database.

Interactive Frontend: A reactive Angular application styled with TailwindCSS and powered by NgRx for state management.

Design: Implements a Permission-based RBAC system.

Admin : For managing users and their assignments to organizations.

🛠️ Setup Instructions
Follow these steps to get the development environment running.

Prerequisites
Node.js (v18 or later recommended)

npm 

Installation & Setup
Clone the repository:

git clone 
cd secure-task-manager

Install dependencies:

npm install

Run the Development Servers:
This project requires two terminal sessions to run both the frontend and backend concurrently.

In Terminal 1 - Start the Backend API:

npx nx serve api

The NestJS server will start on http://localhost:3000. The first time it runs, it will automatically create and seed the SQLite database file at data/secure-task-manager.sqlite.

In Terminal 2 - Start the Frontend Dashboard:

npx nx serve secure-task-manager

The Angular development server will start on http://localhost:4200. Open this URL in your browser.

Create Your First Admin User:

The database

The very first user you register will automatically be assigned the ADMIN role.

Any subsequent users registered will be assigned the default USER role.

Architecture Overview
Monorepo Design (NX Workspace)
The project is structured as an NX monorepo to maximize code sharing and maintain a clear separation of concerns.

secure-task-manager/
|---api/   # NestJS Backend API
├── apps/  
│   └── dashboard/    # Angular Frontend
├── libs/
    |__ data/src/lib # Entities

api/: NestJS application that handles all business logic, database interactions, and authentication.

apps/dashboard: The user-facing Angular application. It contains all UI components, services, and state management logic.

libs/data: Contains all entities

Data Model Explanation
The data is modeled using TypeORM entities, which define the database schema.

Entity Relationship Diagram (ERD)
erDiagram
    USER {
        string id PK
        string email
        string firstName
        string lastName
        string password
        string organizationId FK
    }
    ORGANIZATION {
        string id PK
        string name
        string parentId FK "nullable"
    }
    TASK {
        string id PK
        string title
        string description
        TaskStatus status
        string creatorId FK
        string assigneeId FK
        string organizationId FK
    }
    ROLE {
        string id PK
        RoleName name
    }
    PERMISSION {
        string id PK
        PermissionName name
    }
    USER ||--o{ ROLE : "has"
    ROLE ||--|{ PERMISSION : "has"
    USER }o--|| ORGANIZATION : "belongs to"
    TASK }o--|| USER : "created by"
    TASK }o--|| USER : "assigned to"
    TASK }o--|| ORGANIZATION : "belongs to"

Core Entities:
User: Represents an individual user. Each user has one or more Roles and belongs to a single Organization.

Organization: Represents a company or a team. Supports a simple parent-child hierarchy.

Task: The primary resource. It is linked to a creator, an assignee, and an organization.

Role: Defines a job function (e.g., ADMIN, MANAGER, USER). A user can have multiple roles.

Permission: Defines a specific action that can be performed (e.g., Create Tasks, Manage Uers). Roles are composed of a set of permissions.

Access Control Implementation
Access control is managed on the backend using NestJS Guards and custom Decorators.

JWT Authentication: All protected endpoints first require a valid JSON Web Token, verified by the JwtStrategy and AuthGuard('jwt').

Payload: Upon login, the user's roles and the complete list of their permissions are embedded into the JWT payload.

RolesGuard: This is a powerful, custom guard that checks for both roles and permissions.

@HasPermissions() Decorator: This custom decorator is used to protect controller methods. It specifies which permission(s) are required to access the endpoint.

// Example from users.controller.ts
@Get()
@HasPermissions(PermissionName.READ_USER)
findAll() {
  //...
}

Logic: When a request is made, the RolesGuard extracts the required permissions from the decorator and compares them against the list of permissions found in the user's JWT. If the user has the required permission, access is granted; otherwise, a 403 Forbidden error is returned.

This permission-based approach is highly flexible, as a user's capabilities are determined by their collection of permissions, not just a single role name.

API Docs & Sample Requests
All API endpoints are prefixed with /api. A valid Bearer Token is required for all endpoints listed below.

Auth: /auth
POST /login: Authenticates a user and returns a JWT and user object.

POST /register: Creates a new user with the default USER role.

Users: /users
GET /: Get a list of all users.
Privided Token


PATCH /:id/organization: Update a user's organization.

Permission Required: UPDATE_USER

Sample Body: { "organizationId": "..." }

Organizations: /organizations
GET /: Get a list of all organizations.

Permission Required: READ_ORGANIZATION


Sample Body: { "name": "New Ventures LLC" }

Tasks: /tasks
GET /: Gets a list of tasks scoped to the user's role (Admin sees all, Manager sees their org's, User sees their own).

POST /: Creates a new task.

Permission Required: CREATE_TASK

Sample Body: { "title": "...", "description": "...", "assigneeId": "..." }

🚀 Future Considerations
Complex Role Delegation: Implement a system where a Manager can delegate a subset of their own permissions to a User for a limited time.

Production-Ready Security:

Implement CSRF protection (e.g., using csurf).

Use refresh tokens for a more robust and secure session management flow.

Implement caching for user permissions to reduce database lookups on every request.

Scalability: For applications with millions of permissions checks, explore more advanced RBAC libraries like CASL or external authorization services that can handle complex policies with higher performance.

Audit Logging: Expand the audit log to capture more detailed events and create a dedicated UI for viewing and filtering logs.
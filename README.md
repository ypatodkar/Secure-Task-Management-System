# Secure Task Management System (Nx Monorepo)

## Overview
A secure Task Management System with role-based access control (RBAC) using Nx monorepo. Includes:
- **Backend:** NestJS (api)
- **Frontend:** Angular (dashboard)
- **Shared Libraries:**
  - `libs/data`: TypeScript interfaces & DTOs
  - `libs/auth`: RBAC logic and decorators

## Project Structure
```
apps/
  api/         # NestJS backend
  dashboard/   # Angular frontend
libs/
  data/        # Shared TypeScript interfaces & DTOs
  auth/        # Reusable RBAC logic and decorators
```

## Getting Started
1. **Install dependencies:**
   ```bash
   yarn install
   ```
2. **Run backend:**
   ```bash
   nx serve api
   ```
3. **Run frontend:**
   ```bash
   nx serve dashboard
   ```

## Next Steps
- Implement data models and RBAC logic in `api`.
- Build out Angular dashboard UI in `dashboard`.
- Use shared types from `libs/data` and RBAC helpers from `libs/auth`.

---

For more details, see the challenge instructions and requirements.

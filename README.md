# NestJS Express Backend

A production-ready NestJS Express backend featuring workspace-based multi-tenancy, authentication, and comprehensive access control.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) with Express
- **Authentication**: [Better Auth](https://www.better-auth.com/) via `@thallesp/nestjs-better-auth`
- **Database**: MongoDB with [Mongoose](https://mongoosejs.com/)
- **Email**: [Resend](https://resend.com/) for transactional emails
- **Validation**: `class-validator` and `class-transformer` for DTO validation
- **Rate Limiting**: `@nestjs/throttler` for API route throttling

## Features

### 🔐 Authentication & Authorization

- **Workspace-based authentication** - Multi-tenant architecture with workspace isolation
- **Role-based access control (RBAC)** - Support for `admin` and `owner` roles with granular permissions
- **Workspace invites** - Invite users to workspaces with specific roles
- **Automatic workspace context** - `@CurrentWorkspace()` decorator automatically extracts the current workspace from the user session
- **Custom signup logic** - Handles workspace creation and user setup during registration
- **Email verification** - OTP-based email verification using Better Auth's email OTP plugin
- **Password management** - Forgot password, reset password with OTP verification
- **User deletion** - Secure user account deletion functionality via a dev-only route for cleaning up test users/workspaces

### 🛡️ Security & Guards

- **API route throttling** - Configurable rate limiting using `@nestjs/throttler`, typically involving emails
- **Workspace membership checks** - `WorkspaceMemberGuard` ensures users can only access their workspace's resources
- **Role guards** - `RoleGuard` with `@RequiredRole()` decorator for role-based route protection
- **Development guards** - `DevelopmentGuard` restricts certain routes to development environment only
- **User throttling** - Per-user rate limiting for sensitive operations

### 📧 Email Features

- **OTP email delivery** - Automated OTP emails for email verification and password reset
- **Workspace invites** - Email invitations for both existing and new users
- **Resend integration** - Professional email templates via Resend API

### 🏢 Workspace Management

- **Multi-workspace support** - Users can belong to multiple workspaces
- **Workspace switching** - Switch between workspaces with automatic context updates
- **Last accessed workspace** - Tracks and restores user's last accessed workspace
- **Workspace member management** - Add, remove, and manage workspace members
- **Role management** - Change user roles within workspaces (admin/owner)

### 🎯 Developer Experience

- **TypeScript** - Full type safety throughout the codebase
- **Global validation pipes** - Automatic DTO validation and transformation
- **CORS configuration** - Configurable CORS with credential support
- **Environment-based configuration** - Uses `@nestjs/config` for environment variables
- **Modular architecture** - Well-organised modules for maintainability
- **Custom decorators** - Reusable decorators for common patterns (`@CurrentWorkspace`, `@RequiredRole`)

## Project Structure

```
src/
├── common/
│   ├── decorators/     # Custom decorators (e.g., @RequiredRole)
│   └── guards/         # Authentication and authorization guards
├── config/             # Configuration files (auth, database, email, signup)
├── workspace/          # Workspace management module
│   ├── decorators/     # @CurrentWorkspace decorator
│   ├── invite/         # Workspace invite functionality
│   ├── schemas/        # Mongoose schemas
│   └── userInWorkspace/ # User-workspace relationship management
└── user/               # User management module
    ├── password/       # Password reset functionality
    └── verify/         # Email verification
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- Resend API key
- Better Auth secret

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017
DATABASE=your_database_name

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BASE_URL=http://localhost:3113
CORS_ORIGIN=http://localhost:3050

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_DOMAIN=your_domain.com

# Server
PORT=3113
NODE_ENV=development

# Development
DEVELOPER_SECRET=your_dev_secret

# Sentry (Error Tracking)
SENTRY_DSN=your_sentry_dsn
```

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication
- Better Auth handles authentication endpoints (sign-up, sign-in, sign-out, etc.)

### Workspaces
- `POST /api/workspaces/invite` - Invite user to workspace (requires admin role)
- `DELETE /api/workspaces/invite/cancel/:inviteId` - Cancel invite (requires admin role)
- `GET /api/workspaces/user` - Get user's workspaces
- `POST /api/workspaces/user/switch` - Switch to a different workspace
- `POST /api/workspaces/user/removeUser` - Remove user from workspace (requires admin role)
- `POST /api/workspaces/user/changeRole` - Change user role (requires owner role)

### User Management
- `GET /api/user/me` - Get current user
- `GET /api/user/public` - Public endpoint (no auth required)
- `GET /api/user/optional` - Optional auth endpoint
- `DELETE /api/user/delete` - Delete user account (dev only, requires DevelopmentGuard)
- `POST /api/verify` - Verify email with OTP
- `POST /api/verify/resend` - Resend verification email OTP
- `POST /api/password/forgot` - Request password reset OTP
- `POST /api/password/verify-reset` - Verify password reset OTP
- `POST /api/password/reset` - Reset password with OTP

## Usage Examples

### Using the @CurrentWorkspace Decorator

```typescript
@Get('my-workspace-data')
@UseGuards(WorkspaceMemberGuard)
async getWorkspaceData(@CurrentWorkspace() workspaceId: string) {
  // workspaceId is automatically extracted from session.user.lastAccessedWorkspace
  return this.service.getDataForWorkspace(workspaceId);
}
```

### Using Role-Based Access Control

```typescript
@Post('admin-only')
@UseGuards(WorkspaceMemberGuard, RoleGuard)
@RequiredRole('admin')
async adminOnlyRoute(@CurrentWorkspace() workspaceId: string) {
  // Only admins can access this route
}
```

### Development-Only Routes

```typescript
@Post('dev-only')
@UseGuards(DevelopmentGuard)
async devOnlyRoute() {
  // Only accessible in development with valid secret
}
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

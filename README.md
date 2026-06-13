# Delivery Document Management System

A secure web portal for haulage/logistics businesses to upload, store, search, and retrieve delivery notes (PDFs/images) with role-based access control.

## Tech Stack

- **Frontend:** React (Vite) + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT-based authentication
- **File Storage:** Local filesystem

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

## Quick Start

### 1. Clone and configure

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your database credentials and a strong `JWT_SECRET`.

### 2. Run setup script

```bash
chmod +x setup.sh
./setup.sh
```

Or follow the manual steps below.

### 3. Manual setup

```bash
# Backend
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### 4. Access the app

Open http://localhost:5173

**Default admin credentials:**
- Email: `admin@delivery.com`
- Password: `Admin123!`

## Production Deployment (Linux VPS)

### 1. Install dependencies on server

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql nginx

# Install PM2 globally
npm install -g pm2
```

### 2. Setup database

```bash
sudo -u postgres psql
CREATE DATABASE delivery_documents;
CREATE USER docuser WITH ENCRYPTED PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE delivery_documents TO docuser;
\q
```

### 3. Build and configure

```bash
# Upload project to /var/www/delivery-docs
cd /var/www/delivery-docs

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your production values

# Install and build
cd backend && npm install && npx prisma generate && npx prisma db push && npm run seed
cd ../frontend && npm install && npm run build
```

### 4. Configure PM2

```bash
cd ../backend
pm2 start server.js --name delivery-docs-api
pm2 save
pm2 startup
```

### 5. Configure Nginx

Create `/etc/nginx/sites-available/delivery-docs`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend static files
    root /var/www/delivery-docs/frontend/dist;
    index index.html;

    # API proxy
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Uploaded files (internal only)
    location /uploads/ {
        internal;
        alias /var/www/delivery-docs/backend/uploads/;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/delivery-docs /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

### 6. SSL with Let's Encrypt

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## API Endpoints

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Users (Admin only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Documents
- `POST /api/documents/upload` - Upload document (Admin/Manager)
- `GET /api/documents` - List documents (paginated)
- `GET /api/documents/:id` - Get document details
- `GET /api/documents/search` - Search documents
- `PUT /api/documents/:id` - Upload new version (Admin/Manager)
- `GET /api/documents/:id/download` - Download file

## User Roles

| Feature | Admin | Manager | Customer |
|---------|-------|---------|----------|
| User management | ✅ | ❌ | ❌ |
| Upload documents | ✅ | ✅ | ❌ |
| Replace documents | ✅ | ✅ | ❌ |
| View all documents | ✅ | ✅ | ❌ |
| View own documents | ✅ | ✅ | ✅ |
| Search/filter all | ✅ | ✅ | ❌ |
| Search/filter own | ✅ | ✅ | ✅ |
| Download | ✅ | ✅ | ✅ |

## Security

- Passwords hashed with bcrypt (12 rounds)
- JWT authentication with configurable expiry
- Role-based middleware on all protected routes
- File downloads restricted via authenticated routes (no public URLs)
- File type validation on upload
- SQL injection protection via Prisma ORM

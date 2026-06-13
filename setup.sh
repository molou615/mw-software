#!/bin/bash
set -e

echo "=== Delivery Document Management System Setup ==="
echo ""

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Error: Node.js is required. Install from https://nodejs.org"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is required."; exit 1; }
command -v psql >/dev/null 2>&1 || { echo "Error: PostgreSQL client is required."; exit 1; }

echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"
echo ""

# Reminder to edit config files
if [ ! -f backend/config.js ]; then
  echo ""
  echo ">>> IMPORTANT: Edit backend/config.js with your database credentials and a secure JWT_SECRET"
  echo ">>> Edit frontend/src/config.js with your API URL for production builds"
fi

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd backend
npm install
echo "Backend dependencies installed."

# Generate Prisma client
npx prisma generate
echo "Prisma client generated."

# Run database migrations
echo ""
echo "Running database migrations..."
npx prisma db push
echo "Database schema applied."

# Seed database
echo ""
echo "Seeding database..."
npm run seed
echo "Seed complete."

cd ..

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Frontend dependencies installed."
cd ..

echo ""
echo "=== Setup Complete ==="
echo ""
echo "To start the application:"
echo ""
echo "  1. Start the backend:"
echo "     cd backend && npm run dev"
echo ""
echo "  2. Start the frontend (in a new terminal):"
echo "     cd frontend && npm run dev"
echo ""
echo "  3. Open http://localhost:5173 in your browser"
echo ""
echo "Default admin login:"
echo "  Email:    admin@delivery.com"
echo "  Password: Admin123!"
echo ""
echo "IMPORTANT: Change the admin password after first login."

// ============================================================
// CONFIGURATION FILE
// Edit the values below for your environment.
// The rest of the code imports from here automatically.
// ============================================================

const config = {
  // ---- Server ----
  port: 5000,
  nodeEnv: 'production',
  corsOrigin: 'http://localhost:5173',

  // ---- Database (PostgreSQL) ----
  // Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
  databaseUrl: 'postgresql://username:password@localhost:5432/delivery_documents?schema=public',

  // ---- JWT Auth ----
  // Generate a strong secret: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  jwtSecret: 'change-this-to-a-long-random-string',
  jwtExpiresIn: '24h',

  // ---- File Upload ----
  uploadPath: './uploads',
  maxFileSize: 10 * 1024 * 1024, // 10 MB in bytes

  // ---- Default Admin (used by seed script) ----
  adminEmail: 'admin@delivery.com',
  adminPassword: 'Admin123!',
  adminName: 'System Admin',
};

// ─── Prisma needs DATABASE_URL in process.env ─────────────────
process.env.DATABASE_URL = config.databaseUrl;

module.exports = config;

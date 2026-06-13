const config = {
  port: 5001,
  nodeEnv: 'production',
  corsOrigin: 'http://localhost:5177',
  databaseUrl: 'postgresql://username:password@localhost:5432/quotebuilder?schema=public',
  jwtSecret: 'quotebuilder-secret-key-change-in-production',
  jwtExpiresIn: '24h',
  uploadPath: './uploads',
  maxFileSize: 10 * 1024 * 1024,
  adminEmail: 'admin@quotebuilder.com',
  adminPassword: 'Admin123!',
  adminName: 'System Admin',
  businessName: 'Your Business Ltd',
  businessEmail: 'hello@yourbusiness.com',
  businessPhone: '07700 900000',
  businessAddress: '123 High Street, London, SW1A 1AA',
  vatNumber: 'GB123456789',
};

process.env.DATABASE_URL = config.databaseUrl;

module.exports = config;

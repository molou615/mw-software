const config = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5177',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/quotebuilder?schema=public',
  jwtSecret: process.env.JWT_SECRET || 'change-this-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024,
  adminEmail: process.env.ADMIN_EMAIL || 'admin@quotebuilder.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin123!',
  adminName: process.env.ADMIN_NAME || 'System Admin',
  businessName: process.env.BUSINESS_NAME || 'Your Business Ltd',
  businessEmail: process.env.BUSINESS_EMAIL || 'hello@yourbusiness.com',
  businessPhone: process.env.BUSINESS_PHONE || '07700 900000',
  businessAddress: process.env.BUSINESS_ADDRESS || '123 High Street, London, SW1A 1AA',
  vatNumber: process.env.VAT_NUMBER || 'GB123456789',
};

process.env.DATABASE_URL = config.databaseUrl;

module.exports = config;

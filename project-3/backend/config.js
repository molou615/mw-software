module.exports = {
  port: process.env.PORT || 3003,
  jwtSecret: process.env.JWT_SECRET || 'halaflow-secret-key',
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@halaflow.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    name: process.env.ADMIN_NAME || 'HalaFlow Admin',
  },
  demo: true,
};

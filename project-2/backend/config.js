const config = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'gymflow-secret-key-change-in-production',

  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@gymflow.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    name: process.env.ADMIN_NAME || 'GymFlow Admin',
  },

  gym: {
    name: process.env.GYM_NAME || 'My Gym',
    timezone: process.env.GYM_TIMEZONE || 'Europe/London',
  },

  demo: true,
};

module.exports = config;

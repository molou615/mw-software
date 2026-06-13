const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const config = require('../config');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: config.adminEmail } });
  if (existing) {
    console.log('Admin user already exists, skipping seed.');
    return;
  }

  const hashedPassword = await bcrypt.hash(config.adminPassword, 12);

  const admin = await prisma.user.create({
    data: {
      email: config.adminEmail,
      name: config.adminName,
      password: hashedPassword,
      role: 'Admin',
      active: true,
    },
  });

  console.log(`Default admin created:`);
  console.log(`  Email:    ${admin.email}`);
  console.log(`  Password: ${config.adminPassword}`);
  console.log(`  Role:     ${admin.role}`);
  console.log('');
  console.log('IMPORTANT: Change this password after first login.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const config = require('./config');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const existingAdmin = await prisma.user.findUnique({ where: { email: config.admin.email } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(config.admin.password, 10);
    await prisma.user.create({
      data: {
        email: config.admin.email,
        name: config.admin.name,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created:', config.admin.email);
  }

  const classTypes = ['Yoga', 'HIIT', 'Spin', 'Pilates', 'Boxing', 'CrossFit', 'Zumba', 'Stretching'];
  for (const name of classTypes) {
    const existing = await prisma.classType.findFirst({ where: { name } });
    if (!existing) {
      await prisma.classType.create({
        data: { name, duration: 60, maxCapacity: 20, color: '#3B82F6' },
      });
      console.log('Class type created:', name);
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

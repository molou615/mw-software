const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const config = require('../config');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding HalaFlow...');

  const admin = await prisma.user.findUnique({ where: { email: config.admin.email } });
  if (!admin) {
    const hashed = await bcrypt.hash(config.admin.password, 10);
    await prisma.user.create({
      data: { email: config.admin.email, name: config.admin.name, password: hashed, role: 'ADMIN' },
    });
    console.log('Admin created:', config.admin.email);
  }

  const performers = [
    { name: 'Ahmed the Clown', email: 'ahmed@halaflow.com', skills: 'Clown,Face Painting,Balloon Art', bio: 'Professional clown with 10 years experience' },
    { name: 'Sara the Magician', email: 'sara@halaflow.com', skills: 'Magic Shows,Mentalism,Close-up Magic', bio: 'Award-winning magician' },
    { name: 'Omar the DJ', email: 'omar@halaflow.com', skills: 'DJ,MC,Lighting,Sound System', bio: 'Party DJ for all occasions' },
    { name: 'Lina the Face Painter', email: 'lina@halaflow.com', skills: 'Face Painting,Body Art,Glitter Tattoos', bio: 'Creative face painter for kids and adults' },
  ];

  const hashedPass = await bcrypt.hash('password123', 10);
  for (const p of performers) {
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: { email: p.email, name: p.name, password: hashedPass, role: 'PERFORMER' },
    });
    await prisma.performer.upsert({
      where: { id: user.id },
      update: {},
      create: { userId: user.id, skills: p.skills, bio: p.bio },
    });
    console.log('Performer created:', p.name);
  }

  const packages = [
    { name: 'Basic Party', description: '1 performer, 2 hours, basic entertainment', price: 150, duration: 120, features: '1 Performer,2 Hours,Basic Sound System,Party Games' },
    { name: 'Premium Party', description: '2 performers, 3 hours, full entertainment', price: 300, duration: 180, features: '2 Performers,3 Hours,Full Sound & Lighting,Party Games,Face Painting,Balloon Art' },
    { name: 'VIP Party', description: '3+ performers, 4 hours, complete experience', price: 500, duration: 240, features: '3+ Performers,4 Hours,Full Sound & Lighting,DJ,MC,Face Painting,Balloon Art,Magic Show,Photos & Videos' },
  ];

  for (const p of packages) {
    await prisma.package.upsert({
      where: { id: packages.indexOf(p) + 1 },
      update: {},
      create: p,
    });
    console.log('Package created:', p.name);
  }

  console.log('Seeding complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());

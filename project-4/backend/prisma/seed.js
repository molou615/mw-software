const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const config = require('../config');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(config.adminPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: config.adminEmail },
    update: {},
    create: {
      email: config.adminEmail,
      password: hashedPassword,
      name: config.adminName,
      role: 'admin',
    },
  });

  console.log('Admin user created:', user.email);

  const clients = [
    { name: 'John Smith', email: 'john@smithplumbing.co.uk', phone: '07700 123456', company: 'Smith Plumbing', address: '45 Oak Lane, Manchester' },
    { name: 'Sarah Williams', email: 'sarah@williamselectrical.co.uk', phone: '07700 234567', company: 'Williams Electrical', address: '78 Elm Street, Birmingham' },
    { name: 'Mike Johnson', email: 'mike@johnsonbuilders.co.uk', phone: '07700 345678', company: 'Johnson Builders', address: '12 Cedar Road, Leeds' },
    { name: 'Emma Brown', email: 'emma@browncarpentry.co.uk', phone: '07700 456789', company: 'Brown Carpentry', address: '99 Pine Avenue, Bristol' },
    { name: 'David Lee', email: 'david@leeroofing.co.uk', phone: '07700 567890', company: 'Lee Roofing', address: '33 Maple Drive, London' },
  ];

  const createdClients = [];
  for (const client of clients) {
    const c = await prisma.client.create({
      data: { ...client, userId: user.id },
    });
    createdClients.push(c);
  }

  console.log('Demo clients created:', createdClients.length);

  const quotes = [
    {
      title: 'Bathroom Renovation',
      clientId: createdClients[0].id,
      items: [
        { description: 'Remove old bathroom suite', quantity: 1, unitPrice: 350 },
        { description: 'New toilet, basin & bath', quantity: 1, unitPrice: 1200 },
        { description: 'Tiling (walls & floor)', quantity: 15, unitPrice: 45 },
        { description: 'Plumbing connections', quantity: 1, unitPrice: 500 },
      ],
      status: 'sent',
      notes: 'Work to commence within 2 weeks of acceptance.',
    },
    {
      title: 'Kitchen Extension Wiring',
      clientId: createdClients[1].id,
      items: [
        { description: 'Full rewire for extension', quantity: 1, unitPrice: 2800 },
        { description: 'Additional sockets (10x)', quantity: 10, unitPrice: 85 },
        { description: 'Consumer unit upgrade', quantity: 1, unitPrice: 450 },
        { description: 'Testing & certification', quantity: 1, unitPrice: 200 },
      ],
      status: 'accepted',
      notes: 'Includes Part P certification.',
    },
    {
      title: 'Garden Wall Repair',
      clientId: createdClients[2].id,
      items: [
        { description: 'Demolish damaged section', quantity: 3, unitPrice: 150 },
        { description: 'Rebuild with new blocks', quantity: 3, unitPrice: 200 },
        { description: 'Repointing', quantity: 8, unitPrice: 35 },
      ],
      status: 'draft',
    },
    {
      title: 'Custom Bookshelf Installation',
      clientId: createdClients[3].id,
      items: [
        { description: 'Custom oak bookshelf (3m)', quantity: 1, unitPrice: 850 },
        { description: 'Wall mounting & brackets', quantity: 1, unitPrice: 150 },
        { description: 'Finishing & staining', quantity: 1, unitPrice: 120 },
      ],
      status: 'viewed',
    },
    {
      title: 'Flat Roof Replacement',
      clientId: createdClients[4].id,
      items: [
        { description: 'Remove old felt roof', quantity: 25, unitPrice: 15 },
        { description: 'Install EPDM rubber roof', quantity: 25, unitPrice: 45 },
        { description: 'Fascia & guttering', quantity: 1, unitPrice: 380 },
        { description: 'Insulation upgrade', quantity: 25, unitPrice: 12 },
      ],
      status: 'sent',
      notes: '10-year guarantee on EPDM installation.',
    },
  ];

  for (let i = 0; i < quotes.length; i++) {
    const { items, ...quoteData } = quotes[i];
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const vatAmount = subtotal * 0.2;

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    await prisma.quote.create({
      data: {
        ...quoteData,
        quoteNumber: `Q-${String(i + 1).padStart(4, '0')}`,
        userId: user.id,
        subtotal,
        vatRate: 20,
        vatAmount,
        total: subtotal + vatAmount,
        validUntil,
        items: {
          create: items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice,
          })),
        },
      },
    });
  }

  console.log('Demo quotes created:', quotes.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const clients = await prisma.client.findMany({
    where: { userId: req.user.id },
    include: { _count: { select: { quotes: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(clients);
};

exports.getById = async (req, res) => {
  const client = await prisma.client.findUnique({
    where: { id: req.params.id },
    include: { quotes: { orderBy: { createdAt: 'desc' } } },
  });
  if (!client) return res.status(404).json({ error: 'Client not found' });
  res.json(client);
};

exports.create = async (req, res) => {
  const { name, email, phone, address, company, notes } = req.body;
  const client = await prisma.client.create({
    data: { name, email, phone, address, company, notes, userId: req.user.id },
  });
  res.json(client);
};

exports.update = async (req, res) => {
  const { name, email, phone, address, company, notes } = req.body;
  const client = await prisma.client.update({
    where: { id: req.params.id },
    data: { name, email, phone, address, company, notes },
  });
  res.json(client);
};

exports.delete = async (req, res) => {
  await prisma.client.delete({ where: { id: req.params.id } });
  res.json({ message: 'Client deleted' });
};

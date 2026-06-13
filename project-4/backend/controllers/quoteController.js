const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const quotes = await prisma.quote.findMany({
    where: { userId: req.user.id },
    include: { client: true, items: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(quotes);
};

exports.getById = async (req, res) => {
  const quote = await prisma.quote.findUnique({
    where: { id: req.params.id },
    include: { client: true, items: true },
  });
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  res.json(quote);
};

exports.create = async (req, res) => {
  const { title, description, clientId, items, notes, terms, validDays = 30 } = req.body;

  const quoteCount = await prisma.quote.count({ where: { userId: req.user.id } });
  const quoteNumber = `Q-${String(quoteCount + 1).padStart(4, '0')}`;

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const vatRate = 20;
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + validDays);

  const quote = await prisma.quote.create({
    data: {
      quoteNumber,
      title,
      description,
      clientId,
      userId: req.user.id,
      subtotal,
      vatRate,
      vatAmount,
      total,
      notes,
      terms,
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
    include: { client: true, items: true },
  });

  res.json(quote);
};

exports.update = async (req, res) => {
  const { title, description, clientId, items, notes, terms, status } = req.body;

  const existing = await prisma.quote.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: 'Quote not found' });

  if (items) {
    await prisma.quoteItem.deleteMany({ where: { quoteId: req.params.id } });
  }

  const subtotal = items ? items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) : existing.subtotal;
  const vatRate = 20;
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;

  const updateData = { title, description, clientId, notes, terms, subtotal, vatRate, vatAmount, total };

  if (status) {
    updateData.status = status;
    if (status === 'sent') updateData.sentAt = new Date();
    if (status === 'viewed') updateData.viewedAt = new Date();
    if (status === 'accepted') updateData.acceptedAt = new Date();
    if (status === 'rejected') updateData.rejectedAt = new Date();
  }

  const quote = await prisma.quote.update({
    where: { id: req.params.id },
    data: updateData,
    include: { client: true, items: true },
  });

  if (items) {
    await prisma.quoteItem.createMany({
      data: items.map(item => ({
        quoteId: quote.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      })),
    });
  }

  const updated = await prisma.quote.findUnique({
    where: { id: req.params.id },
    include: { client: true, items: true },
  });

  res.json(updated);
};

exports.delete = async (req, res) => {
  await prisma.quote.delete({ where: { id: req.params.id } });
  res.json({ message: 'Quote deleted' });
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const updateData = { status };

  if (status === 'sent') updateData.sentAt = new Date();
  if (status === 'viewed') updateData.viewedAt = new Date();
  if (status === 'accepted') updateData.acceptedAt = new Date();
  if (status === 'rejected') updateData.rejectedAt = new Date();

  const quote = await prisma.quote.update({
    where: { id: req.params.id },
    data: updateData,
    include: { client: true, items: true },
  });

  res.json(quote);
};

exports.getPublic = async (req, res) => {
  const quote = await prisma.quote.findUnique({
    where: { quoteNumber: req.params.number },
    include: { client: true, items: true },
  });
  if (!quote) return res.status(404).json({ error: 'Quote not found' });

  if (quote.status === 'draft') {
    await prisma.quote.update({ where: { id: quote.id }, data: { status: 'viewed', viewedAt: new Date() } });
  }

  res.json(quote);
};

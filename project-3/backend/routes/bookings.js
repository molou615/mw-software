const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  const where = {};
  if (req.user.role === 'CLIENT') where.clientId = req.user.id;
  if (req.query.status) where.status = req.query.status;
  const bookings = await prisma.booking.findMany({
    where,
    include: { client: { select: { id: true, name: true, email: true, phone: true } }, package: true, performances: { include: { performer: { include: { user: { select: { name: true } } } } } },
    orderBy: { eventDate: 'asc' },
  });
  res.json(bookings);
});

router.get('/:id', authenticate, async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { client: { select: { id: true, name: true, email: true, phone: true } }, package: true, performances: { include: { performer: { include: { user: { select: { name: true } } } } } }, checklist: true, photos: true },
  });
  res.json(booking);
});

router.post('/', authenticate, async (req, res) => {
  const { packageId, eventDate, eventTime, duration, venue, address, guestCount, specialReqs, clientEmail, clientName, clientPhone, performerIds } = req.body;
  let clientId = req.user.id;
  if (req.user.role === 'ADMIN' || req.user.role === 'MANAGER') {
    let client = await prisma.user.findUnique({ where: { email: clientEmail } });
    if (!client) {
      client = await prisma.user.create({ data: { email: clientEmail, name: clientName, phone: clientPhone, password: 'temp123', role: 'CLIENT' } });
    }
    clientId = client.id;
  }
  const pkg = await prisma.package.findUnique({ where: { id: packageId } });
  const booking = await prisma.booking.create({
    data: { clientId, packageId, eventDate: new Date(eventDate), eventTime, duration: duration || pkg.duration, venue, address, guestCount, specialReqs, depositPaid: pkg.price * 0.3 },
  });
  if (performerIds && performerIds.length) {
    for (const pid of performerIds) {
      await prisma.performance.create({ data: { bookingId: booking.id, performerId: pid } });
    }
  }
  const tasks = [
    { title: 'Confirm venue address', category: 'pre-event' },
    { title: 'Confirm event time with client', category: 'pre-event' },
    { title: 'Pack equipment and supplies', category: 'pre-event' },
    { title: 'Confirm performer assignments', category: 'pre-event' },
    { title: 'Set up at venue', category: 'during-event' },
    { title: 'Run event activities', category: 'during-event' },
    { title: 'Pack up after event', category: 'during-event' },
    { title: 'Send photos to client', category: 'post-event' },
    { title: 'Request review from client', category: 'post-event' },
  ];
  for (const t of tasks) {
    await prisma.checklistItem.create({ data: { bookingId: booking.id, ...t } });
  }
  res.status(201).json(booking);
});

router.put('/:id', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  const { status, depositPaid, totalPaid } = req.body;
  const booking = await prisma.booking.update({
    where: { id: parseInt(req.params.id) },
    data: { ...(status && { status }), ...(depositPaid !== undefined && { depositPaid }), ...(totalPaid !== undefined && { totalPaid }) },
  });
  res.json(booking);
});

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  await prisma.performance.deleteMany({ where: { bookingId: parseInt(req.params.id) } });
  await prisma.checklistItem.deleteMany({ where: { bookingId: parseInt(req.params.id) } });
  await prisma.photo.deleteMany({ where: { bookingId: parseInt(req.params.id) } });
  await prisma.booking.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Deleted' });
});

module.exports = router;

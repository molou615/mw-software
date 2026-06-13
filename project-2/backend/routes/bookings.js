const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  const { classId, memberId } = req.query;
  const where = {};
  if (classId) where.classId = parseInt(classId);
  if (memberId) where.memberId = parseInt(memberId);
  if (req.user.role === 'MEMBER') where.memberId = req.user.id;

  try {
    const bookings = await prisma.booking.findMany({
      where,
      include: { member: { select: { id: true, name: true, email: true } }, class: { include: { classType: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { classId } = req.body;
  const memberId = req.user.role === 'MEMBER' ? req.user.id : req.body.memberId;

  try {
    const cls = await prisma.class.findUnique({
      where: { id: classId },
      include: { bookings: { where: { status: 'CONFIRMED' } } },
    });
    if (!cls) return res.status(404).json({ error: 'Class not found' });

    const existing = await prisma.booking.findUnique({ where: { memberId_classId: { memberId, classId } } });
    if (existing && existing.status !== 'CANCELLED') return res.status(400).json({ error: 'Already booked' });

    if (cls.bookings.length >= cls.maxCapacity) {
      return res.status(400).json({ error: 'Class is full' });
    }

    const booking = await prisma.booking.upsert({
      where: { memberId_classId: { memberId, classId } },
      update: { status: 'CONFIRMED' },
      create: { memberId, classId, status: 'CONFIRMED' },
      include: { member: { select: { id: true, name: true } }, class: { include: { classType: true } } },
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id/cancel', authenticate, async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (req.user.role === 'MEMBER' && booking.memberId !== req.user.id) {
      return res.status(403).json({ error: 'Not your booking' });
    }
    const updated = await prisma.booking.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'CANCELLED' },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id/attend', authenticate, authorize('ADMIN', 'INSTRUCTOR'), async (req, res) => {
  try {
    const updated = await prisma.booking.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'ATTENDED' },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

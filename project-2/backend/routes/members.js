const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.get('/', authenticate, authorize('ADMIN', 'INSTRUCTOR'), async (req, res) => {
  try {
    const members = await prisma.user.findMany({
      where: { role: 'MEMBER' },
      select: { id: true, email: true, name: true, phone: true, createdAt: true, _count: { select: { bookings: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const { email, name, password, phone } = req.body;
  try {
    const hashed = await bcrypt.hash(password || 'password123', 10);
    const member = await prisma.user.create({
      data: { email, name, password: hashed, phone, role: 'MEMBER' },
      select: { id: true, email: true, name: true, phone: true, role: true },
    });
    res.status(201).json(member);
  } catch (err) {
    if (err.code === 'P2002') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const member = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { ...(name && { name }), ...(phone && { phone }), ...(email && { email }) },
      select: { id: true, email: true, name: true, phone: true, role: true },
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.booking.deleteMany({ where: { memberId: parseInt(req.params.id) } });
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

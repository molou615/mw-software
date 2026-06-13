const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  const performers = await prisma.performer.findMany({
    include: { user: { select: { id: true, name: true, email: true, phone: true } }, performances: { include: { booking: { select: { eventDate: true, venue: true, status: true } } } } },
  });
  res.json(performers);
});

router.post('/', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  const { email, name, phone, skills, bio } = req.body;
  const bcrypt = require('bcryptjs');
  const user = await prisma.user.create({ data: { email, name, phone, password: await bcrypt.hash('password123', 10), role: 'PERFORMER' } });
  const performer = await prisma.performer.create({ data: { userId: user.id, skills, bio } });
  res.status(201).json(performer);
});

router.put('/:id', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  const { skills, bio, active } = req.body;
  const performer = await prisma.performer.update({
    where: { id: parseInt(req.params.id) },
    data: { ...(skills && { skills }), ...(bio !== undefined && { bio }), ...(active !== undefined && { active }) },
  });
  res.json(performer);
});

module.exports = router;

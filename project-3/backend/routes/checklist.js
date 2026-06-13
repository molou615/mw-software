const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/:bookingId', authenticate, async (req, res) => {
  const items = await prisma.checklistItem.findMany({ where: { bookingId: parseInt(req.params.bookingId) }, orderBy: { category: 'asc' } });
  res.json(items);
});

router.put('/:id', authenticate, async (req, res) => {
  const { completed } = req.body;
  const item = await prisma.checklistItem.update({ where: { id: parseInt(req.params.id) }, data: { completed } });
  res.json(item);
});

module.exports = router;

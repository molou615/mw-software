const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  try {
    const types = await prisma.classType.findMany({ orderBy: { name: 'asc' } });
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const { name, duration, maxCapacity, color, description } = req.body;
  try {
    const type = await prisma.classType.create({
      data: { name, duration, maxCapacity, color, description },
    });
    res.status(201).json(type);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const { name, duration, maxCapacity, color, description } = req.body;
  try {
    const type = await prisma.classType.update({
      where: { id: parseInt(req.params.id) },
      data: { ...(name && { name }), ...(duration && { duration }), ...(maxCapacity && { maxCapacity }), ...(color && { color }), ...(description !== undefined && { description }) },
    });
    res.json(type);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.classType.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Class type deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

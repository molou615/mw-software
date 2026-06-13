const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  const { date, instructorId, classTypeId } = req.query;
  const where = {};
  if (date) {
    const d = new Date(date);
    where.date = { gte: new Date(d.setHours(0, 0, 0, 0)), lt: new Date(d.setHours(23, 59, 59, 999)) };
  }
  if (instructorId) where.instructorId = parseInt(instructorId);
  if (classTypeId) where.classTypeId = parseInt(classTypeId);

  try {
    const classes = await prisma.class.findMany({
      where,
      include: { classType: true, instructor: { select: { id: true, name: true } }, bookings: { where: { status: 'CONFIRMED' } } },
      orderBy: { date: 'asc' },
    });
    res.json(classes.map(c => ({ ...c, currentCapacity: c.bookings.length })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/week', authenticate, async (req, res) => {
  const { start } = req.query;
  const startDate = start ? new Date(start) : new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  try {
    const classes = await prisma.class.findMany({
      where: { date: { gte: startDate, lt: endDate } },
      include: { classType: true, instructor: { select: { id: true, name: true } }, bookings: { where: { status: 'CONFIRMED' } } },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
    res.json(classes.map(c => ({ ...c, currentCapacity: c.bookings.length })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, authorize('ADMIN', 'INSTRUCTOR'), async (req, res) => {
  const { classTypeId, instructorId, date, startTime, endTime, maxCapacity } = req.body;
  try {
    const cls = await prisma.class.create({
      data: { classTypeId, instructorId, date: new Date(date), startTime, endTime, maxCapacity: maxCapacity || 20 },
      include: { classType: true, instructor: { select: { id: true, name: true } } },
    });
    res.status(201).json(cls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticate, authorize('ADMIN', 'INSTRUCTOR'), async (req, res) => {
  const { id } = req.params;
  const { status, maxCapacity } = req.body;
  try {
    const cls = await prisma.class.update({
      where: { id: parseInt(id) },
      data: { ...(status && { status }), ...(maxCapacity && { maxCapacity }) },
      include: { classType: true, instructor: { select: { id: true, name: true } } },
    });
    res.json(cls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.class.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

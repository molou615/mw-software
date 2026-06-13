const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  const totalBookings = await prisma.booking.count();
  const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });
  const confirmedBookings = await prisma.booking.count({ where: { status: 'CONFIRMED' } });
  const completedBookings = await prisma.booking.count({ where: { status: 'COMPLETED' } });
  const totalPerformers = await prisma.performer.count({ where: { active: true } });
  const totalRevenue = await prisma.booking.aggregate({ _sum: { totalPaid: true } });
  const upcomingEvents = await prisma.booking.findMany({
    where: { status: { in: ['CONFIRMED', 'PENDING'] }, eventDate: { gte: new Date() } },
    include: { client: { select: { name: true } }, package: true },
    orderBy: { eventDate: 'asc' },
    take: 5,
  });
  res.json({ totalBookings, pendingBookings, confirmedBookings, completedBookings, totalPerformers, totalRevenue: totalRevenue._sum.totalPaid || 0, upcomingEvents });
});

module.exports = router;

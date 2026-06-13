const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', authenticate, authorize('ADMIN', 'INSTRUCTOR'), async (req, res) => {
  try {
    const totalMembers = await prisma.user.count({ where: { role: 'MEMBER' } });
    const totalBookings = await prisma.booking.count({ where: { status: 'CONFIRMED' } });
    const totalClasses = await prisma.class.count({ where: { status: 'ACTIVE' } });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayClasses = await prisma.class.count({
      where: { date: { gte: today, lt: new Date(today.getTime() + 86400000) } },
    });

    const todayBookings = await prisma.booking.count({
      where: {
        status: 'CONFIRMED',
        class: { date: { gte: today, lt: new Date(today.getTime() + 86400000) } },
      },
    });

    const recentBookings = await prisma.booking.findMany({
      take: 5,
      include: { member: { select: { name: true } }, class: { include: { classType: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ totalMembers, totalBookings, totalClasses, todayClasses, todayBookings, recentBookings });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

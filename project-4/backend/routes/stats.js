const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', auth, async (req, res) => {
  const userId = req.user.id;

  const totalQuotes = await prisma.quote.count({ where: { userId } });
  const sentQuotes = await prisma.quote.count({ where: { userId, status: 'sent' } });
  const acceptedQuotes = await prisma.quote.count({ where: { userId, status: 'accepted' } });
  const totalRevenue = await prisma.quote.aggregate({ where: { userId, status: 'accepted' }, _sum: { total: true } });
  const totalClients = await prisma.client.count({ where: { userId } });

  const recentQuotes = await prisma.quote.findMany({
    where: { userId },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  res.json({
    totalQuotes,
    sentQuotes,
    acceptedQuotes,
    conversionRate: totalQuotes > 0 ? ((acceptedQuotes / totalQuotes) * 100).toFixed(1) : 0,
    totalRevenue: totalRevenue._sum.total || 0,
    totalClients,
    recentQuotes,
  });
});

module.exports = router;

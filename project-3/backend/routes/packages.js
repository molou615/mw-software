const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  const packages = await prisma.package.findMany({ orderBy: { price: 'asc' } });
  res.json(packages);
});

router.post('/', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  const { name, description, price, duration, maxGuests, features } = req.body;
  const pkg = await prisma.package.create({ data: { name, description, price, duration, maxGuests, features } });
  res.status(201).json(pkg);
});

router.put('/:id', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  const { name, description, price, duration, maxGuests, features, active } = req.body;
  const pkg = await prisma.package.update({
    where: { id: parseInt(req.params.id) },
    data: { ...(name && { name }), ...(description && { description }), ...(price && { price }), ...(duration && { duration }), ...(maxGuests && { maxGuests }), ...(features && { features }), ...(active !== undefined && { active }) },
  });
  res.json(pkg);
});

module.exports = router;

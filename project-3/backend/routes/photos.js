const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/:bookingId', authenticate, async (req, res) => {
  const photos = await prisma.photo.findMany({ where: { bookingId: parseInt(req.params.bookingId) }, orderBy: { uploadedAt: 'desc' } });
  res.json(photos);
});

router.post('/:bookingId', authenticate, async (req, res) => {
  const { url, caption } = req.body;
  const photo = await prisma.photo.create({ data: { bookingId: parseInt(req.params.bookingId), url, caption } });
  res.status(201).json(photo);
});

router.delete('/:id', authenticate, async (req, res) => {
  await prisma.photo.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Deleted' });
});

module.exports = router;

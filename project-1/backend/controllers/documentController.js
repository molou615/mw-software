const prisma = require('../config/database');
const path = require('path');
const fs = require('fs');
const config = require('../config');

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { jobNumber, vehicleReg, customerName, date } = req.body;
    if (!jobNumber || !customerName) {
      return res.status(400).json({ message: 'jobNumber and customerName are required' });
    }

    let customerId = null;
    if (req.user.role === 'Customer') {
      customerId = req.user.id;
    } else if (req.body.customerId) {
      const customer = await prisma.user.findUnique({
        where: { id: req.body.customerId },
        select: { id: true, role: true },
      });
      if (customer && customer.role === 'Customer') {
        customerId = customer.id;
      }
    }

    const latestVersion = await prisma.document.findFirst({
      where: { jobNumber },
      orderBy: { version: 'desc' },
      select: { version: true },
    });

    const version = latestVersion ? latestVersion.version + 1 : 1;

    const document = await prisma.document.create({
      data: {
        jobNumber,
        vehicleReg: vehicleReg || '',
        customerName,
        date: date ? new Date(date) : new Date(),
        filePath: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        version,
        uploadedById: req.user.id,
        customerId,
      },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true } },
      },
    });

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let where = {};
    if (req.user.role === 'Customer') {
      where.customerId = req.user.id;
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          uploadedBy: { select: { id: true, name: true } },
          customer: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.document.count({ where }),
    ]);

    res.json({
      documents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        uploadedBy: { select: { id: true, name: true } },
        customer: { select: { id: true, name: true } },
      },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (req.user.role === 'Customer' && document.customerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(document);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { jobNumber, vehicleReg, customerName, dateFrom, dateTo, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let where = {};

    if (req.user.role === 'Customer') {
      where.customerId = req.user.id;
    }

    if (jobNumber) {
      where.jobNumber = { contains: jobNumber, mode: 'insensitive' };
    }
    if (vehicleReg) {
      where.vehicleReg = { contains: vehicleReg, mode: 'insensitive' };
    }
    if (customerName) {
      where.customerName = { contains: customerName, mode: 'insensitive' };
    }
    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) where.date.gte = new Date(dateFrom);
      if (dateTo) where.date.lte = new Date(dateTo);
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          uploadedBy: { select: { id: true, name: true } },
          customer: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.document.count({ where }),
    ]);

    res.json({
      documents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateVersion = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { id } = req.params;

    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
      return res.status(403).json({ message: 'Only managers and admins can update documents' });
    }

    const latestVersion = await prisma.document.findFirst({
      where: { jobNumber: existing.jobNumber },
      orderBy: { version: 'desc' },
      select: { version: true },
    });

    const version = latestVersion ? latestVersion.version + 1 : 1;

    const document = await prisma.document.create({
      data: {
        jobNumber: existing.jobNumber,
        vehicleReg: req.body.vehicleReg || existing.vehicleReg,
        customerName: req.body.customerName || existing.customerName,
        date: req.body.date ? new Date(req.body.date) : existing.date,
        filePath: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        version,
        uploadedById: req.user.id,
        customerId: existing.customerId,
      },
      include: {
        uploadedBy: { select: { id: true, name: true } },
        customer: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

exports.download = async (req, res, next) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({ where: { id } });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (req.user.role === 'Customer' && document.customerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const filePath = path.join(config.uploadPath, document.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    res.download(filePath, document.originalName);
  } catch (error) {
    next(error);
  }
};

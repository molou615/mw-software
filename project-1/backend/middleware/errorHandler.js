const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      return res.status(409).json({ message: 'A record with this value already exists' });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Record not found' });
    }
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;

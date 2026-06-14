module.exports = (err, req, res, next) => {
  console.error(err.message);

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body too large' });
  }

  if (err.message === 'Invalid file type. Only PDF and image files are allowed.') {
    return res.status(400).json({ message: err.message });
  }

  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
};

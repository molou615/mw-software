const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');
const clientRoutes = require('./routes/clients');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/stats', statsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'QuoteBuilder', port: config.port });
});

app.use(require('./middleware/errorHandler'));

app.listen(config.port, () => {
  console.log(`QuoteBuilder server running on port ${config.port}`);
});

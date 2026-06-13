const express = require('express');
const cors = require('cors');
const config = require('./config');

const authRoutes = require('./routes/auth');
const classRoutes = require('./routes/classes');
const bookingRoutes = require('./routes/bookings');
const memberRoutes = require('./routes/members');
const classTypeRoutes = require('./routes/classTypes');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/class-types', classTypeRoutes);
app.use('/api/stats', statsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'GymFlow', demo: config.demo });
});

app.listen(config.port, () => {
  console.log(`GymFlow server running on port ${config.port}`);
});

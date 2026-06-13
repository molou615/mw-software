const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/performers', require('./routes/performers'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/checklist', require('./routes/checklist'));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/stats', require('./routes/stats'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'HalaFlow', demo: config.demo }));

app.listen(config.port, () => console.log('HalaFlow server on port ' + config.port));

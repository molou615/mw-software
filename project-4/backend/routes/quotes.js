const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, getById, create, update, delete: deleteQuote, updateStatus, getPublic } = require('../controllers/quoteController');

router.get('/', auth, getAll);
router.get('/public/:number', getPublic);
router.get('/:id', auth, getById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteQuote);
router.patch('/:id/status', auth, updateStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(authenticate);

router.post('/upload', authorize('Admin', 'Manager'), upload.single('file'), documentController.upload);
router.get('/', documentController.getAll);
router.get('/search', documentController.search);
router.get('/:id', documentController.getById);
router.put('/:id', authorize('Admin', 'Manager'), upload.single('file'), documentController.updateVersion);
router.get('/:id/download', documentController.download);

module.exports = router;

const express = require('express');
const { FileController, upload } = require('../controllers/fileController');

const router = express.Router();
const fileController = new FileController();

router.post('/upload', upload.single('file'), fileController.uploadFile.bind(fileController));

module.exports = router;
// routes/admin.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminControllers');

// Định nghĩa các routes cho quản lý FAQs
router.get('/admin/faqs', adminController.getAllFAQs);
router.get('/admin/faqs/new', adminController.createFAQForm);
router.post('/admin/faqs', adminController.createFAQ);
router.delete('/admin/faqs/:id', adminController.deleteFAQ);

module.exports = router;

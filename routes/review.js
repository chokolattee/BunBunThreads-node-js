const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const upload = require('../middlewares/upload');

router.post('/create', upload.array('images', 5), reviewController.createReview);
router.get('/customer/:customerId', reviewController.getReviewsByCustomer);

// User review actions
router.put('/edit/:id', upload.array('images', 5), reviewController.updateReview); 
router.put('/delete/:id', reviewController.softDeleteReview); 
router.patch('/restore/:id', reviewController.restoreReview); 

module.exports = router;
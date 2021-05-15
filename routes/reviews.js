const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

// Requiring the model
const Campground = require('../models/campground');
const Review  = require('../models/review');


// Reviews page
// Creating new review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Deleting the review
router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
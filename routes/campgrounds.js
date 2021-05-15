const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');  // Requiring the controller
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });

// Requiring the model
const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))  // Index page
    .post(isLoggedIn, upload.array('image'), validateCampground,catchAsync(campgrounds.createCampground))   // Creating new campground

// If placed after '/:id', then it first hits that route thereby searching for an id which it does not have
// Hence place it before that route
// New Campground Form
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))  // Show the campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))   // Updating the campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))   // Delete Campground

// Editing the campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;
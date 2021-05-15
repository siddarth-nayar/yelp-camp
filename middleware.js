const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // Store the url that the user was visiting when not logged in
        // Return the user to the same url after logging in
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in.');
        return res.redirect('/login');
    }
    next();
}

// Defining the middleware
// Validate Campground middleware
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    // Check if owner matches the current user
    // If not, then permission not granted
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have permisssion to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// Defining the middleware
// Validate Review middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    // Check if owner matches the current user
    // If not, then permission not granted
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permisssion to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
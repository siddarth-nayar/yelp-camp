const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)    // Register form route
    .post(catchAsync(users.register))   // Register user

router.route('/login')
    .get(users.renderLogin)   // Login route
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)  // Checking if the credentials are correct while loging in

// Logout user
router.get('/logout', users.logout)

module.exports = router;
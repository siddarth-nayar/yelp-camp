const User = require('../models/user');

// Register form route
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

// Register user
module.exports.register = async (req, res, next) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);     // If error exists, call next on the error
            req.flash('success', 'Welcome to YelpCamp!');    // If no error exists, then we move forward with the login
            res.redirect('/campgrounds');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

// Login form route
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

// User login
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo   // After logging in, delete the returnTo url
    res.redirect(redirectUrl);
}

// Logout user
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
}
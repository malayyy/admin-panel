const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const model = require('../models/RegisterModel');

passport.use(new passportLocal({
    usernameField: "email"
}, async (email, password, done) => {
    let User = await model.findOne({ email });
    if (!User || User.password != password) {
        return done(null, false)
    }
    return done(null, User)
}))

passport.serializeUser((User, done) => {
    return done(null, User.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        let loginUser = await model.findById(id)
        return done(null, loginUser)
    } catch (error) {
        return done(error, false)
    }
})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/");
}
passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.finduser = req.user;  
    }
    next();
}

module.exports = passport;
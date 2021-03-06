const passport = require('passport');
const { Favorite } = require('../models/Favorite.js');

module.exports = (app) => { 
    // when using auth, new GoogleStrategy() uses string of 'google' hence why <passport.authenticate('google'...)> below
    app.get('/auth/google', passport.authenticate('google', { // brings up google log-in and authenticates user -> passport is defined in ./services/passport.js
        
        // scope specfies what we want access to. In this case: profile and email.
        scope: ['profile', 'email'] //these strings are not made up - google has a list of strings
    }));

    app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
        res.redirect('/home')
    });

    app.get('/api/logout', (req, res) => { // this will logout user
        req.logout();
        
        res.redirect('/home')
    });

    app.get('/api/current_user', (req, res) => { // this will return current user
        res.send(req.user);
    });

    
}
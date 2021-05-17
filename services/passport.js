const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // fetches model class from models dir

passport.serializeUser((user, done) => { // sets id as a cookie in the browser and user's passport
    done(null, user.id); // user.id is an id automatically generated by mongo
});

passport.deserializeUser((id, done) => { // gets that id from the cookie
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            // callbackURL: '/auth/google/callback'
            callbackURL: 'https://coin-lizard.herokuapp.com/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            const name = profile.name.givenName + ' ' + profile.name.familyName
            User.findOne({ googleId: profile.id }) // queries db for googleId matching profile.id
                .then((existingUser) => {
                    if (existingUser) { // means user alreadt exists, do not create a new one
                        done(null, existingUser);
                    } else { // creates a new user with the profile id
                        new User({ 
                                    googleId: profile.id, 
                                    name: name,
                                    profilePhoto: profile.photos[0].value
                                })
                            .save() //.save() saves data to the database
                            .then(user => done(null, user));
                    }
                })
        }
    )
);
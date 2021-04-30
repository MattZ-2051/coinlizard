const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');

require('./models/User.js');
require('./models/Favorite.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();

app.use(express.json());
app.use(express.urlencoded());
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // how long this cookie will be used before expiration (30 days)
        keys: [keys.cookieKey] // key will be used to encrypt cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/favoritesRoutes')(app);

const PORT = process.env.PORT || 5000;
// app.listen(PORT);
app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});

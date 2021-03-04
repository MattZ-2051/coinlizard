const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin.js');

const Favorite = mongoose.model('favorites')
module.exports = app => {
    app.post('/api/favorites', requireLogin, (req, res) => {
        const { coinName } = req.body;

        const favorite = new Favorite({
            coinName: coinName,
            _user: req.user.id
        })
        favorite.save();
    });
    
};
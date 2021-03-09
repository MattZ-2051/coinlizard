const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin.js');

const Favorite = mongoose.model('favorites')
module.exports = app => {
    app.post('/api/favorites', (req, res) => {
        const { coinName } = req.body;
        // , dailyChange, price, marketCap
        Favorite.findOne({ coinName: coinName }) // queries db for coinName matching the coinName in the req body
                .then((existingFavorite) => {
                    if (existingFavorite) { // means user already favorited coin ie do nothing
                        console.log('aready favorited')
                    } else { // creates a new favorite with the user id
                        new Favorite({ 
                            coinName: coinName,
                            // dailyChange: dailyChange,
                            // price: price,
                            // marketCap: marketCap,
                            _user: req.user.id
                                })
                            .save() //.save() saves data to the database
                    }
                })
        // const favorite = new Favorite({
        //     coinName: coinName,
        //     _user: req.user.id
        // })
        // favorite.save();
    });

    app.get('/api/favorites/:_user', (req ,res) => {
        // const { _id } = req.user;
        // console.log(req.user._id);
        Favorite.find({ _user: req.user._id }).then(function(favorite) {
            res.send(favorite)
        });
        // res.send({hi: 'hi'})
    })
};
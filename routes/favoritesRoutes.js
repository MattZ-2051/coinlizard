const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin.js');

const Favorite = mongoose.model('favorites')
module.exports = app => {

    app.post('/api/favorites', (req, res) => {
        const { coinName } = req.body;

        Favorite.findOne({ coinName: coinName }) // queries db for coinName matching the coinName in the req body
            .then((existingFavorite) => {
                if (existingFavorite) { // means user already favorited coin ie do nothing
                    console.log('aready favorited')
                } else { // creates a new favorite with the user id
                    new Favorite({ 
                        coinName: coinName,
                        _user: req.user.id
                            })
                        .save() //.save() saves data to the database
                        console.log('favorited')
                }
            })
            res.send('Updated')
    });

    app.delete('/api/favorites/delete/:id', (req, res) => {
        const id = req.params.id;
        Favorite.deleteOne({ coinName: id, _user: req.user._id }).then(function(favorite) {
            console.log('deleted')
        });
        res.send('Deleted')
    })

    app.get('/api/favorites/:_user', (req ,res) => {
        
        Favorite.find({ _user: req.user._id }).then(function(favorite) {
            res.send(favorite)
        });
    })
};
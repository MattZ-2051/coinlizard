const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User');

const favoriteSchema = new Schema({ // whenever a new user is created, it will use this model                          
    coinName: String,
    // dailyChange: Number,
    // price: Number,
    // marketCap: Number,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

 mongoose.model('favorites', favoriteSchema);

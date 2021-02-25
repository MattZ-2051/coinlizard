const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ // whenever a new user is created, it will use this model                          
    googleId: String,           // the googleId string will act as its unique id
    name: String
});

mongoose.model('users', userSchema);
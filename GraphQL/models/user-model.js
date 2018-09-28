const moongose = require('mongoose');
const schema = moongose.Schema;

const userSchema = new schema({
    username: String,
    googleId: String,
    gender: String,
    image: String

})

const User = moongose.model('user',userSchema);

module.exports = User;
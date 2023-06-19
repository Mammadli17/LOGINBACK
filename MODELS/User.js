const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    code:String
})
const User = new mongoose.model('User', userSchema);


module.exports = {
    User
}
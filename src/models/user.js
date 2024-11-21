const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number},
    favoriteFoods:{type:[String]}
})

const User = mongoose.model('user',userSchema);
module.exports = User;
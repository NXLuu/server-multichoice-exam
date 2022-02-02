import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: String,
    description: String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

const User = mongoose.model('User', userSchema);

export default User;

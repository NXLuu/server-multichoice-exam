import mongoose from 'mongoose';

let token = new mongoose.Schema({
    expireAt: Date,
    token: String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});

token.index({ "expireAt": 1 }, { expireAfterSeconds: 432000 });
const Token = mongoose.model('Token', token);

export default Token;

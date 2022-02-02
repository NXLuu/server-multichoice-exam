import mongoose from 'mongoose';

let questionSchema = new mongoose.Schema({
    question: String,
    options: [[[String]]],
    Ans: String,
});

const Question = mongoose.model('Atbm', questionSchema);

export default Question;
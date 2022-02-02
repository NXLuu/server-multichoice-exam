import mongoose from 'mongoose';

let examSchema = new mongoose.Schema({
    questions: [String],
    title: String,
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
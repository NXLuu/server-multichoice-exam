import Exam from "../../models/exam.model.js";
import Question from "../../models/qestion.model.js";
// import { ObjectId } from "mongoose";
// import { ObjectID } from "bson";
// import { ObjectID } from "bson";

export async function getExam(req, res) {
    try {
        const allExams = await Exam.find({}).exec();
        const allExamsWithOnlyNumberOfQuestions = allExams.map((exam) => {
            return {
                _id: exam.id,
                length: exam.questions.length,
                title: exam.title
            };
        });

        res.json(allExamsWithOnlyNumberOfQuestions);
    } catch (error) {
        res.status(404).json('Error');
    }
}

export async function getDetialExam(req, res) {
    const examId = req.params.id;
    const exam = await Exam.findById(examId, 'questions title').exec();
    const questionsId = exam.questions;
    const questions = await Promise.all(questionsId.map(async (questionId) => {
        return await Question.findById(questionId, '_id options question').exec();
    }));
    
    res.json({examTitle: exam.title, questions: questions});
}

export async function createExam(req, res) {
    try {
        const allQuestions = await Question.find({}).exec();
        let idOfQuestions = allQuestions.map(question => {
            return question.id;

        });
        const exam = new Exam({
            questions: idOfQuestions,
            title: "atbm"
        });
        exam.save();
    } catch (error) {
        console.log(error);
    }


}
import Exam from "../../models/exam.model.js";
import Question from "../../models/qestion.model.js"

export async function postAnswer(req, res) {
    
    const answers = req.body;
    console.log(answers);

    let numberOfCorrectQuestion = 0;
    let questionCorrect = [];

    for (let answer in answers) {
        const quetsionInDb = await Question.findById(answer, 'Ans').exec();
        if (quetsionInDb.Ans === answers[answer]) {
            ++numberOfCorrectQuestion;
            questionCorrect.push({[answer]: answers[answer]});
        }
    }
    console.log(numberOfCorrectQuestion);

    res.json({numberOfCorrectQuestion, questionCorrect});
}
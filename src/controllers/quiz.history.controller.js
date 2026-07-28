const {
    QuizHistory,
    Year
} = require('../models/school.model');


const startQuiz = async (req, res) => {

    const {
        Std_Code,
        Course_Id,
        Lesson_Name,
        Quiz_Id,
        Quiz_Title,
        Grade_Id,
        Subject_Id,
        Term_Id,
        Total_Questions
    } = req.body;


    if (
        !Std_Code ||
        Course_Id == null ||
        Quiz_Id == null ||
        Grade_Id == null ||
        Subject_Id == null ||
        Term_Id == null ||
        Total_Questions == null
    ) {
        return res.status(400).json({
            message: "Missing data."
        });
    }

    try {

        // السنة الحالية
        const currentYear = await Year.findOne({
            where: {
                IsCurrent: true
            }
        });

        if (!currentYear) {
            return res.status(500).json({
                message: "Current year not configured."
            });
        }

        // حساب رقم المحاولة
        const lastAttempt = await QuizHistory.findOne({

            where: {
                Year_Id: currentYear.Year_Id,
                Std_Code,
                Course_Id,
                Quiz_Id,
                Grade_Id,
                Subject_Id,
                Term_Id
            },

            order: [
                ['Attempt_No', 'DESC']
            ]

        });

        const attemptNo = lastAttempt
            ? lastAttempt.Attempt_No + 1
            : 1;

        const data = await QuizHistory.create({

            Year_Id: currentYear.Year_Id,
            Std_Code,
            Course_Id,
            Lesson_Name,
            Quiz_Id,
            Quiz_Title,
            Grade_Id,
            Subject_Id,
            Term_Id,
            Attempt_No: attemptNo,
            Total_Questions

        });

        return res.status(201).json({
            Id: data.Id,
            Attempt_No: data.Attempt_No
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

const updateQuizHistory = async (req, res) => {

    const { id } = req.params;

    const {
        Answered_Questions,
        Correct_Answers
    } = req.body;

    if (!id) {
        return res.status(400).json({
            message: "History id is required."
        });
    }

    try {

        const history = await QuizHistory.findByPk(id);

        if (!history) {
            return res.status(404).json({
                message: "Quiz history not found."
            });
        }

        await history.update({

            Answered_Questions,
            Correct_Answers

        });

        return res.status(200).json({
            message: "Quiz progress updated."
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });

    }

};


const finishQuizHistory = async (req, res) => {

    const { id } = req.params;

    try {

        const history = await QuizHistory.findByPk(id);

        if (!history) {
            return res.status(404).json({
                message: "Quiz history not found."
            });
        }

        await history.update({

            Finished_At: new Date()

        });

        return res.status(200).json({
            message: "Quiz finished."
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });

    }

    
};
module.exports = {
    startQuiz,
    updateQuizHistory,
    finishQuizHistory,
};
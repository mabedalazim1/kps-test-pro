const db = require('../../../config/database');
const Sequelize = require('sequelize');
const TopiceModel = require('./topics.models')
const CourseModel = require('./courses.model')
const VocabularyModel = require('./vocabulary.model')
const SubpartModel = require('./subpart.model')
const ReviewModel = require('./review.model')
const SubjectModel = require('./subject.model')
const TermModel = require('./term.model')
const AnswerModel = require('./quizzes/answer.model')
const QuestionModel = require('./quizzes/question.model')
const QuizModel = require('./quizzes/quiz.model')
const QuizTypeModel = require('./quizzes/quiz_type.model')
const GradeModel = require('../school.model/grade.model');

// Create Models
const Topic = TopiceModel(db, Sequelize)
const Course = CourseModel(db, Sequelize)
const Vocabulary = VocabularyModel(db, Sequelize)
const Subpart = SubpartModel(db, Sequelize)
const Review = ReviewModel(db, Sequelize)
const Subject = SubjectModel(db, Sequelize)
const Term = TermModel(db, Sequelize)
const Answer = AnswerModel(db, Sequelize)
const Question = QuestionModel(db, Sequelize)
const Quiz = QuizModel(db, Sequelize)
const QuizType = QuizTypeModel(db, Sequelize)
const Grade = GradeModel(db, Sequelize)

// Define Relationships

Grade.hasMany(Topic, {foreignKey: 'grade_id'})
Topic.belongsTo(Grade, {foreignKey: 'grade_id'})

Subject.hasMany(Topic, {foreignKey: 'subject_id'})
Topic.belongsTo(Subject, {foreignKey: 'subject_id'})

Term.hasMany(Topic,{foreignKey:'term_id'})
Topic.belongsTo(Term,{foreignKey:'term_id'})

Topic.hasMany(Course,{foreignKey:'topic_id'})
Course.belongsTo(Topic,{foreignKey:'topic_id'})

Course.hasMany(Subpart,{foreignKey:'course_id'})
Subpart.belongsTo(Course,{foreignKey:'course_id'})

Course.hasMany(Vocabulary,{foreignKey:'course_id'})
Vocabulary.belongsTo(Course,{foreignKey:'course_id'})

Course.hasMany(Review,{foreignKey:'course_id'})
Review.belongsTo(Course,{foreignKey:'course_id'})

Course.hasMany(Quiz,{foreignKey:'course_id'})
Quiz.belongsTo(Course,{foreignKey:'course_id'})

Quiz.hasMany(Question,{foreignKey:'quiz_id'})
Question.belongsTo(Quiz,{foreignKey:'quiz_id'})

Question.hasMany(Answer,{foreignKey:'question_id'})
Answer.belongsTo(Question,{foreignKey:'question_id'})

QuizType.hasMany(Quiz,{foreignKey:'quizType'})
Quiz.belongsTo(QuizType,{foreignKey:'quizType'})

// Init Data
const initialCoursesData = async () => {

    // Insert Data To Courses Tables
    // subject Data
    await Subject.findOrCreate({
        where: { id: 1 },
        defaults: {
            id: 1,
            subject_desc: 'اللغة العربية'
        }
    })
    await Subject.findOrCreate({
        where: { id: 2 },
        defaults: {
            id: 2,
            subject_desc: 'الرياضيات'
        }
    })
    await Subject.findOrCreate({
        where: { id: 3 },
        defaults: {
            id: 3,
            subject_desc: 'اللغة الإنجليزية'
        }
    })
    await Subject.findOrCreate({
        where: { id: 4 },
        defaults: {
            id: 4,
            subject_desc: 'العلوم'
        }
    })
    await Subject.findOrCreate({
        where: { id: 5 },
        defaults: {
            id: 5,
            subject_desc: 'الدراسات الإجتماعية'
        }
    })
    // Term Data
    await Term.findOrCreate({
        where: { id: 1 },
        defaults: {
            id: 1,
            term_desc: 'الفصل الدراسي الأول'
        }
    })
    await Term.findOrCreate({
        where: { id: 2 },
        defaults: {
            id: 2,
            term_desc: 'الفصل الدراسي الثاني'
        }
    })

    console.log('Courses Data Created!');
}

// generate Tables in DB
const creatSqlCoursestData = () => db.sync({ force: false }).then(() => {
    console.log('Courses Tables Created!');
});

const coursesModels = {
    creatSqlCoursestData,
    initialCoursesData,
    Course,
    Question,
    Quiz,
    Answer,
    Subject,
    Term,
    Grade,
    Topic,
    Vocabulary,
    Subpart,
    Review,
    QuizType,
}

module.exports = coursesModels;
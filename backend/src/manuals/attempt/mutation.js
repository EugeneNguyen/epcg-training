let db = require('../../database/models');
const {AuthService} = require("../../services");
const {Op} = require("sequelize");

let mutation = {
  async manual_create_attempt_from_course_template_exam(parent, { examId, token }, context, info) {
    const user = await AuthService.getUserFromToken(token);

    const exam = await db.etCourseExam.findByPk(examId);
    if (!exam) throw new Error("Cannot find Exam");

    const courseTemplateExam = await db.etCourseTemplateExam.findByPk(exam.courseTemplateExamId);
    if (!courseTemplateExam) throw new Error("Cannot find Course Template Exam");

    const courseTemplateExamQuestions = await db.etCourseTemplateExamQuestion.findAll({
      where: {
        examId: courseTemplateExam.id,
      }
    });

    const attempt = await db.etExamAttempt.create({
      userId: user.id,
      examId: exam.id,
      templateExamId: courseTemplateExam.id,
      duration: courseTemplateExam.duration,
    });

    for (const templateExamQuestion of courseTemplateExamQuestions) {
      const question = await db.etCourseTemplateQuestionMCQ.findByPk(templateExamQuestion.questionId);
      const questionImage = question.questionImageId ? await db.tgFile.findByPk(question.questionImageId) : null;
      const displayedQuestionData = {
        type: 'mcq',
        question: question.question,
        questionImage: questionImage ? questionImage.key : null,
        choices: [
          question.answerA,
          question.answerB,
          question.answerC,
          question.answerD,
        ],
        choiceOrder: [0, 1, 2, 3],
      }
      const fullQuestionData = {
        type: 'mcq',
        question: question.question,
        questionImage: questionImage ? questionImage.key : null,
        choices: [
          question.answerA,
          question.answerB,
          question.answerC,
          question.answerD,
        ],
        choiceOrder: [0, 1, 2, 3],
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      }
      await db.etExamAttemptQuestion.create({
        attemptId: attempt.id,
        questionId: templateExamQuestion.id,
        order: templateExamQuestion.order,
        displayedQuestionData: JSON.stringify(displayedQuestionData),
        fullQuestionData: JSON.stringify(fullQuestionData),
      })
    }

    return attempt;
  },
  async manual_exam_attempt_answer(parent, { id, rawAnswer }, context, info) {
    const question = await db.etExamAttemptQuestion.findByPk(id);
    question.rawAnswer = rawAnswer;
    question.answer = rawAnswer;

    const questionData = JSON.parse(question.fullQuestionData);
    question.correct = questionData.correctAnswer == rawAnswer;

    await question.save();
    return question;
  },
  async manual_exam_attempt_start(parent, { id }, context, info) {
    const attempt = await db.etExamAttempt.findByPk(id);
    if (attempt.startTime) {
      throw new Error('Exam started');
    }
    attempt.startTime = db.sequelize.fn('NOW');
    await attempt.save();
    return attempt;
  },
  async manual_exam_attempt_end(parent, { id }, context, info) {
    const attempt = await db.etExamAttempt.findByPk(id);
    if (attempt.endTime) {
      throw new Error('Exam ended');
    }
    const numQuestion = await db.etExamAttemptQuestion.count({where: { attemptId: attempt.id }});
    const numCorrect = await db.etExamAttemptQuestion.count({where: { attemptId: attempt.id, correct: true }});
    attempt.endTime = db.sequelize.fn('NOW');
    attempt.score = parseInt(numCorrect * 100 / numQuestion);
    await attempt.save();
    return attempt;
  },
  async manual_adhoc() {
    const attempts = await db.etExamAttempt.findAll();
    for (const attempt of attempts) {
      const numQuestion = await db.etExamAttemptQuestion.count({where: { attemptId: attempt.id }});
      const numCorrect = await db.etExamAttemptQuestion.count({where: { attemptId: attempt.id, correct: true }});
      attempt.score = parseInt(numCorrect * 100 / numQuestion);
      await attempt.save();
    }
    return true;
  }
};

module.exports = mutation;

let db = require('../../database/models');

let mutation = {
  async manual_create_attempt_from_course_template_exam(parent, { course_template_exam_id }, context, info) {
    const courseTemplateExam = await db.etCourseTemplateExam.findByPk(course_template_exam_id);
    if (!courseTemplateExam) {
      throw new Error("Cannot find Course Template Exam");
    }

    const courseTemplateExamQuestions = await db.etCourseTemplateExamQuestion.findAll({
      where: {
        examId: courseTemplateExam.id,
      }
    });

    const attempt = await db.etExamAttempt.create({
      templateExamId: courseTemplateExam.id,
      duration: courseTemplateExam.duration,
    });

    for (const templateExamQuestion of courseTemplateExamQuestions) {
      const question = await db.etCourseTemplateQuestionMCQ.findByPk(templateExamQuestion.questionId)
      const displayedQuestionData = {
        type: 'mcq',
        question: question.question,
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
    attempt.endTime = db.sequelize.fn('NOW');
    await attempt.save();
    return attempt;
  },
};

module.exports = mutation;

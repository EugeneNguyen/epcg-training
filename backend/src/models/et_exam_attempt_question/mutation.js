let db = require('../../database/models');

let mutation = {
  async et_exam_attempt_question_add(parent, { data }, context, info) {
    const newObject = await db.etExamAttemptQuestion.create(data);


    return newObject;
  },
  async et_exam_attempt_question_edit(parent, { id, data }, context, info) {
    const etExamAttemptQuestion = await db.etExamAttemptQuestion.findByPk(id);


    await etExamAttemptQuestion.update(data);
    await etExamAttemptQuestion.reload();

    return etExamAttemptQuestion;
  },
  async et_exam_attempt_question_delete(parent, { id }, context, info) {
    const etExamAttemptQuestion = await db.etExamAttemptQuestion.findByPk(id);
    await etExamAttemptQuestion.destroy();
    return true;
  },

};

module.exports = mutation;

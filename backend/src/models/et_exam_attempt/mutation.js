let db = require('../../database/models');

let mutation = {
  async et_exam_attempt_add(parent, { data }, context, info) {
    const newObject = await db.etExamAttempt.create(data);


    return newObject;
  },
  async et_exam_attempt_edit(parent, { id, data }, context, info) {
    const etExamAttempt = await db.etExamAttempt.findByPk(id);


    await etExamAttempt.update(data);
    await etExamAttempt.reload();

    return etExamAttempt;
  },
  async et_exam_attempt_delete(parent, { id }, context, info) {
    const etExamAttempt = await db.etExamAttempt.findByPk(id);
    await etExamAttempt.destroy();
    return true;
  },

};

module.exports = mutation;

let db = require('../../database/models');

let mutation = {
  async et_course_template_question_mcq_add(parent, { data }, context, info) {
    return db.etCourseTemplateQuestionMCQ.create(data);
  },
  async et_course_template_question_mcq_edit(parent, { id, data }, context, info) {
    const etCourseTemplateQuestionMCQ = await db.etCourseTemplateQuestionMCQ.findByPk(id);
    await etCourseTemplateQuestionMCQ.update(data);
    await etCourseTemplateQuestionMCQ.reload();

    return etCourseTemplateQuestionMCQ;
  },
  async et_course_template_question_mcq_delete(parent, { id }, context, info) {
    const etCourseTemplateQuestionMCQ = await db.etCourseTemplateQuestionMCQ.findByPk(id);
    await etCourseTemplateQuestionMCQ.destroy();
    return true;
  },

};

module.exports = mutation;

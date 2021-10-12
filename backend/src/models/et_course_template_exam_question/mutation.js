let db = require('../../database/models');

let mutation = {
  async et_course_template_exam_question_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateExamQuestion.create(data);


    return newObject;
  },
  async et_course_template_exam_question_edit(parent, { id, data }, context, info) {
    const etCourseTemplateExamQuestion = await db.etCourseTemplateExamQuestion.findByPk(id);


    await etCourseTemplateExamQuestion.update(data);
    await etCourseTemplateExamQuestion.reload();

    return etCourseTemplateExamQuestion;
  },
  async et_course_template_exam_question_delete(parent, { id }, context, info) {
    const etCourseTemplateExamQuestion = await db.etCourseTemplateExamQuestion.findByPk(id);
    await etCourseTemplateExamQuestion.destroy();
    return true;
  },

};

module.exports = mutation;

let db = require('../../database/models');

let mutation = {
  async et_course_template_question_source_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateQuestionSource.create(data);


    return newObject;
  },
  async et_course_template_question_source_edit(parent, { id, data }, context, info) {
    const etCourseTemplateQuestionSource = await db.etCourseTemplateQuestionSource.findByPk(id);


    await etCourseTemplateQuestionSource.update(data);
    await etCourseTemplateQuestionSource.reload();

    return etCourseTemplateQuestionSource;
  },
  async et_course_template_question_source_delete(parent, { id }, context, info) {
    const etCourseTemplateQuestionSource = await db.etCourseTemplateQuestionSource.findByPk(id);
    await etCourseTemplateQuestionSource.destroy();
    return true;
  },

};

module.exports = mutation;

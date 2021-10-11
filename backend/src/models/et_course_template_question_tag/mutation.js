let db = require('../../database/models');

let mutation = {
  async et_course_template_question_tag_add(parent, { data }, context, info) {
    return db.etCourseTemplateQuestionTag.create(data);
  },
  async et_course_template_question_tag_edit(parent, { id, data }, context, info) {
    const etCourseTemplateQuestionTag = await db.etCourseTemplateQuestionTag.findByPk(id);
    await etCourseTemplateQuestionTag.update(data);
    await etCourseTemplateQuestionTag.reload();

    return etCourseTemplateQuestionTag;
  },
  async et_course_template_question_tag_delete(parent, { id }, context, info) {
    const etCourseTemplateQuestionTag = await db.etCourseTemplateQuestionTag.findByPk(id);
    await etCourseTemplateQuestionTag.destroy();
    return true;
  },

};

module.exports = mutation;

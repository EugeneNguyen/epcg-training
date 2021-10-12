let db = require('../../database/models');

let mutation = {
  async et_course_template_question_tag_link_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateQuestionTagLink.create(data);


    return newObject;
  },
  async et_course_template_question_tag_link_edit(parent, { id, data }, context, info) {
    const etCourseTemplateQuestionTagLink = await db.etCourseTemplateQuestionTagLink.findByPk(id);

    
    await etCourseTemplateQuestionTagLink.update(data);
    await etCourseTemplateQuestionTagLink.reload();

    return etCourseTemplateQuestionTagLink;
  },
  async et_course_template_question_tag_link_delete(parent, { id }, context, info) {
    const etCourseTemplateQuestionTagLink = await db.etCourseTemplateQuestionTagLink.findByPk(id);
    await etCourseTemplateQuestionTagLink.destroy();
    return true;
  },

};

module.exports = mutation;

let db = require('../../database/models');

let mutation = {
  async et_course_template_question_tag_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateQuestionTag.create(data);

    const questionsIds = data.questions;
    for (const questionsId of questionsIds) {
      await db.etCourseTemplateQuestionTagLink.create({
        questionTagId: newObject.id,
        questionId: questionsId,
      });
    }

    return newObject;
  },
  async et_course_template_question_tag_edit(parent, { id, data }, context, info) {
    const etCourseTemplateQuestionTag = await db.etCourseTemplateQuestionTag.findByPk(id);

        if (data.questions) {
      const questionsIds = data.questions;
      for (const questionsId of questionsIds) {
        await db.etCourseTemplateQuestionTagLink.create({
          questionTagId: newObject.id,
          questionId: questionsId,
        });
      }
    }
  
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

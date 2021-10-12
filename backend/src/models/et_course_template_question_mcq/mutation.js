let db = require('../../database/models');

let mutation = {
  async et_course_template_question_mcq_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateQuestionMCQ.create(data);

    const tagsIds = data.tags;
    for (const tagsId of tagsIds) {
      await db.etCourseTemplateQuestionTagLink.create({
        questionId: newObject.id,
        questionTagId: tagsId,
      });
    }

    return newObject;
  },
  async et_course_template_question_mcq_edit(parent, { id, data }, context, info) {
    const etCourseTemplateQuestionMCQ = await db.etCourseTemplateQuestionMCQ.findByPk(id);

          if (data.tags) {
      const tagsIds = data.tags;
      for (const tagsId of tagsIds) {
        await db.etCourseTemplateQuestionTagLink.create({
          questionId: newObject.id,
          questionTagId: tagsId,
        });
      }
    }
  
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

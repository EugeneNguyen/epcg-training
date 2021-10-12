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
      const questionsLinks = await db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionTagId: etCourseTemplateQuestionTag.id
        }
      });
      const questionsOldIds = questionsLinks.map(link => link.questionId);

      const addIds = questionsIds.filter(x => !questionsOldIds.includes(x));
      const rmvIds = questionsOldIds.filter(x => !questionsIds.includes(x));

      for (const addId of addIds) {
        await db.etCourseTemplateQuestionTagLink.create({
          questionTagId: id,
          questionId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.etCourseTemplateQuestionTagLink.destroy({
          where: {
            questionTagId: id,
            questionId: rmvId,
          }
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

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
      const tagsLinks = await db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionId: etCourseTemplateQuestionMCQ.id
        }
      });
      const tagsOldIds = tagsLinks.map(link => link.questionTagId);

      const addIds = tagsIds.filter(x => !tagsOldIds.includes(x));
      const rmvIds = tagsOldIds.filter(x => !tagsIds.includes(x));

      for (const addId of addIds) {
        await db.etCourseTemplateQuestionTagLink.create({
          questionId: id,
          questionTagId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.etCourseTemplateQuestionTagLink.destroy({
          where: {
            questionId: id,
            questionTagId: rmvId,
          }
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

let db = require('../../database/models');

let mutation = {
  async et_course_template_exam_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateExam.create(data);

    const questionsIds = data.questions;
    for (const questionsId of questionsIds) {
      await db.etCourseTemplateExamQuestion.create({
        examId: newObject.id,
        questionId: questionsId,
      });
    }

    return newObject;
  },
  async et_course_template_exam_edit(parent, { id, data }, context, info) {
    const etCourseTemplateExam = await db.etCourseTemplateExam.findByPk(id);

    if (data.questions) {
      const questionsIds = data.questions;
      const questionsLinks = await db.etCourseTemplateExamQuestion.findAll({
        where: {
          examId: etCourseTemplateExam.id
        }
      });
      const questionsOldIds = questionsLinks.map(link => link.questionId);

      const addIds = questionsIds.filter(x => !questionsOldIds.includes(x));
      const rmvIds = questionsOldIds.filter(x => !questionsIds.includes(x));

      for (const addId of addIds) {
        await db.etCourseTemplateExamQuestion.create({
          examId: id,
          questionId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.etCourseTemplateExamQuestion.destroy({
          where: {
            examId: id,
            questionId: rmvId,
          }
        });
      }
    }

    await etCourseTemplateExam.update(data);
    await etCourseTemplateExam.reload();

    return etCourseTemplateExam;
  },
  async et_course_template_exam_delete(parent, { id }, context, info) {
    const etCourseTemplateExam = await db.etCourseTemplateExam.findByPk(id);
    await etCourseTemplateExam.destroy();
    return true;
  },

};

module.exports = mutation;

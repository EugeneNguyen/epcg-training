const db = require('../../database/models');

const query = {
  async et_course_template_question_mcq_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.etCourseTemplateQuestionMCQ.findAndCountAll({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
      order: [['questionCode', 'ASC']],
    });
    return {
      rows: result.rows,
      pagination: {
        total: result.count,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    };
  },
  et_course_template_question_mcq_get_all(parent, {where}, context, info) {
    return db.etCourseTemplateQuestionMCQ.findAll({
      where,
      order: [['questionCode', 'ASC']],
    });
  },
  et_course_template_question_mcq_get_by_id(parent, {id}, context, info) {
    return db.etCourseTemplateQuestionMCQ.findByPk(id);
  },
};

module.exports = query;

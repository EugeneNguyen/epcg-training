const db = require('../../database/models');

const query = {
  async et_course_template_exam_question_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.etCourseTemplateExamQuestion.findAndCountAll({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
      order: [['order', 'ASC']],
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
  et_course_template_exam_question_get_all(parent, {where}, context, info) {
    return db.etCourseTemplateExamQuestion.findAll({
      where,
      order: [['order', 'ASC']],
    });
  },
  et_course_template_exam_question_get_by_id(parent, {id}, context, info) {
    return db.etCourseTemplateExamQuestion.findByPk(id);
  },
};

module.exports = query;

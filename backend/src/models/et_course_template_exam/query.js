const db = require('../../database/models');
const Op = db.Sequelize.Op;

const query = {
  async et_course_template_exam_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.etCourseTemplateExam.findAndCountAll({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
      order: [['name', 'ASC']],
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
  et_course_template_exam_get_all(parent, {where}, context, info) {
    return db.etCourseTemplateExam.findAll({
      where,
      order: [['name', 'ASC']],
    });
  },
  et_course_template_exam_get_by_id(parent, {id}, context, info) {
    return db.etCourseTemplateExam.findByPk(id);
  },
};

module.exports = query;

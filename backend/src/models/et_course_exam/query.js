const db = require('../../database/models');

const query = {
  async et_course_exam_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.etCourseExam.findAndCountAll({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
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
  et_course_exam_get_all(parent, {where}, context, info) {
    return db.etCourseExam.findAll({
      where,
    });
  },
  et_course_exam_get_by_id(parent, {id}, context, info) {
    return db.etCourseExam.findByPk(id);
  },
};

module.exports = query;
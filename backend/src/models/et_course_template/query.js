const db = require('../../database/models');
const Op = db.Sequelize.Op;

const query = {
  async et_course_template_get_all_with_page(parent, {pagination, where={}}, context, info) {
    const result = await db.etCourseTemplate.findAndCountAll({
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
  et_course_template_get_all(parent, {where}, context, info) {
    return db.etCourseTemplate.findAll({
      where,
    });
  },
  et_course_template_get_by_id(parent, {id}, context, info) {
    return db.etCourseTemplate.findByPk(id);
  },
};

module.exports = query;

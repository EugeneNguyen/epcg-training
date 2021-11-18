const db = require('../../database/models');
const Op = db.Sequelize.Op;

const query = {
  async et_course_template_question_tag_get_all_with_page(parent, {pagination, where={}, searchBy}, context, info) {
    if (searchBy) where.name = {[Op.like]: `%${searchBy}%`}
    const result = await db.etCourseTemplateQuestionTag.findAndCountAll({
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
  et_course_template_question_tag_get_all(parent, {where}, context, info) {
    return db.etCourseTemplateQuestionTag.findAll({
      where,
      order: [['', '']],
    });
  },
  et_course_template_question_tag_get_by_id(parent, {id}, context, info) {
    return db.etCourseTemplateQuestionTag.findByPk(id);
  },
};

module.exports = query;

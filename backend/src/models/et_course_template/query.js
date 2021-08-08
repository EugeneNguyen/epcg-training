let db = require('../../database/models');

let query = {
  et_course_template_get_all(parent, args, context, info) {
    return db.etCourseTemplate.findAll();
  },
  et_course_template_get_by_id(parent, {id}, context, info) {
    return db.etCourseTemplate.findByPk(id);
  },
};

module.exports = query;

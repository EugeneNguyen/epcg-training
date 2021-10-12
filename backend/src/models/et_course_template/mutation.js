let db = require('../../database/models');

let mutation = {
  async et_course_template_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplate.create(data);


    return newObject;
  },
  async et_course_template_edit(parent, { id, data }, context, info) {
    const etCourseTemplate = await db.etCourseTemplate.findByPk(id);


    await etCourseTemplate.update(data);
    await etCourseTemplate.reload();

    return etCourseTemplate;
  },
  async et_course_template_delete(parent, { id }, context, info) {
    const etCourseTemplate = await db.etCourseTemplate.findByPk(id);
    await etCourseTemplate.destroy();
    return true;
  },

};

module.exports = mutation;

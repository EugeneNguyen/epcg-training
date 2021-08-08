let db = require('../../database/models');

let mutation = {
  async et_course_template_add(parent, { data }, context, info) {
    return db.etCourseTemplate.create({
      name: data.name,
      educationProviderId: data.educationProviderId,
    });
  },
  async et_course_template_edit(parent, { id, data }, context, info) {
    const etCourseTemplate = await db.etCourseTemplate.findByPk(id);
    etCourseTemplate.name = data.name;
    etCourseTemplate.educationProviderId = data.educationProviderId;
    await etCourseTemplate.save();
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
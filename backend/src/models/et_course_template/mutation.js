let db = require('../../database/models');

let mutation = {
  async et_course_template_add(parent, { data }, context, info) {
    return db.etCourseTemplate.create({
      name: data.name,
      education_provider_id: data.education_provider_id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  },
  async et_course_template_edit(parent, { id, data }, context, info) {
    const etCourseTemplate = await db.etCourseTemplate.findByPk(id);
    etCourseTemplate.name = data.name;
    etCourseTemplate.education_provider_id = data.education_provider_id;
    etCourseTemplate.createdAt = data.createdAt;
    etCourseTemplate.updatedAt = data.updatedAt;
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

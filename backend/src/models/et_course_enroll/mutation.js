let db = require('../../database/models');

let mutation = {
  async et_course_enroll_add(parent, { data }, context, info) {
    const newObject = await db.etCourseEnroll.create(data);


    return newObject;
  },
  async et_course_enroll_edit(parent, { id, data }, context, info) {
    const etCourseEnroll = await db.etCourseEnroll.findByPk(id);


    await etCourseEnroll.update(data);
    await etCourseEnroll.reload();

    return etCourseEnroll;
  },
  async et_course_enroll_delete(parent, { id }, context, info) {
    const etCourseEnroll = await db.etCourseEnroll.findByPk(id);
    await etCourseEnroll.destroy();
    return true;
  },

};

module.exports = mutation;

let db = require('../../database/models');

let mutation = {
  async et_course_add(parent, { data }, context, info) {
    const newObject = await db.etCourse.create(data);


    return newObject;
  },
  async et_course_edit(parent, { id, data }, context, info) {
    const etCourse = await db.etCourse.findByPk(id);


    await etCourse.update(data);
    await etCourse.reload();

    return etCourse;
  },
  async et_course_delete(parent, { id }, context, info) {
    const etCourse = await db.etCourse.findByPk(id);
    await etCourse.destroy();
    return true;
  },

};

module.exports = mutation;

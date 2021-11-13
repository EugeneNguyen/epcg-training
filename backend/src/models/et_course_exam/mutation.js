let db = require('../../database/models');

let mutation = {
  async et_course_exam_add(parent, { data }, context, info) {
    const newObject = await db.etCourseExam.create(data);


    return newObject;
  },
  async et_course_exam_edit(parent, { id, data }, context, info) {
    const etCourseExam = await db.etCourseExam.findByPk(id);


    await etCourseExam.update(data);
    await etCourseExam.reload();

    return etCourseExam;
  },
  async et_course_exam_delete(parent, { id }, context, info) {
    const etCourseExam = await db.etCourseExam.findByPk(id);
    await etCourseExam.destroy();
    return true;
  },

};

module.exports = mutation;

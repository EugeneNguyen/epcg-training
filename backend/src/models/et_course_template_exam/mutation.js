let db = require('../../database/models');

let mutation = {
  async et_course_template_exam_add(parent, { data }, context, info) {
    const newObject = await db.etCourseTemplateExam.create(data);


    return newObject;
  },
  async et_course_template_exam_edit(parent, { id, data }, context, info) {
    const etCourseTemplateExam = await db.etCourseTemplateExam.findByPk(id);

    
    await etCourseTemplateExam.update(data);
    await etCourseTemplateExam.reload();

    return etCourseTemplateExam;
  },
  async et_course_template_exam_delete(parent, { id }, context, info) {
    const etCourseTemplateExam = await db.etCourseTemplateExam.findByPk(id);
    await etCourseTemplateExam.destroy();
    return true;
  },

};

module.exports = mutation;

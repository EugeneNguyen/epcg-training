const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
`;

let query = `
`;

let mutation = `
  manual_create_attempt_from_course_template_exam(course_template_exam_id: String): EtExamAttempt
`;

module.exports = {
  type,
  query,
  mutation,
}
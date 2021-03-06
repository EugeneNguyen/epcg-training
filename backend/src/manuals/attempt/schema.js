const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
`;

let query = `
`;

let mutation = `
  manual_create_attempt_from_course_template_exam(examId: String, token: String): EtExamAttempt
  manual_exam_attempt_answer(id: String, rawAnswer: String): EtExamAttemptQuestion
  manual_exam_attempt_start(id: String): EtExamAttempt
  manual_exam_attempt_end(id: String): EtExamAttempt
  manual_adhoc: Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}
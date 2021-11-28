const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtExamAttempt {
  id: String
  userId: String
  examId: String
  templateExamId: String
  duration: Int
  startTime: String
  endTime: String
  createdAt: String
  updatedAt: String
  questions(where: EtExamAttemptQuestionWhere): [EtExamAttemptQuestion]
  questionsCount(where: EtExamAttemptQuestionWhere): Int
  templateExam: EtCourseTemplateExam
  user: TgUser
  exam: EtCourseExam
}

type EtExamAttemptWithPagination {
  rows: [EtExamAttempt]
  pagination: EtExamAttemptPagination
}

type EtExamAttemptPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtExamAttemptInput {
  examId: String
  templateExamId: String
  duration: Int
  startTime: String
  endTime: String
  createdAt: String
  updatedAt: String
}

input EtExamAttemptPaginationInput {
  offset: Int
  limit: Int
}

input EtExamAttemptWhere {
  id: String
  userId: String
  examId: String
  templateExamId: String
  duration: Int
  startTime: String
  endTime: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_exam_attempt_get_all(where: EtExamAttemptWhere): [EtExamAttempt]
  et_exam_attempt_get_all_with_page(pagination: EtExamAttemptPaginationInput, where: EtExamAttemptWhere): EtExamAttemptWithPagination
  et_exam_attempt_get_by_id(id: String): EtExamAttempt
`;

let mutation = `
  et_exam_attempt_add(data: EtExamAttemptInput): EtExamAttempt
  et_exam_attempt_edit(id: String, data: EtExamAttemptInput): EtExamAttempt
  et_exam_attempt_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}
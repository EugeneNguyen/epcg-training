const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtExamAttemptQuestion {
  id: String
  attemptId: String
  questionId: String
  order: String
  questionData: String
  answer: String
  rawAnswer: String
  correct: String
  startTime: String
  endTime: String
  createdAt: String
  updatedAt: String
}

type EtExamAttemptQuestionWithPagination {
  rows: [EtExamAttemptQuestion]
  pagination: EtExamAttemptQuestionPagination
}

type EtExamAttemptQuestionPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtExamAttemptQuestionInput {
  attemptId: String
  questionId: String
  order: String
  questionData: String
  answer: String
  rawAnswer: String
  correct: String
  startTime: String
  endTime: String
}

input EtExamAttemptQuestionPaginationInput {
  offset: Int
  limit: Int
}

input EtExamAttemptQuestionWhere {
  id: String
  attemptId: String
  questionId: String
  order: String
  questionData: String
  answer: String
  rawAnswer: String
  correct: String
  startTime: String
  endTime: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_exam_attempt_question_get_all(where: EtExamAttemptQuestionWhere): [EtExamAttemptQuestion]
  et_exam_attempt_question_get_all_with_page(pagination: EtExamAttemptQuestionPaginationInput, where: EtExamAttemptQuestionWhere): EtExamAttemptQuestionWithPagination
  et_exam_attempt_question_get_by_id(id: String): EtExamAttemptQuestion
`;

let mutation = `
  et_exam_attempt_question_add(data: EtExamAttemptQuestionInput): EtExamAttemptQuestion
  et_exam_attempt_question_edit(id: String, data: EtExamAttemptQuestionInput): EtExamAttemptQuestion
  et_exam_attempt_question_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}
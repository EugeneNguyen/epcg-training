import {gql} from "@apollo/client";

const ALL = gql`
query et_exam_attempt_question_get_all($where: EtExamAttemptQuestionWhere) {
  data: et_exam_attempt_question_get_all(where: $where) {
    id
    attemptId
    questionId
    order
    questionData
    answer
    rawAnswer
    correct
    startTime
    endTime
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_exam_attempt_question_get_all_with_page($pagination: EtExamAttemptQuestionPaginationInput, $where: EtExamAttemptQuestionWhere) {
  data: et_exam_attempt_question_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      attemptId
      questionId
      order
      questionData
      answer
      rawAnswer
      correct
      startTime
      endTime
      createdAt
      updatedAt
    }
    pagination {
      total
      offset
      limit
    }
  }
}
`;

const GET_BY_ID = gql`
query et_exam_attempt_question_get_by_id($id: String) {
  data: et_exam_attempt_question_get_by_id(id: $id) {
    id
    attemptId
    questionId
    order
    questionData
    answer
    rawAnswer
    correct
    startTime
    endTime
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation et_exam_attempt_question_add($data: EtExamAttemptQuestionInput) {
  et_exam_attempt_question_add(data: $data) {
    id
    attemptId
    questionId
    order
    questionData
    answer
    rawAnswer
    correct
    startTime
    endTime
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_exam_attempt_question_edit($id: String, $data: EtExamAttemptQuestionInput) {
  et_exam_attempt_question_edit(id: $id, data: $data) {
    id
    attemptId
    questionId
    order
    questionData
    answer
    rawAnswer
    correct
    startTime
    endTime
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_exam_attempt_question_delete($id: String) {
  et_exam_attempt_question_delete(id: $id)
}
`;

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  ALL,
  ALL_WITH_PAGE,
  GET_BY_ID,
  ADD,
  EDIT,
  DELETE,
  DEFAULT_OPTIONS,
};

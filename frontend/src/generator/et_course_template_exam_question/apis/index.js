import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_exam_question_get_all($where: EtCourseTemplateExamQuestionWhere) {
  data: et_course_template_exam_question_get_all(where: $where) {
    id
    examId
    questionId
    order
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_exam_question_get_all_with_page($pagination: EtCourseTemplateExamQuestionPaginationInput, $where: EtCourseTemplateExamQuestionWhere) {
  data: et_course_template_exam_question_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      examId
      question {
        id
        questionCode
      }
      questionId
      order
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
query et_course_template_exam_question_get_by_id($id: String) {
  data: et_course_template_exam_question_get_by_id(id: $id) {
    id
    examId
    question {
      id
      questionCode
    }
    questionId
    order
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation et_course_template_exam_question_add($data: EtCourseTemplateExamQuestionInput) {
  et_course_template_exam_question_add(data: $data) {
    id
    examId
    questionId
    order
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_exam_question_edit($id: String, $data: EtCourseTemplateExamQuestionInput) {
  et_course_template_exam_question_edit(id: $id, data: $data) {
    id
    examId
    questionId
    order
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_exam_question_delete($id: String) {
  et_course_template_exam_question_delete(id: $id)
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

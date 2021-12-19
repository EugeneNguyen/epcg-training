import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_question_source_get_all($where: EtCourseTemplateQuestionSourceWhere) {
  data: et_course_template_question_source_get_all(where: $where) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_question_source_get_all_with_page($pagination: EtCourseTemplateQuestionSourcePaginationInput, $where: EtCourseTemplateQuestionSourceWhere, $searchBy: String) {
  data: et_course_template_question_source_get_all_with_page(pagination: $pagination, where: $where, searchBy: $searchBy) {
    rows {
      id
      name
      courseTemplateId
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
query et_course_template_question_source_get_by_id($id: String) {
  data: et_course_template_question_source_get_by_id(id: $id) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const GET_ET_COURSE_TEMPLATE_QUESTION_MCQ = gql`
query et_course_template_question_source_get_by_id($id: String) {
  et_course_template_question_source_get_by_id(id: $id) {
    id
    questionCode
    question
    questionImageId
    answerA
    answerB
    answerC
    answerD
    correctAnswer
    explanation
    courseTemplateId
    score
    questionSourceId
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation et_course_template_question_source_add($data: EtCourseTemplateQuestionSourceInput) {
  et_course_template_question_source_add(data: $data) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_question_source_edit($id: String, $data: EtCourseTemplateQuestionSourceInput) {
  et_course_template_question_source_edit(id: $id, data: $data) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_question_source_delete($id: String) {
  et_course_template_question_source_delete(id: $id)
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

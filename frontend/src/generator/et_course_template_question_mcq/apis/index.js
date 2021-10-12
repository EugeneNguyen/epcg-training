import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_question_mcq_get_all($where: EtCourseTemplateQuestionMcqWhere) {
  data: et_course_template_question_mcq_get_all(where: $where) {
    id
    questionCode
    question
    answerA
    answerB
    answerC
    answerD
    correctAnswer
    explanation
    courseTemplateId
    questionSourceId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_question_mcq_get_all_with_page($pagination: EtCourseTemplateQuestionMcqPaginationInput, $where: EtCourseTemplateQuestionMcqWhere) {
  data: et_course_template_question_mcq_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      questionCode
      question
      answerA
      answerB
      answerC
      answerD
      correctAnswer
      explanation
      courseTemplate {
        id
        name
      }
      courseTemplateId
      questionSource {
        id
        name
      }
      questionSourceId
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
query et_course_template_question_mcq_get_by_id($id: String) {
  data: et_course_template_question_mcq_get_by_id(id: $id) {
    id
    questionCode
    question
    answerA
    answerB
    answerC
    answerD
    correctAnswer
    explanation
    courseTemplate {
      id
      name
    }
    courseTemplateId
    questionSource {
      id
      name
    }
    questionSourceId
    createdAt
    updatedAt
    tags {
      id
      name
    }
  }
}
`;


const ADD = gql`
mutation et_course_template_question_mcq_add($data: EtCourseTemplateQuestionMcqInput) {
  et_course_template_question_mcq_add(data: $data) {
    id
    questionCode
    question
    answerA
    answerB
    answerC
    answerD
    correctAnswer
    explanation
    courseTemplateId
    questionSourceId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_question_mcq_edit($id: String, $data: EtCourseTemplateQuestionMcqInput) {
  et_course_template_question_mcq_edit(id: $id, data: $data) {
    id
    questionCode
    question
    answerA
    answerB
    answerC
    answerD
    correctAnswer
    explanation
    courseTemplateId
    questionSourceId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_question_mcq_delete($id: String) {
  et_course_template_question_mcq_delete(id: $id)
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

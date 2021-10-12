import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_get_all($where: EtCourseTemplateWhere) {
  data: et_course_template_get_all(where: $where) {
    id
    name
    educationProviderId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_get_all_with_page($pagination: EtCourseTemplatePaginationInput, $where: EtCourseTemplateWhere) {
  data: et_course_template_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      name
      educationProvider {
        id
        name
      }
      educationProviderId
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
query et_course_template_get_by_id($id: String) {
  data: et_course_template_get_by_id(id: $id) {
    id
    name
    educationProvider {
      id
      name
    }
    educationProviderId
    createdAt
    updatedAt
  }
}
`;

const GET_ET_COURSE_TEMPLATE_QUESTION_MCQ = gql`
query et_course_template_get_by_id($id: String) {
  et_course_template_get_by_id(id: $id) {
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
const GET_ET_COURSE_TEMPLATE_QUESTION_SOURCE = gql`
query et_course_template_get_by_id($id: String) {
  et_course_template_get_by_id(id: $id) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;
const GET_ET_COURSE_TEMPLATE_QUESTION_TAG = gql`
query et_course_template_get_by_id($id: String) {
  et_course_template_get_by_id(id: $id) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;
const GET_ET_COURSE_TEMPLATE_EXAM = gql`
query et_course_template_get_by_id($id: String) {
  et_course_template_get_by_id(id: $id) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation et_course_template_add($data: EtCourseTemplateInput) {
  et_course_template_add(data: $data) {
    id
    name
    educationProviderId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_edit($id: String, $data: EtCourseTemplateInput) {
  et_course_template_edit(id: $id, data: $data) {
    id
    name
    educationProviderId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_delete($id: String) {
  et_course_template_delete(id: $id)
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

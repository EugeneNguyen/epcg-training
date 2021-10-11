import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_question_tag_get_all($where: EtCourseTemplateQuestionTagWhere) {
  data: et_course_template_question_tag_get_all(where: $where) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_question_tag_get_all_with_page($pagination: EtCourseTemplateQuestionTagPaginationInput, $where: EtCourseTemplateQuestionTagWhere) {
  data: et_course_template_question_tag_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      name
      courseTemplate {
        id
        name
      }
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
query et_course_template_question_tag_get_by_id($id: String) {
  data: et_course_template_question_tag_get_by_id(id: $id) {
  id
  name
  courseTemplate {
  id
  name
  }
  courseTemplateId
  createdAt
  updatedAt
  }
}
`;


const ADD = gql`
mutation et_course_template_question_tag_add($data: EtCourseTemplateQuestionTagInput) {
  et_course_template_question_tag_add(data: $data) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_question_tag_edit($id: String, $data: EtCourseTemplateQuestionTagInput) {
  et_course_template_question_tag_edit(id: $id, data: $data) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_question_tag_delete($id: String) {
  et_course_template_question_tag_delete(id: $id)
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

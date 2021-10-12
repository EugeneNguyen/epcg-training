import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_exam_get_all($where: EtCourseTemplateExamWhere) {
  data: et_course_template_exam_get_all(where: $where) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_exam_get_all_with_page($pagination: EtCourseTemplateExamPaginationInput, $where: EtCourseTemplateExamWhere) {
  data: et_course_template_exam_get_all_with_page(pagination: $pagination, where: $where) {
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
query et_course_template_exam_get_by_id($id: String) {
  data: et_course_template_exam_get_by_id(id: $id) {
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

const GET_ET_COURSE_TEMPLATE_EXAM_QUESTION = gql`
query et_course_template_exam_get_by_id($id: String) {
  et_course_template_exam_get_by_id(id: $id) {
    id
    examId
    questionId
    order
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation et_course_template_exam_add($data: EtCourseTemplateExamInput) {
  et_course_template_exam_add(data: $data) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_exam_edit($id: String, $data: EtCourseTemplateExamInput) {
  et_course_template_exam_edit(id: $id, data: $data) {
    id
    name
    courseTemplateId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_exam_delete($id: String) {
  et_course_template_exam_delete(id: $id)
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

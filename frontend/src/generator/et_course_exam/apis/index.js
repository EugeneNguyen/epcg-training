import {gql} from "@apollo/client";

const ALL = gql`
query et_course_exam_get_all($where: EtCourseExamWhere) {
  data: et_course_exam_get_all(where: $where) {
    id
    name
    courseId
    courseTemplateExamId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_exam_get_all_with_page($pagination: EtCourseExamPaginationInput, $where: EtCourseExamWhere) {
  data: et_course_exam_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      name
      course {
        id
        name
      }
      courseId
      courseTemplateExam {
        id
        name
      }
      courseTemplateExamId
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
query et_course_exam_get_by_id($id: String) {
  data: et_course_exam_get_by_id(id: $id) {
    id
    name
    course {
      id
      name
    }
    courseId
    courseTemplateExam {
      id
      name
    }
    courseTemplateExamId
    createdAt
    updatedAt
  }
}
`;

const GET_ET_EXAM_ATTEMPT = gql`
query et_course_exam_get_by_id($id: String) {
  et_course_exam_get_by_id(id: $id) {
    id
    userId
    examId
    templateExamId
    duration
    startTime
    endTime
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation et_course_exam_add($data: EtCourseExamInput) {
  et_course_exam_add(data: $data) {
    id
    name
    courseId
    courseTemplateExamId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_exam_edit($id: String, $data: EtCourseExamInput) {
  et_course_exam_edit(id: $id, data: $data) {
    id
    name
    courseId
    courseTemplateExamId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_exam_delete($id: String) {
  et_course_exam_delete(id: $id)
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

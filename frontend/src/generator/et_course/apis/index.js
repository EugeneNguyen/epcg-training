import {gql} from "@apollo/client";

const ALL = gql`
query et_course_get_all($where: EtCourseWhere) {
  data: et_course_get_all(where: $where) {
    id
    name
    educationProviderId
    courseTemplateId
    isPrivateCourse
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_get_all_with_page($pagination: EtCoursePaginationInput, $where: EtCourseWhere) {
  data: et_course_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      name
      educationProvider {
        id
        name
      }
      educationProviderId
      courseTemplate {
        id
        name
      }
      courseTemplateId
      isPrivateCourse
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
query et_course_get_by_id($id: String) {
  data: et_course_get_by_id(id: $id) {
    id
    name
    educationProvider {
      id
      name
    }
    educationProviderId
    courseTemplate {
      id
      name
    }
    courseTemplateId
    isPrivateCourse
    createdAt
    updatedAt
  }
}
`;

const GET_ET_COURSE_ENROLL = gql`
query et_course_get_by_id($id: String) {
  et_course_get_by_id(id: $id) {
    id
    courseId
    userId
    isActive
    createdAt
    updatedAt
  }
}
`;
const GET_ET_COURSE_EXAM = gql`
query et_course_get_by_id($id: String) {
  et_course_get_by_id(id: $id) {
    id
    name
    courseId
    courseTemplateExamId
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation et_course_add($data: EtCourseInput) {
  et_course_add(data: $data) {
    id
    name
    educationProviderId
    courseTemplateId
    isPrivateCourse
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_edit($id: String, $data: EtCourseInput) {
  et_course_edit(id: $id, data: $data) {
    id
    name
    educationProviderId
    courseTemplateId
    isPrivateCourse
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_delete($id: String) {
  et_course_delete(id: $id)
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

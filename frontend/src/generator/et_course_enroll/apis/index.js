import {gql} from "@apollo/client";

const ALL = gql`
query et_course_enroll_get_all($where: EtCourseEnrollWhere) {
  data: et_course_enroll_get_all(where: $where) {
    id
    courseId
    userId
    isActive
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_enroll_get_all_with_page($pagination: EtCourseEnrollPaginationInput, $where: EtCourseEnrollWhere) {
  data: et_course_enroll_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      course {
        id
        name
      }
      courseId
      user {
        id
        username
      }
      userId
      isActive
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
query et_course_enroll_get_by_id($id: String) {
  data: et_course_enroll_get_by_id(id: $id) {
    id
    course {
      id
      name
    }
    courseId
    user {
      id
      username
    }
    userId
    isActive
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation et_course_enroll_add($data: EtCourseEnrollInput) {
  et_course_enroll_add(data: $data) {
    id
    courseId
    userId
    isActive
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_enroll_edit($id: String, $data: EtCourseEnrollInput) {
  et_course_enroll_edit(id: $id, data: $data) {
    id
    courseId
    userId
    isActive
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_enroll_delete($id: String) {
  et_course_enroll_delete(id: $id)
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

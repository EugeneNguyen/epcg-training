import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_get_all {
  et_course_template_get_all {
    id
    name
    education_provider_id
    createdAt
    updatedAt
  }
}
`;

const GET_BY_ID = gql`
query et_course_template_get_by_id($id: String) {
  et_course_template_get_by_id(id: $id) {
    id
    name
    education_provider_id
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
    education_provider_id
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
    education_provider_id
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
  fetchPolicy: "cache-and-network",
}

export default {
  ALL,
  GET_BY_ID,
  ADD,
  EDIT,
  DELETE,
  DEFAULT_OPTIONS,
};

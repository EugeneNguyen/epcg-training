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
query {{modelNameSnake}}_get_by_id($id: String) {
  {{modelNameSnake}}_get_by_id(id: $id) {
    {{#fieldsArray}}
    {{name}}
    {{/fieldsArray}}
  }
}
`;

const ADD = gql`
mutation {{modelNameSnake}}_add($data: {{modelNameCapitalCamel}}Input) {
  {{modelNameSnake}}_add(data: $data) {
    {{#fieldsArray}}
    {{name}}
    {{/fieldsArray}}
  }
}
`;

const EDIT = gql`
mutation {{modelNameSnake}}_edit($id: String, $data: {{modelNameCapitalCamel}}Input) {
  {{modelNameSnake}}_edit(id: $id, data: $data) {
    {{#fieldsArray}}
    {{name}}
    {{/fieldsArray}}
  }
}
`;

const DELETE = gql`
mutation {{modelNameSnake}}_delete($id: String) {
  {{modelNameSnake}}_delete(id: $id)
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

import {gql} from "@apollo/client";

const ALL = gql`
query et_education_provider_get_all {
  et_education_provider_get_all {
    id
    name
    createdAt
    updatedAt
  }
}
`;

const GET_BY_ID = gql`
query et_education_provider_get_by_id($id: String) {
  et_education_provider_get_by_id(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation et_education_provider_add($data: EtEducationProviderInput) {
  et_education_provider_add(data: $data) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_education_provider_edit($id: String, $data: EtEducationProviderInput) {
  et_education_provider_edit(id: $id, data: $data) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_education_provider_delete($id: String) {
  et_education_provider_delete(id: $id)
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

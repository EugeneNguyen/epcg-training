import {gql} from "@apollo/client";

const ALL = gql`
query et_education_provider_get_all($where: EtEducationProviderWhere) {
  data: et_education_provider_get_all(where: $where) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_education_provider_get_all_with_page($pagination: EtEducationProviderPaginationInput, $where: EtEducationProviderWhere, $searchBy: String) {
  data: et_education_provider_get_all_with_page(pagination: $pagination, where: $where, searchBy: $searchBy) {
    rows {
      id
      name
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
query et_education_provider_get_by_id($id: String) {
  data: et_education_provider_get_by_id(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

const GET_ET_COURSE_TEMPLATE = gql`
query et_education_provider_get_by_id($id: String) {
  et_education_provider_get_by_id(id: $id) {
    id
    name
    educationProviderId
    createdAt
    updatedAt
  }
}
`;
const GET_ET_COURSE = gql`
query et_education_provider_get_by_id($id: String) {
  et_education_provider_get_by_id(id: $id) {
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

import {gql} from "@apollo/client";

const ALL = gql`
query tg_permission_get_all($where: TgPermissionWhere) {
  data: tg_permission_get_all(where: $where) {
    id
    name
    description
    groupId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_permission_get_all_with_page($pagination: TgPermissionPaginationInput, $where: TgPermissionWhere) {
  data: tg_permission_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      name
      description
      group {
        id
        name
      }
      groupId
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
query tg_permission_get_by_id($id: String) {
  data: tg_permission_get_by_id(id: $id) {
    id
    name
    description
    group {
      id
      name
    }
    groupId
    createdAt
    updatedAt
    roles {
      id
      name
    }
  }
}
`;


const ADD = gql`
mutation tg_permission_add($data: TgPermissionInput) {
  tg_permission_add(data: $data) {
    id
    name
    description
    groupId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_permission_edit($id: String, $data: TgPermissionInput) {
  tg_permission_edit(id: $id, data: $data) {
    id
    name
    description
    groupId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_permission_delete($id: String) {
  tg_permission_delete(id: $id)
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

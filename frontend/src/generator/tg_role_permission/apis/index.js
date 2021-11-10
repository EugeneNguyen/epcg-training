import {gql} from "@apollo/client";

const ALL = gql`
query tg_role_permission_get_all($where: TgRolePermissionWhere) {
  data: tg_role_permission_get_all(where: $where) {
    id
    roleId
    permissionId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_role_permission_get_all_with_page($pagination: TgRolePermissionPaginationInput, $where: TgRolePermissionWhere) {
  data: tg_role_permission_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      roleId
      permissionId
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
query tg_role_permission_get_by_id($id: String) {
  data: tg_role_permission_get_by_id(id: $id) {
    id
    roleId
    permissionId
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation tg_role_permission_add($data: TgRolePermissionInput) {
  tg_role_permission_add(data: $data) {
    id
    roleId
    permissionId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_role_permission_edit($id: String, $data: TgRolePermissionInput) {
  tg_role_permission_edit(id: $id, data: $data) {
    id
    roleId
    permissionId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_role_permission_delete($id: String) {
  tg_role_permission_delete(id: $id)
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

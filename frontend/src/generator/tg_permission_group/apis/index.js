import {gql} from "@apollo/client";

const ALL = gql`
query tg_permission_group_get_all($where: TgPermissionGroupWhere) {
  data: tg_permission_group_get_all(where: $where) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_permission_group_get_all_with_page($pagination: TgPermissionGroupPaginationInput, $where: TgPermissionGroupWhere) {
  data: tg_permission_group_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      name
      description
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
query tg_permission_group_get_by_id($id: String) {
  data: tg_permission_group_get_by_id(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const GET_TG_PERMISSION = gql`
query tg_permission_group_get_by_id($id: String) {
  tg_permission_group_get_by_id(id: $id) {
    id
    name
    description
    groupId
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation tg_permission_group_add($data: TgPermissionGroupInput) {
  tg_permission_group_add(data: $data) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_permission_group_edit($id: String, $data: TgPermissionGroupInput) {
  tg_permission_group_edit(id: $id, data: $data) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_permission_group_delete($id: String) {
  tg_permission_group_delete(id: $id)
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

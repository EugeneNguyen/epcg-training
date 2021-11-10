import {gql} from "@apollo/client";

const ALL = gql`
query tg_user_role_get_all($where: TgUserRoleWhere) {
  data: tg_user_role_get_all(where: $where) {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_user_role_get_all_with_page($pagination: TgUserRolePaginationInput, $where: TgUserRoleWhere) {
  data: tg_user_role_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      user {
        id
        username
      }
      userId
      role {
        id
        name
      }
      roleId
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
query tg_user_role_get_by_id($id: String) {
  data: tg_user_role_get_by_id(id: $id) {
    id
    user {
      id
      username
    }
    userId
    role {
      id
      name
    }
    roleId
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation tg_user_role_add($data: TgUserRoleInput) {
  tg_user_role_add(data: $data) {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_user_role_edit($id: String, $data: TgUserRoleInput) {
  tg_user_role_edit(id: $id, data: $data) {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_user_role_delete($id: String) {
  tg_user_role_delete(id: $id)
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

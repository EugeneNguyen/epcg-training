import {gql} from "@apollo/client";

const ALL = gql`
query tg_user_get_all($where: TgUserWhere) {
  data: tg_user_get_all(where: $where) {
    id
    username
    password
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_user_get_all_with_page($pagination: TgUserPaginationInput, $where: TgUserWhere) {
  data: tg_user_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      username
      password
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
query tg_user_get_by_id($id: String) {
  data: tg_user_get_by_id(id: $id) {
    id
    username
    password
    createdAt
    updatedAt
    permissions {
      id
      name
    }
    roles {
      id
      name
    }
    courses {
      id
      name
    }
  }
}
`;

const GET_TG_USER_TOKEN = gql`
query tg_user_get_by_id($id: String) {
  tg_user_get_by_id(id: $id) {
    id
    userId
    createdAt
    updatedAt
  }
}
`;

const ADD = gql`
mutation tg_user_add($data: TgUserInput) {
  tg_user_add(data: $data) {
    id
    username
    password
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_user_edit($id: String, $data: TgUserInput) {
  tg_user_edit(id: $id, data: $data) {
    id
    username
    password
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_user_delete($id: String) {
  tg_user_delete(id: $id)
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

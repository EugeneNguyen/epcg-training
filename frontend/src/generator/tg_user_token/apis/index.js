import {gql} from "@apollo/client";

const ALL = gql`
query tg_user_token_get_all($where: TgUserTokenWhere) {
  data: tg_user_token_get_all(where: $where) {
    id
    userId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_user_token_get_all_with_page($pagination: TgUserTokenPaginationInput, $where: TgUserTokenWhere) {
  data: tg_user_token_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      userId
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
query tg_user_token_get_by_id($id: String) {
  data: tg_user_token_get_by_id(id: $id) {
    id
    userId
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation tg_user_token_add($data: TgUserTokenInput) {
  tg_user_token_add(data: $data) {
    id
    userId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_user_token_edit($id: String, $data: TgUserTokenInput) {
  tg_user_token_edit(id: $id, data: $data) {
    id
    userId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_user_token_delete($id: String) {
  tg_user_token_delete(id: $id)
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

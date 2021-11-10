import {gql} from "@apollo/client";

const ALL = gql`
query tg_role_get_all($where: TgRoleWhere) {
  data: tg_role_get_all(where: $where) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_role_get_all_with_page($pagination: TgRolePaginationInput, $where: TgRoleWhere) {
  data: tg_role_get_all_with_page(pagination: $pagination, where: $where) {
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
query tg_role_get_by_id($id: String) {
  data: tg_role_get_by_id(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
    members {
      id
      username
    }
    permission {
      id
      name
    }
  }
}
`;


const ADD = gql`
mutation tg_role_add($data: TgRoleInput) {
  tg_role_add(data: $data) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_role_edit($id: String, $data: TgRoleInput) {
  tg_role_edit(id: $id, data: $data) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_role_delete($id: String) {
  tg_role_delete(id: $id)
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

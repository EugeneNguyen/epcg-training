import {gql} from "@apollo/client";

const ALL = gql`
query tg_file_get_all($where: TgFileWhere) {
  data: tg_file_get_all(where: $where) {
    id
    service
    key
    originalName
    extension
    mimeType
    size
    meta
    ownerUserId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query tg_file_get_all_with_page($pagination: TgFilePaginationInput, $where: TgFileWhere) {
  data: tg_file_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      service
      key
      originalName
      extension
      mimeType
      size
      meta
      ownerUserId
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
query tg_file_get_by_id($id: String) {
  data: tg_file_get_by_id(id: $id) {
    id
    service
    key
    originalName
    extension
    mimeType
    size
    meta
    ownerUserId
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation tg_file_add($data: TgFileInput) {
  tg_file_add(data: $data) {
    id
    service
    key
    originalName
    extension
    mimeType
    size
    meta
    ownerUserId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation tg_file_edit($id: String, $data: TgFileInput) {
  tg_file_edit(id: $id, data: $data) {
    id
    service
    key
    originalName
    extension
    mimeType
    size
    meta
    ownerUserId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation tg_file_delete($id: String) {
  tg_file_delete(id: $id)
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

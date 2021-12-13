const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgFile {
  id: String
  service: String
  key: String
  originalName: String
  extension: String
  mimeType: String
  size: Int
  meta: String
  ownerUserId: String
  createdAt: String
  updatedAt: String
}

type TgFileWithPagination {
  rows: [TgFile]
  pagination: TgFilePagination
}

type TgFilePagination {
  total: Int
  offset: Int
  limit: Int
}

input TgFileInput {
  service: String
  key: String
  originalName: String
  extension: String
  mimeType: String
  size: Int
  meta: String
  ownerUserId: String
  createdAt: String
  updatedAt: String
}

input TgFilePaginationInput {
  offset: Int
  limit: Int
}

input TgFileWhere {
  id: String
  service: String
  key: String
  originalName: String
  extension: String
  mimeType: String
  size: Int
  meta: String
  ownerUserId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_file_get_all(where: TgFileWhere): [TgFile]
  tg_file_get_all_with_page(pagination: TgFilePaginationInput, where: TgFileWhere): TgFileWithPagination
  tg_file_get_by_id(id: String): TgFile
`;

let mutation = `
  tg_file_add(data: TgFileInput): TgFile
  tg_file_edit(id: String, data: TgFileInput): TgFile
  tg_file_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}
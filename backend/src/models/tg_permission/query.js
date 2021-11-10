const db = require('../../database/models');

const query = {
  async tg_permission_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.tgPermission.findAndCountAll({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
    });
    return {
      rows: result.rows,
      pagination: {
        total: result.count,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    };
  },
  tg_permission_get_all(parent, {where}, context, info) {
    return db.tgPermission.findAll({
      where,
    });
  },
  tg_permission_get_by_id(parent, {id}, context, info) {
    return db.tgPermission.findByPk(id);
  },
};

module.exports = query;

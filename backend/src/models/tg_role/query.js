const db = require('../../database/models');

const query = {
  async tg_role_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.tgRole.findAndCountAll({
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
  tg_role_get_all(parent, {where}, context, info) {
    return db.tgRole.findAll({
      where,
    });
  },
  tg_role_get_by_id(parent, {id}, context, info) {
    return db.tgRole.findByPk(id);
  },
};

module.exports = query;

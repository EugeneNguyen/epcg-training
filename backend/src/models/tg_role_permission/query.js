const db = require('../../database/models');
const Op = db.Sequelize.Op;

const query = {
  async tg_role_permission_get_all_with_page(parent, {pagination, where={}}, context, info) {
    const result = await db.tgRolePermission.findAndCountAll({
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
  tg_role_permission_get_all(parent, {where}, context, info) {
    return db.tgRolePermission.findAll({
      where,
    });
  },
  tg_role_permission_get_by_id(parent, {id}, context, info) {
    return db.tgRolePermission.findByPk(id);
  },
};

module.exports = query;

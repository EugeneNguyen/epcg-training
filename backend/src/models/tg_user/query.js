const db = require('../../database/models');
const Op = db.Sequelize.Op;

const query = {
  async tg_user_get_all_with_page(parent, {pagination, where={}, searchBy}, context, info) {
    if (searchBy) where.username = {[Op.like]: `%${searchBy}%`}
    const result = await db.tgUser.findAndCountAll({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
      order: [['username', 'ASC']],
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
  tg_user_get_all(parent, {where}, context, info) {
    return db.tgUser.findAll({
      where,
      order: [['username', 'ASC']],
    });
  },
  tg_user_get_by_id(parent, {id}, context, info) {
    return db.tgUser.findByPk(id);
  },
};

module.exports = query;

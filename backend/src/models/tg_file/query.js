const db = require('../../database/models');
const Op = db.Sequelize.Op;

const query = {
  async tg_file_get_all_with_page(parent, {pagination, where={}}, context, info) {
    const result = await db.tgFile.findAndCountAll({
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
  tg_file_get_all(parent, {where}, context, info) {
    return db.tgFile.findAll({
      where,
    });
  },
  tg_file_get_by_id(parent, {id}, context, info) {
    return db.tgFile.findByPk(id);
  },
};

module.exports = query;

const db = require('../../database/models');

const query = {
  async et_education_provider_get_all_with_page(parent, {pagination, where}, context, info) {
    const result = await db.etEducationProvider.findAndCountAll({
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
  et_education_provider_get_all(parent, {where}, context, info) {
    return db.etEducationProvider.findAll({
      where,
    });
  },
  et_education_provider_get_by_id(parent, {id}, context, info) {
    return db.etEducationProvider.findByPk(id);
  },
};

module.exports = query;

let db = require('../../database/models');

const AuthService = {
  getUserFromToken: async (token) => {
    const userToken = await db.tgUserToken.findByPk(token);
    if (!userToken) {
      throw new Error('Invalid Token');
    }

    const user = await db.tgUser.findByPk(userToken.userId);
    if (!user) {
      throw new Error('Invalid Token');
    }

    return user;
  }
};

module.exports = AuthService;

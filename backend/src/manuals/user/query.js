const db = require('../../database/models');
const {AuthService} = require("../../services");

const query = {
  me(parent, {token}, context, info) {
    return AuthService.getUserFromToken(token);
  },
};

module.exports = query;

const handle = require('../middleware/handle')();
const mock = require('../mock/account')
const login = (req, res) => {
  handle.sendSuccess(req, res, mock.login)
}
const logout = (req, res) => {
  handle.sendSuccess(req, res, mock.logout)
}
const mobileTypeList = (req, res) => {
  handle.sendSuccess(req, res, mock.mobileTypeList)
}

module.exports = {
  login,
  logout,
  mobileTypeList
}

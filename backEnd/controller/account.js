const handle = require('../middleware/handle')();
const mock = require('../mock/account')
const login = (req, res) => {
  handle.sendSuccess(req, res, mock)
}
const logout = (req, res) => {
  handle.sendSuccess(req, res, {
    success: true,
    msg: '退出登录成功'
  })
}

module.exports = {
  login,
  logout
}

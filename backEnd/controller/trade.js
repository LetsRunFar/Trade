const handle = require('../middleware/handle')();
const mock = require('../mock/trade')
const otcAdList = (req, res) => {
  handle.sendSuccess(req, res, mock.otcAdList)
}

module.exports = {
  otcAdList
}

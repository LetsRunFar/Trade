const handle = require('../middleware/handle')();
const mock = require('../mock/order')
const queryOrderIn =(req, res) => {
  handle.sendSuccess(req, res, mock.orderIn)
}
const queryOrderOut = (req, res) => {
  handle.sendSuccess(req, res, mock.orderOut)
}
module.exports = {
  queryOrderIn,queryOrderOut
}

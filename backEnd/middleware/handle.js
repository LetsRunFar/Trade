
const send401 = (req, res) => {
  let data = {
    status: 401,
    description: '您的登录状态已失效，请重新登录'
  };
  res.status(401).send(data).end();
}
const send404 = (req, res) => {
  let data = {
    status: 404,
    description: '404 Not Found'
  };
  res.status(404).send(data).end();
}
const send500 = (req, res, msg) => {
  let data = {
    status: 500,
    description: msg || '404 Not Found'
  };
  res.status(500).send(data).end();
}
const sendSuccess = (req, res, data) => {
  res.status(200).send(data).end();
}
const sendFailure = (req, res, err) => {
  res.status(200).send(err).end();
}

module.exports = () => {
  return {
    send401,
    send404,
    send500,
    sendSuccess,
    sendFailure
  }
}

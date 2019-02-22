const router = require('express').Router()
const clientApi = require('./api/client-api')

const getFileName = require('./middleware/getFileNames')

let handleFn = {}

// 自动读取controller目录下的文件
getFileName('./controller').then(res => {

  // 合并处理函数
  res.forEach(i => {
    let fileName = i.split('.')[0]
    Object.assign(handleFn, require(`./controller/${fileName}`))
  })

  // 根据文件名，匹配接口名，设置路由
  Object.keys(clientApi.getApi).forEach(i => {
    router.get(clientApi.getApi[i], handleFn[i])
  })
  Object.keys(clientApi.postApi).forEach(i => {
    router.post(clientApi.postApi[i], handleFn[i])
  })

}).catch(e => {
  console.log(e)
})

module.exports = router



const orderIn = {
  success: true,
  msg: '查询成功',
  data: [
    {
      id: 0,
      name: '订单名称1',
      price: 8888,
      time: '2019.02.01 19:00:00',
      fromName: '来源',
      toName: '去向'
    },
    {
      id: 1,
      name: '订单名称2',
      price: 6666,
      time: '2019.02.01 19:00:10',
      fromName: '来源',
      toName: '去向'
    }
  ]
}
const orderOut = {
  success: true,
  data: [
    {
      id: 2,
      name: '订单名称3',
      price: 100000,
      time: '2019.02.01 19:00:00',
      fromName: '来源',
      toName: '去向'
    },
    {
      id: 3,
      name: '订单名称4',
      price: 288888,
      time: '2019.02.01 19:00:10',
      fromName: '来源',
      toName: '去向'
    }
  ],
  msg: '查询成功'
}

module.exports = {
  orderIn, orderOut
}

let iposHeader = 'https://dev-apis.qianbao.com/abs/v1/'// abs测试环境
let serverApi = {
  login: 'auth/login',
  billCount: 'storedata/billcount/every',
  billAmount: 'storedata/billamount/every',
  orderCount: 'storedata/ordercount/every',
  orderAmount: 'storedata/orderamount/every',
  adminLogin: 'datalogin/submit',
  adminLogout: 'datalogout'
}
for (let i in serverApi) {
  serverApi[i] = iposHeader + '/' + serverApi[i]
}
module.exports = serverApi

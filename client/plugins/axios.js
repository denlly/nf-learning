import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
// 判断是路由跳转还是 axios 请求
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

export default axios.create(options)

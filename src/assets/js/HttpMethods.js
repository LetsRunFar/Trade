import http from './http'
import GlobalConfig from './config'

const mainUrl = GlobalConfig.domain.mainUrl

export default {
  login() {
    return http.post(mainUrl + '/login')
  },
  logout() {
    return http.post(mainUrl + '/logout')
  }
}

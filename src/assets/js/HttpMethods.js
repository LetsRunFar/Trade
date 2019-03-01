import http from './http'
import GlobalConfig from './config'

const mainUrl = GlobalConfig.domain.mainUrl

export default {
  login() {
    return http.post(mainUrl + '/login')
  },
  logout() {
    return http.post(mainUrl + '/logout')
  },
  mobileTypeList(){
    return http.get(mainUrl + '/mobileTypeList')
  },
  getValidMsg(){
    return http.get(mainUrl + '/getValidMsg')
  },
  queryOrderIn(){
    return http.get(mainUrl + '/queryOrderIn')
  },
  queryOrderOut(){
    return http.get(mainUrl + '/queryOrderOut')
  },
  otcAdList(){
    return http.get(mainUrl + '/otcAdList')
  }
}

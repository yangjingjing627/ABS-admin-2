import { post } from 'http'
import cookie from 'arale-cookie'

let token = cookie.get('access_token')
let tokenStr = '?access_token=' + token
export default class LoginService {
  /**
   * 登录接口
   * @param {string} username 用户名 [必须]
   * @param {string} password 密码 [必须]
   * @returns
   * @memberof LoginService
   */
  login(params) {
    // return post('auth/login', params)
    return post('auth/login', params, true, { headers: {'content-type': 'application/x-www-form-urlencoded'}, isJson: false })
  }

  /**
   * 退出登录接口
   * @param {string} userId 用户id [必须]
   * @returns
   * @memberof LoginService
   */

  logout() {
    return post('auth/logout' + tokenStr)
  }

}

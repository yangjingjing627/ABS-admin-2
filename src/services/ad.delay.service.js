import {get, post} from 'http'
export default class AdDelayService {
  /**
   * @param {int} switchTime  切换时间 [必须]
   * @returns
   * @memberof AdDelayService
   */
  getSwitchTimeEdit(params = {}) {
    return get('admin/ipos/switchTime/edit', params)
  }
  /**
   * @param {int} switchTime  切换时间 [必须]
   * @returns
   * @memberof AdDelayService
   */
  postSwitchTimeEdit(params = {}) {
    return post('admin/ipos/switchTime/save', params)
  }
}

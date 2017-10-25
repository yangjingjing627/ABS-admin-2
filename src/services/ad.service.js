import {get, post, patch, put} from 'http'
import cookie from 'arale-cookie'
console.log('-----ad.serverce.js--------' + cookie.get('access_token'))
// window.token = cookie.get('access_token')
// window.tokenStr = '?access_token=' + window.token
export default class AdService {

  /**
   *
   * 获取广告列表
   * @param {any} params.adType [必须] 广告类型 (全部: 0 / 图片: 10 / 视频: 20)
   * @param {any} params.linkType [必须] 关联类型 (全部: 0 / SKU: 10 / 关键字: 20 / 品类: 30 / 所有结算: 40 /)
   * @param {any} params.adStatus [必须] 广告状态 (全部: 0 / 未开始: 10 / 投放中: 20 / 已结束: 30 / 暂停: 21)
   * @param {any} params.sourceType [必须] 结算单广告: 10, 全屏广告: 20
   * @param {any} params.parameter [非必须] 查询参数(对名称的模糊搜索)
   * @returns
   * @memberof AdService
   */
  getAdList(params) {
    return get('admin/ad/list', params)
  }
  /**
   *
   * 获取城市列表
   * @param {any} 无
   * @returns
   * @memberof AdService
   */
  getCityList(params) {
    return get('admin/ad/play/region/city', params)
  }

  /**
   *
   * 根据店铺id查询店铺
   * @param {any} params.storeId  [必须] 店铺ID
   * @returns
   * @memberof AdService
   */
  getStoreById(params) {
    return get('admin/ad/play/region/store', params)
  }

  /**
   *
   * 根据广告id查询覆盖城市
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  getCoverById(params) {
    return get('admin/ad/import/cover', params)
  }

  /**
   *
   * 根据广告id查询播放次数
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  getCityCountById(params) {
    return get('admin/ad/import/city/count', params)
  }

  /**
   *
   * 根据广告id查询店铺的播放次数
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  getStoreCountById(params) {
    return get('admin/ad/import/store/count', params)
  }

  /**
   *
   * 根据广告id导出覆盖城市数据
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  exportCityById(params) {
    return get('admin/ad/export/cover', params)
  }

  /**
   *
   * 根据广告id导出覆盖城市数据
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  exportCountById(params) {
    return get('admin/ad/export/count', params)
  }

  /**
   *
   * 广告创建
   * @param {any}
   * @returns
   * @memberof AdService
   */
  adCreate(params) {
    return post('admin/ad/create', params, true, { headers: {'content-type': 'application/json; charset=utf-8'}, isJson: true })
  }

  /**
   *
   * 广告修改
   * @param {any}
   * @returns
   * @memberof AdService
   */
  adSave(params) {
    return post('admin/ad/save', params, true, { headers: {'content-type': 'application/json; charset=utf-8'}, isJson: true })
  }

  /**
   *
   * @param {int} adId 广告ID [必须]
   * @returns
   * @memberof AdService
   */
  getAdverInfoByAdId({adId}) {
    return get('admin/ad/edit', {adId})
  }

  /**
   * 广告状态修改
   * @param {int} params.adId  [必须] 广告ID
   * @param {int} params.adStatus  [必须] 广告状态
   * @param {any} 无
   * @returns
   * @memberof AdService
   */
  changeAdStatus(params) {
    return post('admin/ad/status/change', params)
  }

  /**
   * SKU关联, SKU查询API
   * @param {string} sku  需要关联的sku [必须]
   * @returns
   * @memberof AdService
   */
  getAdLinkSKU({sku}) {
    return get('admin/ad/link/sku', {sku})
  }

  /**
   * 品类关联, 品类查询API
   */
  getAdLinkCateList() {
    return get('admin/ad/link/cate')
  }
  //
  //
  //
  /**
   *
   * 获取债权：获取指定数量的债权
   * @param {int} number  [必须] 获取债权的个数
   * @returns
   * @memberof AdService
   */
  getNewdebts(params) {
    return get('newdebts' + window.tokenStr, params)
  }

  /**
   *
   * 页面初始化：加载债权池内已有若干的待审核债权
   * @param {int} page  [必须] 页码
   * @param {int} length  [必须] 页面长度
   * @returns
   * @memberof AdService
   */
  getAllunrevieweddebts(params, token) {
    return get('allunrevieweddebts' + '?access_token=' + token, params)
  }

 /**
  *
  * 点击退回按钮 完成退回债权操作(退回单个债权)
  * @param {string} state  [必须] 页码
  * @param {string} debtNumber  [必须] 页面长度
  * @returns
  * @memberof AdService
  */
  getDebt(params, token) {
    return patch('debt' + '?access_token=' + token, params)
  }

  /**
   *
   * 打包债权为资产
   * @param {any} debtsNumbers   被打包的债权Number数组
   * @returns
   * @memberof AdService
   */
  packagedClaim(params, token) {
    return post('asset' + '?access_token=' + token, params)
  }

  /**
   *
   */
  initialOptions(token) {
    return get('initialOptions' + '?access_token=' + token)
  }

  /**
   *
   * 页面初始化：加载债权池内已有若干的待审核债权
   * @param {int} page  [必须] 页码
   * @param {int} length  [必须] 页面长度
   * @returns
   * @memberof AdService
   */
  alldebts(params, token) {
    return get('alldebts' + '?access_token=' + token, params)
  }

// 资产管理
  /**
   *当前用户查看权限范围内的资产情况
   * @param {string} startDate [非必须] 开始时间(对名称的模糊搜索)
   * @param {string} endDate [非必须] 结束时间(对名称的模糊搜索)
   * @returns
   * @memberof AdService
   */
  allassets(params, token) {
    return get('allassets' + '?access_token=' + token, params)
  }

  /**
   *
   * 根据资产id获取资产的详细信息
   *
   */
  assetSingleInfo(assetID, token) {
    return get('asset/' + assetID + '?access_token=' + token)
  }

  /**
   * 下载原始债权资料
   */
  // downloadAsset(assetID) {
  //   return get('asset/' + assetID + '/debtsInfo' + '?access_token=' + token)
  // }

  // 用户管理页面
  /**
   *进入页面时，初始化获取存放所有用户信息的列表。
   */
  users(token) {
    return get('users' + '?access_token=' + token)
  }

  /**
   *
   * 页面初始化：加载债权池内已有若干的待审核债权
   * @param {string} companyName  [必须] 用户名称
   * @param {string} companyType  [必须] 用户类型
   * @param {string} username  [必须] 用户名（登录用）
   * @param {string} account  [必须] 代币账户
   * @returns
   * @memberof AdService
   */
  setUser(params, token) {
    return post('users' + '?access_token=' + token, params)
  }

  /**
   *
   * 获取用户操作日志
   * @param {int} userID  [必须] 用户名称
   * @returns
   * @memberof AdService
   */
  optUser(params, token) {
    return get('users/actionLogs' + '?access_token=' + token, params)
  }

  // 交易记录页面
  /**
   * 查询用户交易记录
   */
  assetInfo(token) {
    return get('asset/txs' + '?access_token=' + token)
  }

  // 费率设置页
  /**
   * 获取系统默认费率
   */
  rateSetting(token) {
    return get('setting/rateSetting' + '?access_token=' + token)
  }

  /**
   *
   * 获取用户操作日志
   * @param {int} id  [必须] 用户名称
   * @param {int} lawyerFee  [必须] 律师费用（万元）
   * @param {int} accountantFee  [必须] 会计费用（万元）
   * @param {int} spvRate  [必须] 信托管理费（‰）
   * @param {int} ratingRate  [必须] 资产评级费（‰）
   * @returns
   * @memberof AdService
   */
  editRate(params, token) {
    return put('setting/rateSetting' + '?access_token=' + token, params)

  }

  assetUrl(item, token) {
    return post(item + '?access_token=' + token)
  }

  //
  getRatingUrl(token) {
    return get('agreement/AG201709280008' + '?access_token=' + token)
  }

}

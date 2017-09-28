import { GET_ADVER_INFO } from './mutation.types'
import AdService from '@/services/ad.service'
let adService = new AdService()

export const getAdverInfo = async({
  commit,
  state
}, params) => {
  let res = await adService.getAdverInfoByAdId(params)
  try {
    // res.deliveryDetail.playTimes = res.deliveryDetail.playTimes + ''
    let name = res.adName
    let type = {
      adType: res.adType,
      adUrl: res.adUrl,
      repeatTimes: res.repeatTimes,
      playLength: res.playLength,
      fileName: res.fileName
    }
    let link = {
      linkType: res.linkType,
      linkDetails: res.linkDetails || []
    }
    let delivery = {
      deliveryType: res.deliveryType,
      deliveryDetail: res.deliveryDetail || {}
    }
    let time = {
      playTimeFrameType: res.playTimeFrameType,
      playTimeFrameDetails: res.playTimeFrameDetails || []
    }
    let region = {
      playRegionType: res.playRegionType,
      playRegionDetails: res.playRegionDetails || []
    }
    commit(GET_ADVER_INFO, {
      name: name,
      type: type,
      link: link,
      delivery: delivery,
      time: time,
      region: region
    })
  } catch (e) {
    console.log(e)
  }
  return true
}

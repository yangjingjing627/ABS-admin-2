<template>
  <div class="add-modify">
    <go-back></go-back>
    <!-- <iframe v-if="getProtocolInfo" frameborder=0 width=100% height=90% marginheight=0 marginwidth=0 src="http://jaki2012.s1.natapp.cc/agreement/AG201709280008?access_token=2_6e5e42a6ef1e4151bf31a596520dd9d7"></iframe> -->
    <iframe v-if="getInfo" frameborder=0 width=100% height=90% marginheight=0 marginwidth=0 :src="url"></iframe>
    <div v-else class="look-for-link">请在资产详情选择协议！</div>
  </div>
</template>
<script>
import adverName from './components/adver.name'
import adverType from './components/adver.type'
import adverLink from './components/adver.link'
import adverTime from './components/adver.time'
import adverDelivery from './components/adver.delivery'
import adverRegion from './components/adver.region'
import AdService from '@/services/ad.service'
// import { mapActions } from 'vuex'
import { isEffective } from '@/utils/utils'
import cookie from 'arale-cookie'

let token = cookie.get('access_token')
let tokenStr = '?access_token=' + token
export default {
  data() {
    return {
      getProtocolInfo: false,
      params: {},
      url: '',
      getInfo: false,
      API_HOST: 'https://dev-apis.qianbao.com/jiedai/v1/'
      // API_HOST: 'http://172.28.32.136:8088/'
    }
  },
  computed: {
    isFull () {
      return this.$route.params.sourceType === 'full'
    },
    adId () {
      return this.$route.params.adId
    }
  },
  created() {
    if (!this.$route.query.url) {
      this.getInfo = false
    } else {
      this.getInfo = true
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.getProtocolInfo = true
    this.url = this.API_HOST + this.$route.query.url + tokenStr
  },
  methods: {
    async save () {
      let params = await this.check()
      if (params) {
        if (params.playTimeFrameDetails) {
          for (let i = 0; i < params.playTimeFrameDetails.length; i++) {
            if (!params.playTimeFrameDetails[i].timeEnd && !params.playTimeFrameDetails[i].timeStart) {
              this.$notify.info('播放时段不能为空', '提示')
              return
            }
          }
        }
        try {
          if (this.$route.params.adId) { // 修改
            params.adId = this.$route.params.adId
            this.AdService.adSave(params).then(() => {
              this.$notify.success('修改成功')
              this.$router.go(-1)
            }).catch(() => {
            })
          } else { // 创建
            this.AdService.adCreate(params).then(() => {
              this.$notify.success('创建成功')
              this.$router.go(-1)
            }).catch(() => {
            })
          }
        } catch (e) {
          this.$notify.error(e.message)
        }
      }
    },
    check () {
      let params = {}
      if (this.isFull) {
        params.sourceType = 20
      } else {
        params.sourceType = 10
      }
      // 1.名字
      params.adName = this.$refs.adverName.adName
      // 2.类型
      let adType = this.$refs.adverType
      params.adType = adType.adType
      if (params.adType === 10) { // 图片
        params.adUrl = adType.adUrlImg
        params.playLength = adType.playLengthIMg
        params.fileName = adType.imgName
      } else { // 视频
        params.adUrl = adType.adUrlVideo
        params.playLength = adType.playLengthVideo
        params.repeatTimes = adType.repeatTimes
        params.fileName = adType.videoName
      }
      // 3.关联类型
      if (!this.isFull) {
        let adLInk = this.$refs.adverLink
        params.linkType = adLInk.linkType
        if (params.linkType === 10) { // SKU
          params.linkDetails = adLInk.linkDetailsSku
        } else if (params.linkType === 20) { // 关键字
          params.linkDetails = adLInk.linkDetailsKey
        } else if (params.linkType === 30) { // 品类
          params.linkDetails = adLInk.linkDetailsCate
        }
      }

      // 4.投放策略
      let addel = this.$refs.adverDelivery
      params.deliveryType = addel.deliveryType
      params.deliveryDetail = {}
      if (params.deliveryType === 10) { // 按日期
        params.deliveryDetail.playStart = addel.playStart1
        params.deliveryDetail.playEnd = addel.playEnd1
      } else if (params.deliveryType === 20) { // 按播放次数
        params.deliveryDetail.playTimes = addel.playTimes2
        params.deliveryDetail.activeTime = addel.activeTime2
      } else if (params.deliveryType === 30) { // 按日期和播放次数
        params.deliveryDetail.playTimes = addel.playTimes3
        params.deliveryDetail.playEnd = addel.playEnd3
        params.deliveryDetail.playStart = addel.playStart3
      }
      // 5.播放时段
      let adTime = this.$refs.adverTime
      params.playTimeFrameType = adTime.playTimeFrameType

      if (params.playTimeFrameType === 20) {
        params.playTimeFrameDetails = adTime.playTimeFrameDetails
      }
      // 6.投放区域
      let adRegion = this.$refs.adverRegion
      params.playRegionType = adRegion.playRegionType
      if (params.playRegionType === 20) { // 城市
        params.playRegionDetails = adRegion.playRegionCity
      } else if (params.playRegionType === 30 || params.playRegionType === 31) { // 店铺
        params.playRegionDetails = adRegion.playRegionStore
      }
      if (!isEffective(params.adName)) {
        this.$notify.info('请填写有效的名称')
        return false
      }
      // if (!(params.adType && params.adUrl)) {
      //   return false
      // }
      return params
    }
  },
  components: {
    adverName,
    adverType,
    adverLink,
    adverTime,
    adverDelivery,
    adverRegion
  },
  destroyed () {
    this.$store.commit('GET_ADVER_INFO', {
      name: '',
      type: {},
      link: {
        linkDetails: []
      },
      delivery: {
        deliveryDetail: {}
      },
      time: {
        playTimeFrameDetails: []
      },
      region: {
        playRegionDetails: []
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.add-modify {
  width: 100%;
  height: 100%;
  background: $primary-font4;
  position: relative;
}
.look-for-link {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 30px;
  line-height: 80px;
  font-size: 20px;
  text-align: center;
}
</style>

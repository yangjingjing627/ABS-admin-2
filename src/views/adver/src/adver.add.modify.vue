<template>
  <div class="add-modify">
    <go-back></go-back>
    <div class="li">
      <adver-name ref="adverName"></adver-name>
      <adver-type ref="adverType"></adver-type>
      <adver-link ref="adverLink" v-if="!isFull"></adver-link>
      <adver-delivery ref="adverDelivery"></adver-delivery>
      <adver-time ref="adverTime"></adver-time>
      <adver-region ref="adverRegion"></adver-region>
    </div>
    <div class="footer">
      <a class="button" @click="$router.go(-1)">取消</a>
      <a class="button" @click="save">提交</a>
    </div>
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
import { mapActions } from 'vuex'
import { isEffective } from '@/utils/utils'
export default {
  data() {
    return {
      params: {}
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
  mounted() {
    this.AdService = new AdService()
    if (this.adId) {
      this.getAdverInfo({adId: this.adId})
    }
  },
  methods: {
    ...mapActions({
      getAdverInfo: 'getAdverInfo'
    }),
    async save () {
      let params = await this.check()
      console.log('params----', params)
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
.add-modify{
  width: 100%;
  .li{
    display: block;
    width: 700px;
    margin: 0 auto;
  }
  .footer{
    text-align: center;
    overflow: hidden;
    width: 100%;
    margin-top: 40px;
    a.button{
      display: inline-block;
    }
    a:last-child{
      margin-left: 56px;
    }
  }
}
</style>

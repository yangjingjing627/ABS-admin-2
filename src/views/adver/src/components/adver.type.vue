<template>
  <div class="adver-add-li">
    <label><i>2</i>广告类型</label>
    <div class="adver-select">
      <a class="select" :class="{'selected': adType === 10}" @click="check(10)">图片</a>
      <a class="select" :class="{'selected': adType === 20}" @click="check(20)">视频</a>
    </div>
    <div class="clear"></div>
    <type-image v-show="adType === 10" @getImgparams="getImgparams" :typeInfo="typeInfoImg"></type-image>
    <type-video v-show="adType === 20" @getVideoparams="getVideoparams" :typeInfo="typeInfoVideo"></type-video>
  </div>
</template>
<script>
import typeImage from './type/image'
import typeVideo from './type/video'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      adType: 0,
      adUrlImg: '',
      adUrlVideo: '',
      playLengthIMg: '',
      playLengthVideo: '',
      repeatTimes: '',
      typeInfo: {}
    }
  },
  computed: {
    ...mapState({
      getAdtype: state => state.adver.info.type
    }),
    typeInfoImg () {
      return this.getAdtype.adType === 10 ? this.typeInfo : {}
    },
    typeInfoVideo () {
      return this.getAdtype.adType === 20 ? this.typeInfo : {}
    }
  },
  mounted() {
    this.typeInfo = this.getAdtype
    this.adType = this.getAdtype.adType
  },
  methods: {
    check (id) {
      this.adType = id
    },
    getImgparams (url, length, name) {
      this.adUrlImg = url
      this.playLengthIMg = length
      this.imgName = name
    },
    getVideoparams (url, length, times, name) {
      this.adUrlVideo = url
      this.playLengthVideo = length
      this.repeatTimes = times
      this.videoName = name
    }
  },
  components: {
    typeImage,
    typeVideo
  },
  watch: {
    'getAdtype' (val) {
      this.typeInfo = val
      this.adType = this.getAdtype.adType
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
@import '../adver.scss';
</style>

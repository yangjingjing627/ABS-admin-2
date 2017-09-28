<template>
  <div class="adver-add-li">
    <label>
      <i v-if="isFull">4</i>
      <i v-if="!isFull">5</i>
      播放时段
    </label>
    <div class="adver-select">
      <a class="select" :class="{'selected': playTimeFrameType === 10}" @click="check(10)">全时段</a>
      <a class="select" :class="{'selected': playTimeFrameType === 20}" @click="check(20)">设置播放时段</a>
    </div>
    <div class="clear"></div>
    <time-set v-show="playTimeFrameType === 20" @timeSetFun="timeSetFun" :timeInfo="timeInfo"></time-set>
  </div>
</template>
<script>
import timeSet from './time/set'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      playTimeFrameType: 10,
      playTimeFrameDetails: []
    }
  },
  computed: {
    ...mapState({
      getTimeInfo: state => state.adver.info.time
    }),
    timeInfo () {
      return this.getTimeInfo.playTimeFrameDetails || []
    },
    isFull () {
      return this.$route.params.sourceType === 'full'
    }
  },
  mounted() {
  },
  methods: {
    check (id) {
      this.playTimeFrameType = id
    },
    timeSetFun (list) {
      this.playTimeFrameDetails = list
    }
  },
  components: {
    timeSet
  },
  watch: {
    'getTimeInfo' (val) {
      this.playTimeFrameType = val.playTimeFrameType
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
@import '../adver.scss';
</style>

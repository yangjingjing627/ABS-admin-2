<template>
  <div class="adver-add-li">
    <label>
      <i v-if="isFull">3</i>
      <i v-if="!isFull">4</i>
      投放策略
    </label>
    <div class="adver-select">
      <a class="select" :class="{'selected': deliveryType === 10}" @click="check(10)">按日期</a>
      <a class="select" :class="{'selected': deliveryType === 20}" @click="check(20)">按播放次数</a>
      <a class="select" :class="{'selected': deliveryType === 30}" @click="check(30)">按日期和播放次数</a>
    </div>
    <div class="clear"></div>
    <delivery-date v-show="deliveryType === 10"
    :dataInfo="dataInfo"
    @changeDate="changeDate">
    </delivery-date>
    <delivery-times v-show="deliveryType === 20"
    :timesInfo="timesInfo"
    @changeTime="changeTime">
    </delivery-times>
    <delivery-datetimes v-show="deliveryType === 30"
    :dateTimeInfo="dateTimeInfo"
    @changeDateTimes="changeDateTimes">
    </delivery-datetimes>
  </div>
</template>
<script>
import deliveryDate from './delivery/date'
import deliveryTimes from './delivery/times'
import deliveryDatetimes from './delivery/date.times'
import { timeCST, timeCSTDMS } from '@/utils/utils.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      deliveryType: 0,
      playTimes2: '',
      playTimes3: '',
      activeTime2: '',
      playStart1: '',
      playStart3: '',
      playEnd1: '',
      playEnd3: '',
      detail: {}
    }
  },
  computed: {
    ...mapState({
      getDeInfo: state => state.adver.info.delivery
    }),
    dataInfo () {
      return this.getDeInfo.deliveryType === 10 ? this.detail : {}
    },
    timesInfo () {
      return this.getDeInfo.deliveryType === 20 ? this.detail : {}
    },
    dateTimeInfo () {
      return this.getDeInfo.deliveryType === 30 ? this.detail : {}
    },
    isFull () {
      return this.$route.params.sourceType === 'full'
    }
  },
  mounted() {
  },
  methods: {
    check (id) {
      this.deliveryType = id
    },
    changeDate (v1, v2) {
      this.playStart1 = timeCST(v1)
      this.playEnd1 = timeCST(v2)
    },
    changeTime (v1, v2) {
      this.activeTime2 = timeCSTDMS(v1)
      this.playTimes2 = v2
    },
    changeDateTimes (v1, v2, v3) {
      this.playStart3 = timeCST(v1)
      this.playEnd3 = timeCST(v2)
      this.playTimes3 = v3
    }
  },
  components: {
    deliveryDate,
    deliveryTimes,
    deliveryDatetimes
  },
  watch: {
    'getDeInfo' (val) {
      this.detail = val.deliveryDetail
      this.deliveryType = val.deliveryType
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
@import '../adver.scss';
</style>

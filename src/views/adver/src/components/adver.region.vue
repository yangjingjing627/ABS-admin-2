<template>
  <div class="adver-add-li">
    <label>
      <i v-if="isFull">5</i>
      <i v-if="!isFull">6</i>
      投放区域</label>
    <div class="adver-select">
      <a class="select" :class="{'selected': playRegionType === 10}" @click="check(10)">全国</a>
      <a class="select" :class="{'selected': playRegionType === 20}" @click="check(20)">按城市投放</a>
      <a class="select" :class="{'selected': playRegionType === 30 || playRegionType === 31}" @click="check(30)">指定店铺投放</a>
    </div>
    <div class="clear"></div>
    <region-city v-show="playRegionType === 20"
    :cityInfo="cityInfo"
     @changeCity="changeCity"></region-city>
    <region-store v-show="playRegionType === 30 || playRegionType === 31"
    :storeInfo="storeInfo"
    :playRegionType1="playRegionType"
    @changeStore="changeStore"></region-store>
  </div>
</template>
<script>
import regionCity from './region/city'
import regionStore from './region/store'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      playRegionType: 10,
      playRegionCity: [],
      playRegionStore: [],
      playRegionDetails: []
    }
  },
  computed: {
    ...mapState({
      getReInfo: state => state.adver.info.region
    }),
    cityInfo () {
      return this.getReInfo.playRegionType === 20 ? this.playRegionDetails : []
    },
    storeInfo () {
      return this.getReInfo.playRegionType !== 20 ? this.playRegionDetails : []
    },
    isFull () {
      return this.$route.params.sourceType === 'full'
    }
  },
  mounted() {
  },
  methods: {
    check (id) {
      this.playRegionType = id
    },
    changeCity (list) {
      let city = []
      list.map(item => {
        city.push({cityId: item.cityId})
      })
      this.playRegionCity = city
    },
    changeStore (list, type) {
      let store = []
      list.map(item => {
        store.push({storeId: item.storeId})
      })
      this.playRegionStore = store
      this.playRegionType = type
    }
  },
  components: {
    regionCity,
    regionStore
  },
  watch: {
    'getReInfo' (val) {
      this.playRegionType = val.playRegionType
      this.playRegionDetails = val.playRegionDetails
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
@import '../adver.scss';
</style>

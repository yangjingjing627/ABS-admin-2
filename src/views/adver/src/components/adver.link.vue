<template>
  <div class="adver-add-li">
    <label><i>3</i>关联方式</label>
    <div class="adver-select">
      <a class="select" :class="{'selected': linkType === 10}" @click="check(10)">sku</a>
      <a class="select" :class="{'selected': linkType === 20}" @click="check(20)">关键字</a>
      <a class="select" :class="{'selected': linkType === 30}" @click="check(30)">按品类</a>
      <a class="select" :class="{'selected': linkType === 40}" @click="check(40)">所有结算</a>
    </div>
    <div class="clear"></div>
    <link-sku v-show="linkType === 10" @linkSkufun="linkSkufun" :linkTypeInfo="skuInfo"></link-sku>
    <link-key v-show="linkType === 20" @linkKeyfun="linkKeyfun" :linkTypeInfo="keyInfo"></link-key>
    <link-cate v-show="linkType === 30" @linkCatefun="linkCatefun" :linkTypeInfo="cateInfo"></link-cate>
  </div>
</template>
<script>
import linkSku from './link/sku'
import linkKey from './link/key'
import linkCate from './link/cate'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      linkType: 0,
      linkDetailsSku: [],
      linkDetailsKey: [],
      linkDetailsCate: [],
      linkTypeInfo: {}
    }
  },
  computed: {
    ...mapState({
      getLinkType: state => state.adver.info.link
    }),
    skuInfo () {
      return this.getLinkType.linkType === 10 ? this.linkTypeInfo : []
    },
    keyInfo () {
      return this.getLinkType.linkType === 20 ? this.linkTypeInfo : []
    },
    cateInfo () {
      return this.getLinkType.linkType === 30 ? this.linkTypeInfo : []
    }
  },
  mounted() {
  },
  methods: {
    check (id) {
      this.linkType = id
    },
    linkSkufun (detail) {
      let list = []
      detail.map(item => {
        list.push(item.sku)
      })
      this.linkDetailsSku = list
    },
    linkKeyfun (detail) {
      this.linkDetailsKey = detail
    },
    linkCatefun (detail) {
      this.linkDetailsCate = detail
    }
  },
  components: {
    linkSku,
    linkKey,
    linkCate
  },
  watch: {
    'getLinkType' (val) {
      if (val) {
        this.linkTypeInfo = val.linkDetails
        this.linkType = val.linkType
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
@import '../adver.scss';
</style>

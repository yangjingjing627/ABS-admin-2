<template>
  <div class="adver-add-li">
    <label><i>1</i>广告名称</label>
    <hsy-input type="text" v-model="adName" placeholder="请输入广告名称" maxlength="20"></hsy-input>
    <div class="clear"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      adName: ''
    }
  },
  computed: {
    ...mapState({
      getAdName: state => state.adver.info.name
    })
  },
  mounted() {
    this.adName = this.getAdName
  },
  methods: {
  },
  watch: {
    'getAdName' (val) {
      this.adName = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
@import '../adver.scss';
</style>

<template>
<div class="adver-model adver-delivery-date">
  <i class="remarks">该时间段内不限制播放次数</i>
  <div class="">
    <span>选择日期</span>
    <el-date-picker
      v-model="value1"
      type="date"
      format="yyyy-MM-dd"
      placeholder="开始日期">
    </el-date-picker>
    <span class="zhi">至</span>
    <el-date-picker
      v-model="value2"
      type="date"
      format="yyyy-MM-dd"
      placeholder="结束日期">
    </el-date-picker>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      value1: '',
      value2: ''
    }
  },
  props: ['dataInfo'],
  computed: {
  },
  mounted() {},
  methods: {},
  watch: {
    'value1' (val) {
      this.$emit('changeDate', val, this.value2)
    },
    'value2' (val) {
      this.$emit('changeDate', this.value1, val)
    },
    'dataInfo' (val) {
      this.value1 = val.playStart
      this.value2 = val.playEnd
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
.adver-delivery-date{
  padding: 20px 13px 20px 13px;
  span{
    display: inline-block;
    line-height: 30px;
    padding-right: 10px;
    &.zhi{
      padding-left: 10px;
    }
  }
  .el-date-editor.el-input {
    width: 140px;
  }
}
</style>

<template>
  <div class="adver-model adver-delivery-date adver-delivery-times">
    <div class="">
      <span>选择日期</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="开始日期">
      </el-date-picker>
      <span class="zhi">至</span>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="结束日期">
      </el-date-picker>
      <span class="rem">必填</span>
    </div>
    <div class="times">
      <hsy-input type="text" v-model="times">播放总次数</hsy-input><i>次／店</i>
    </div>
    <i class="remarks">达成任何一个条件停止播放</i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      times: ''
    }
  },
  props: ['dateTimeInfo'],
  mounted() {},
  methods: {},
  watch: {
    'value1' (val) {
      this.$emit('changeDateTimes', val, this.value2, this.times)
    },
    'value2' (val) {
      this.$emit('changeDateTimes', this.value1, val, this.times)
    },
    'times' (val) {
      this.$emit('changeDateTimes', this.value1, this.value2, val)
    },
    'dateTimeInfo' (val) {
      this.value1 = val.playStart
      this.value2 = val.playEnd
      this.times = val.playTimes
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
.adver-delivery-date.adver-delivery-times{
  .el-date-editor.el-input {
    width: 140px;
  }
  .times{
    margin-bottom: 0px;
    margin-top: 20px;
  }
}
.adver-delivery-date{
  .rem{
    color: #cbcbcb;
  }
}
</style>

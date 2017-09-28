<template>
  <div class="adver-model adver-delivery-times">
    <div class="times">
      <hsy-input type="text" v-model="times">播放总次数</hsy-input><i>次／店</i>
    </div>
    <div class="">
      <span>生效时间</span>
      <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </div>
    <i class="remarks" v-if="timeshow">将在 {{ timeshow }} 生效</i>
  </div>
</template>
<script>
import { timeCST, timeCSTDMS, timeDMS } from '@/utils/utils.js'

export default {
  data() {
    return {
      times: '',
      value1: '',
      timeshow: ''
    }
  },
  props: ['timesInfo'],
  mounted() {},
  methods: {},
  watch: {
    'value1' (val) {
      this.$emit('changeTime', val, this.times)
      let day = new Date()
      if (timeCST(day) === timeCST(val)) {
        this.timeshow = '今天' + timeDMS(val)
      } else if (timeCST(day.setDate(day.getDate() + 1)) === timeCST(val)) {
        this.timeshow = '明天' + timeDMS(val)
      } else {
        this.timeshow = timeCSTDMS(val)
      }
    },
    'times' (val) {
      this.$emit('changeTime', this.value1, val)
    },
    'timesInfo' (val) {
      this.value1 = val.activeTime
      this.times = val.playTimes
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
.adver-delivery-times{
  padding: 20px 13px 20px 13px;
  .hsy-input{
    width: 100px;
  }
  .times{
    margin-bottom: 20px;
    i{
      margin-left: 10px;
    }
  }
  .header-input{
    float: left;
  }
  span{
    display: inline-block;
    line-height: 30px;
    padding-right: 10px;
  }
  .el-date-editor.el-input {
    width: 200px;
  }
}
</style>
